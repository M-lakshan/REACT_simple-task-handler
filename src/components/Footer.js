import SearchForTasks from './SearchForTasks.js';
import EditPreview from './EditPreview.js';
import AddTask from './AddTask.js';
import { useState } from 'react';

const Footer = ({cur_edit_alt}) => {
  const [editPreview,setEditPreveiw] = useState(false);
  const [searchPreview,setSearchPreveiw] = useState(false);

  return (
    <footer className="App-footer">
      <section className={(editPreview || cur_edit_alt[0][0]) ? "task_edit_preview active" : "task_edit_preview"}>
        {(editPreview || cur_edit_alt[0][0]) && <EditPreview 
          comp_st={[editPreview,(e) => setEditPreveiw(e)]}
          edit={cur_edit_alt}
        />}
      </section>
      <section className="main_actions">
        <SearchForTasks
          comp_st={[searchPreview,(e) => setSearchPreveiw(e)]}
        />
        <AddTask
          comp_st={[editPreview,(e) => setEditPreveiw(e)]}
          edit={cur_edit_alt}
        />
      </section>
    </footer>
  );
}

export default Footer;