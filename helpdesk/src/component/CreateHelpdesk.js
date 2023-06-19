import axios from "axios";
import Swal from 'sweetalert2';
import { useState } from 'react';

import newHelp from '../assets/new.png'

const CreateHelpdesk = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [tel, setTel] = useState("");
    const [email, setEmail] = useState("");
    const [note, setNote] = useState("");
    const [helpdeskList, setHelpdeskList] = useState([]);
    let check_clear = true;
    const clear = (event) => {
        if (check_clear) { event.preventDefault(); }
        setTitle("");
        setDescription("");
        setContact("");
        setTel("");
        setEmail("");
        setNote("");
    }
    
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    }
    const validateTel = (tel) => {
        const telPattern = /^\d{10}$/;
        return telPattern.test(tel);
    }

    const addHelpdesk = async (event) => {
        if (title === '' || description === '' || contact === '' || tel === '' || email === '') {
            await Swal.fire({
                title: 'Incomplete Data',
                text: 'Please fill in all required fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });

        } else {
            const isValidTel = await validateTel(tel);
            const isValidEmail = await validateEmail(email);

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
                const conf = await Swal.fire({
                    title: 'Are you sure?',
                    text: 'You are about to create the helpdesk. Do you want to proceed?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Confirm',
                    cancelButtonText: 'Cancel',
                    dangerMode: true
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.post('http://localhost:3001/create', {
                            title: title,
                            description: description,
                            contact: contact,
                            tel: tel,
                            email: email,
                            note:note
                        }).then(() => {
                            setHelpdeskList([
                                ...helpdeskList,
                                {
                                    title: title,
                                    description: description,
                                    contact: contact,
                                    tel: tel,
                                    email: email,
                                    note:note
                                }
                            ]);

                            Swal.fire({
                                title: 'Success',
                                text: 'Helpdesk created successfully!',
                                icon: 'success',
                                confirmButtonText: 'OK',
                            });

                        }).catch(error => {
                            Swal.fire({
                                title: 'Error',
                                text: 'Failed to create helpdesk',
                                icon: 'error',
                                confirmButtonText: 'OK',
                            });
                        });
                        check_clear = false;
                        clear();
                        
                    }
                });
            }
        }
    };
    return (
        <>
            <div className="center-screen" >
                <button className="avatar" >
                    <div className="w-24 rounded-full" onClick={() => window.my_modal_5.showModal()}>
                        <img src={newHelp} />
                    </div>

                </button>
                <div>Create Helpdesk</div>
            </div>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <form method="dialog" className="modal-box">
                    <div className="modal-action">
                        <button className="btn btn-circle">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <h1 className="font-bold text-lg">Create New Helpdesk</h1><br />
                    <div className="flex">
                        <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Title:
                        </label>
                        <input type="text"
                            placeholder="Title"
                            className="input input-bordered w-full max-w-xs"
                            value={title}
                            onChange={(evet) => {
                                setTitle(evet.target.value)
                            }}
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
                            value={description}
                            onChange={(evet) => {
                                setDescription(evet.target.value)
                            }}
                        >
                        </textarea>

                    </div><br />

                    <div className="flex">
                        <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Contact:
                        </label>
                        <input type="text"
                            placeholder="Your name"
                            className="input input-bordered w-full max-w-xs"
                            value={contact}
                            onChange={(evet) => {
                                setContact(evet.target.value)
                            }}
                        />
                    </div><br />
                    <div className="flex">
                        <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Tel:
                        </label>
                        <input type="text"
                            maxLength={10}
                            placeholder="Tel"
                            className="input input-bordered w-full max-w-xs"
                            value={tel}
                            onChange={(evet) => {
                                setTel(evet.target.value)
                            }}
                        />

                    </div><br />
                    <div className="flex">
                        <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Email:
                        </label>
                        <input type="text"
                            placeholder="Email"
                            className="input input-bordered w-full max-w-xs"
                            value={email}
                            onChange={(evet) => {
                                setEmail(evet.target.value)
                            }}
                        />
                    </div>
                    <div className="flex ">
                        <label className="label" style={{ fontWeight: 'bold', fontSize: '18px' }}>
                            Note:
                        </label>
                    </div>
                    <div className="flex">
                        <textarea
                            placeholder="note......"
                            className="textarea textarea-bordered textarea-lg w-full max-w-xs"
                            value={note}
                            onChange={(evet) => {
                                setNote(evet.target.value)
                            }}
                        >
                        </textarea>

                    </div><br />
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
                        <button className="btn btn-primary" onClick={addHelpdesk}>Submit</button>
                        <button className="btn btn-error" onClick={clear}>Clear</button>
                    </div><br />
                </form>
            </dialog>
        </>
    )
};

export default CreateHelpdesk;
