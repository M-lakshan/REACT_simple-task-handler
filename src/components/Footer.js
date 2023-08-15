import SearchForTasks from './SearchForTasks.js';
import EditPreview from './EditPreview.js';
import AddTask from './AddTask.js';
import {useState} from 'react';

const Footer = ({taskManage,curEdit}) => {
  const [editPreview,setEditPreveiw] = useState(false);
  const [searchPreview,setSearchPreveiw] = useState(false);

  return (
    <footer className="App-footer">
      <section className="task_edit_preview">
        {(editPreview) && <EditPreview comp_st={[editPreview,setEditPreveiw]} edit={curEdit} tskMng={taskManage}/>}
      </section>
      <section className="main_actions">
        <SearchForTasks comp_st={[searchPreview,setSearchPreveiw]}/>
        <AddTask comp_st={[editPreview,setEditPreveiw]}/>
      </section>
    </footer>
  );
}

export default Footer;