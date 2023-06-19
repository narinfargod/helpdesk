import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Swal from 'sweetalert2';


const columns = [
  { id: 0, title: 'Pending', color: '#ffc107' },
  { id: 1, title: 'Accepted', color: '#28a745' },
  { id: 2, title: 'Resolved', color: '#007bff' },
  { id: 3, title: 'Rejected', color: '#dc3545' }
];

const KanbanBoardContainer = styled.div`
  display: flex;
`;

const ColumnContainer = styled.div`
  width: 25%;
  padding: 10px;
  background-color: #f4f4f4;
  margin: 10px;
  border-radius: 5px;
`;

const ColumnHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.color};
  color: #fff;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const ColumnTitle = styled.h3`
  font-weight: bold;
  margin-bottom: 10px;
`;

const TasksContainer = styled.div`
  min-height: 100px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
`;

const Task = styled.div`
  background-color: #f9f9f9;
  padding: 5px;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  cursor: move;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eaeaea;
  }

  &.pending {
    border-color: #ffc107;
    background-color: #fff3cd;
  }

  &.accepted {
    border-color: #28a745;
    background-color: #d4edda;
  }

  &.resolved {
    border-color: #007bff;
    background-color: #cfe2ff;
  }

  &.rejected {
    border-color: #dc3545;
    background-color: #f8d7da;
  }
`;

const TaskTitle = styled.span`
  font-weight: bold;
`;

const TaskContent = styled.div`
  text-align: left;
  cursor: pointer;
  word-break: break-word;
  
`;

const TaskDetails = styled.span`
  margin-top: 10px;
  font-size: 14px;
  text-align: left;
  cursor: pointer;
  word-break: break-word;
`;

const KanbanBoard = () => {
  const [helpdeskList, setHelpdeskList] = useState([]);

  const getHelpdesk = async () => {
    try {
      const response = await axios.get('http://localhost:3001/helpdesk');
      setHelpdeskList(response.data);
    } catch (error) {
      console.error('Error retrieving helpdesk data:', error);
    }
  };
    getHelpdesk();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    setTasks(
      helpdeskList.map((val) => ({
        id: val.id,
        title: val.title,
        description: val.description,
        status: val.status,
        contact: val.contact,
        tel: val.tel,
        email: val.email,
        note: val.note,
        time_create: val.time_create,
        time_update: val.time_update,
        clicked: false,
      }))
    );
  }, [helpdeskList]);

  const handleDragStart = (event, taskId) => {
    event.dataTransfer.setData('text/plain', taskId.toString());
  };

  const handleDrop = async (event, status) => {
    const taskId = parseInt(event.dataTransfer.getData('text/plain'), 10);
    const updatedTasks = tasks.map((task) => {
      if (task.id === taskId) {
        return { ...task, status, time_update: new Date().toLocaleString() };
      }
      return task;
    });
    setTasks(updatedTasks);
    try {
      await axios.put(`http://localhost:3001/upstatus/${taskId}`, { status });
      console.log('Task status updated in the database');
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  

  const allowDrop = (event) => {
    event.preventDefault();
  };


  const [editedTask, setEditedTask] = useState(null);

  const handleEditTask = (task) => {
    setEditedTask(task);
  };

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }
  const validateTel = (tel) => {
    const telPattern = /^\d{10}$/;
    return telPattern.test(tel);
  }
  const handleSaveChanges = async (event) => {
    event.preventDefault();
    if (!editedTask.title || !editedTask.description || !editedTask.contact || !editedTask.tel || !editedTask.email) {
      await Swal.fire('Error', 'Please fill in all fields', 'error');
      return;
    } else {
      const isValidTel = await validateTel(editedTask.tel);
      const isValidEmail = await validateEmail(editedTask.email);
      if (!isValidTel) {
        Swal.fire({
          title: 'Invalid phone number',
          icon: 'error',
          confirmButtonText: 'OK',
          dangerMode: true
        });
      }
      else if (!isValidEmail) {
        Swal.fire({
          title: 'Invalid Email',
          icon: 'error',
          confirmButtonText: 'OK',
          dangerMode: true
        });
      } else {
        try {
          await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to create the helpdesk. Do you want to proceed?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            dangerMode: true
          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(`http://localhost:3001/edit/${editedTask.id}`, editedTask);
              const updatedTasks = tasks.map((task) => {
                if (task.id === editedTask.id) {
                  return editedTask;
                }
                return task;
              });
              setTasks(updatedTasks);
              setEditedTask(null);
              Swal.fire('Success', 'Helpdesk updated successfully', 'success');
            }
          })
        } catch (error) {
          await Swal.fire('Error', 'Failed to update helpdesk', 'error');
        }
      }

    };

  }
  const closeDialog = () => {
    setEditedTask(null);
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  return (
    <KanbanBoardContainer>
      {columns.map((column) => (
        <ColumnContainer key={column.id}>
          <ColumnHeader color={column.color}>
            <ColumnTitle>{column.title}</ColumnTitle>
          </ColumnHeader>
          <TasksContainer onDrop={(event) => handleDrop(event, column.id)} onDragOver={allowDrop}>
            {tasks
              .filter((task) => task.status === column.id)
              .sort((a, b) => new Date(b.time_update) - new Date(a.time_update))
              .map((task) => (
                <Task
                  key={task.id}
                  className={`task ${task.status === 0
                    ? 'pending'
                    : task.status === 1
                      ? 'accepted'
                      : task.status === 2
                        ? 'resolved'
                        : 'rejected'
                    }`}
                  draggable onDragStart={(event) => handleDragStart(event, task.id)}
                >
                  <div>
                    <TaskContent >
                      <TaskTitle>#{task.id} {task.title}</TaskTitle>
                      <div><strong >By: </strong>{task.contact}</div>
                      <div><strong>Tel: </strong>{task.tel}</div>
                      <div><strong>Email: </strong>{task.email}</div>
                    </TaskContent>
                    <TaskDetails>
                      <p style={{ textAlign: 'center', marginTop: '10px' }}>{task.description}</p>
                      <div style={{ textAlign: 'left', marginTop: '10px', fontSize: '14px' }}>
                        <span><strong>Note: </strong>{task.note}</span>
                      </div>
                      <div style={{ textAlign: 'left', marginTop: '10px', fontSize: '14px' }}>
                        <span><strong>Created: </strong> {task.time_create ? new Date(task.time_create).toLocaleString() : 'Not updated'}</span>
                      </div>
                      <div style={{ textAlign: 'left', fontSize: '14px' }}>
                        <span><strong>Updated: </strong> {task.time_update ? new Date(task.time_update).toLocaleString() : 'Not updated'}</span>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <button className="btn" onClick={() => handleEditTask(task)}>Edit</button>
                      </div>
                    </TaskDetails>

                  </div>
                </Task>
              ))}
          </TasksContainer>
        </ColumnContainer>
      ))}
      {editedTask && (
        <dialog className="modal" open >
          <form className="modal-box">
            <div className="modal-action">
              <button className="btn btn-circle" onClick={closeDialog}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <h1 className="font-bold text-lg">Edit Helpdesk</h1><br />
            <div className="flex">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Title:
              </label>
              <input
                type="text"
                placeholder="Title"
                value={editedTask.title}
                className="input input-bordered w-full max-w-xs"
                onChange={handleInputChange}
                name="title"
              />
            </div>
            <div className="flex ">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Description:
              </label>
            </div>
            <div className="flex">
              <textarea
                placeholder="Description"
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                value={editedTask.description}
                onChange={handleInputChange}
                name="description"
              ></textarea>
            </div><br />
            <div className="flex">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Contact:
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input input-bordered w-full max-w-xs"
                value={editedTask.contact}
                onChange={handleInputChange}
                name="contact"
              />
            </div><br />
            <div className="flex">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Tel:
              </label>
              <input
                type="text"
                maxLength={10}
                placeholder="Tel"
                className="input input-bordered w-full max-w-xs"
                value={editedTask.tel}
                onChange={handleInputChange}
                name="tel"
              />
            </div><br />
            <div className="flex">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Email:
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered w-full max-w-xs"
                value={editedTask.email}
                onChange={handleInputChange}
                name="email"
              />
            </div><br />
            <div className="flex ">
              <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                Note:
              </label>
            </div>
            <div className="flex">
              <textarea
                placeholder="note...."
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                value={editedTask.note}
                onChange={handleInputChange}
                name="note"
              ></textarea>
            </div><br />
            <div className="flex justify-center">
              <button
                className="btn bg-primary text-white"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
          </form>
        </dialog>
      )}
    </KanbanBoardContainer>
  );
};

export default KanbanBoard;