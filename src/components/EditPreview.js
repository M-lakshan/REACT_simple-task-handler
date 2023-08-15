import {useState} from 'react';
 
const EditPreview = (props) => {
  const [tag_imp,setTagImp] = useState(false);
  const [tag_urg,setTagUrg] = useState(false);
  const [tag_pvt,setTagPvt] = useState(false);
  console.log(props.edit)
  const {tsk_title,tsk_details,tsk_scheduled_for,tsk_tags} = props.edit;
  const {taskManagePanel,setTaskManagePanel} = props.tskMng;

  const handleSubmit = () => {

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
    <form onSubmit={handleSubmit}>
      <label htmlFor="task_title">Title : </label>
      <input type="text" id="task_title" value={tsk_title} required/>
      <label htmlFor="task_details">Details : </label>
      <input type="text" id="task_details" value={tsk_details}/>
      <label htmlFor="task_schedule">Scheduled for : </label>
      <div id="task_schedule">
        <input type="text" id="task_schedule_date"
          value={(tsk_scheduled_for) && tsk_scheduled_for[0]} placeholder="MM/DD"/>
        <input type="text" id="task_schedule_time"
          value={(tsk_scheduled_for) && tsk_scheduled_for[1]} placeholder="00:00am"/>
      </div>
      <div className="task_tags">
        <p>Add tags : </p>
        <label htmlFor="task_tag_important" 
          className={((tsk_tags && tsk_tags.includes('tag_imp')) || ((tag_imp!==false))) ? "active" : undefined}
          onClick={() => handleTagClick('imp')}>
          {(tag_imp===true) && <span>
            <i className="fa-solid fa-tag"></i>&nbsp;
          </span>}
          important
        </label>&nbsp;
        <label htmlFor="task_tag_urgent" 
          className={((tsk_tags && tsk_tags.includes('tag_urg')) || ((tag_urg!==false))) ? "active" : undefined}
          onClick={() => handleTagClick('urg')}>
          {(tag_urg===true) && <span>
            <i className="fa-solid fa-tag"></i>&nbsp;
          </span>}
          urgent
        </label>&nbsp;
        <label htmlFor="task_tag_private" 
          className={((tsk_tags && tsk_tags.includes('tag_pvt')) || ((tag_pvt!==false))) ? "active" : undefined}
          onClick={() => handleTagClick('pvt')}>
          {(tag_pvt===true) && <span>
            <i className="fa-solid fa-tag"></i>&nbsp;
          </span>}
          private
        </label>
        <input type="checkbox" id="task_tag_important"/>
        <input type="checkbox" id="task_tag_urgent"/>
        <input type="checkbox" id="task_tag_private"/>
      </div>
      
    </form>
  );
}

export default EditPreview;