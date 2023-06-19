import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import CreateHelpdesk from './component/CreateHelpdesk';
import Kanban from './component/KanbanBoard';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <>
            <Header />
            <CreateHelpdesk />
            <Kanban /> 
            
          </>
        } />
      </Routes>






    </>
  );
}

export default App;
