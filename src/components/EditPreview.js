import React, { useState } from 'react';
 
const EditPreview = ({ edit, comp_st }) => {
  const [tag_imp,setTagImp] = useState(false);
  const [tag_urg,setTagUrg] = useState(false);
  const [tag_pvt,setTagPvt] = useState(false);
  const { id, name, details, scheduled_for, tags, completed, removed } = edit[0][1];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target)
  }
  const cancelTsk = () => {
    document.querySelector('footer').classList.remove('focus_out');
    edit[1](false,{
      id: '',
      name: '',
      details: '',
      scheduled_for: '',
      tags: '',
      completed: '',
      removed: ''
    });
    comp_st[1](false);
  }
  const handleTagClick = (type) => {
    (tag_imp) && setTagImp(!tag_imp);
    (tag_urg) && setTagUrg(!tag_urg);
    (tag_pvt) && setTagPvt(!tag_pvt);

    document.getElementById("task_tag_important").checked = false;
    document.getElementById("task_tag_urgent").checked = false;
    document.getElementById("task_tag_private").checked = false;
    
    switch(type) {
      case 'imp' : 
        setTagImp(!tag_imp);
        document.getElementById("task_tag_important").checked = tag_imp;
        break;
      case 'urg' : 
        setTagUrg(!tag_urg);
        document.getElementById("task_tag_urgent").checked = tag_urg;
        break;
      case 'pvt' : 
        setTagPvt(!tag_pvt);
        document.getElementById("task_tag_private").checked = tag_pvt;
        break;
    }
  }

  return (
    <React.Fragment>
      <div className="bottom_overflow"></div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="task_id" defaultValue={id} required/>
        <input type="hidden" id="task_ste_remove" defaultValue={removed} required/>
        <input type="hidden" id="task_ste_complete" defaultValue={completed} required/>
        <div className="for_title">
          <label htmlFor="task_title">Title : </label>&nbsp;
          <input type="text" id="task_title" defaultValue={name} placeholder=" - add the task title - " required/>
        </div>
        <div className="for_details">
          <label htmlFor="task_details">Details : </label>&nbsp;
          <textarea type="text" id="task_details" defaultValue={details} 
            placeholder=" 
            - provide a brief info -  
            - optional description - "/>
        </div>
        <div className="for_schedule">
          <label htmlFor="task_schedule">Scheduled for : </label>&nbsp;
          <div id="task_schedule">
            <input type="text" id="task_schedule_date"
              defaultValue={(scheduled_for) && scheduled_for[0]} placeholder="MM/DD"/>
            <input type="text" id="task_schedule_time"
              defaultValue={(scheduled_for) && scheduled_for[1]} placeholder="00:00am"/>
          </div>
        </div>
        <div className="task_tags">
          <p>Tags : </p>&nbsp;&nbsp;&nbsp;
          <div className="tag_list">
            <label htmlFor="task_tag_important" 
              className={((tags && tags.includes('tag_imp')) || ((tag_imp!==false))) ? "active" : undefined}
              onClick={() => handleTagClick('imp')}>
              {(tag_imp===true) && <span>
                <i className="fa-solid fa-tag"></i>&nbsp;
              </span>}
              important
            </label>&nbsp;
            <label htmlFor="task_tag_urgent" 
              className={((tags && tags.includes('tag_urg')) || ((tag_urg!==false))) ? "active" : undefined}
              onClick={() => handleTagClick('urg')}>
              {(tag_urg===true) && <span>
                <i className="fa-solid fa-tag"></i>&nbsp;
              </span>}
              urgent
            </label>&nbsp;
            <label htmlFor="task_tag_private" 
              className={((tags && tags.includes('tag_pvt')) || ((tag_pvt!==false))) ? "active" : undefined}
              onClick={() => handleTagClick('pvt')}>
              {(tag_pvt===true) && <span>
                <i className="fa-solid fa-tag"></i>&nbsp;
              </span>}
              private
            </label>
          </div>
          <input type="checkbox" id="task_tag_important"/>
          <input type="checkbox" id="task_tag_urgent"/>
          <input type="checkbox" id="task_tag_private"/>
        </div>
        <div className="actions">
          <button type="reset" onClick={cancelTsk}>Cancel</button>
          <button type="submit" onClick={handleSubmit}>
            {(edit[0]) ? "Update" : "Add"}&nbsp;Task
          </button>
        </div>
      </form>
    </React.Fragment>
  );
}

export default EditPreview;