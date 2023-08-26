import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import { tasks } from './components/task_list.js';
import { useState } from 'react';
import './styles/App.css';

function App() {
  const [myTasks,setMyTasks] = useState(tasks);
  const [currentEdit,setCurrentEdit] = useState([false,{}]);
  const setMyTasksAlt = (t) => setMyTasks(t);

  return (
    <div className="App">
      <Header />
      <Main 
        cur_edit_alt={[currentEdit,(edit) => setCurrentEdit(edit)]}
        cur_tasks_list={[myTasks,(tsks) => setMyTasksAlt(tsks)]}
      />
      <Footer 
        cur_edit_alt={[currentEdit,(edit) => setCurrentEdit(edit)]}
        cur_tasks_list={[myTasks,(tsks) => setMyTasksAlt(tsks)]}
      />
    </div>
  );
}

export default App;