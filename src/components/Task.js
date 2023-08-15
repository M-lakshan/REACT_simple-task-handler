import React, { useState } from 'react';

const Task = (props) => {
  let { id, name, details, scheduled_for, completed, tags, removed } = props.info;
  let main_st_func = props.sec_state;

  const retrieve_scheduled_info = () => {
    if(scheduled_for[0]!=="" && scheduled_for[1]==="") {
      return `[ scheduled for ${scheduled_for[0]} ]`;
    } else if(scheduled_for[0]==="" && scheduled_for[1]!=="") {
      return `[ scheduled for ${scheduled_for[1]} ]`;
    } else if(scheduled_for[0]!=="" && scheduled_for[1]!=="") {
      return `[ scheduled for ${scheduled_for[0]} - ${scheduled_for[1]} ]`;
    } else {
      return false;
    }
  }
  const general_arr_update = (target,sts) => {
    let updating_arr = main_st_func[0].filter(each_tsk => each_tsk.id!==target);
    let updating_elm = main_st_func[0].filter(each_tsk => each_tsk.id===target)[0];
    
    (sts==="remove") ? updating_elm.removed = true : updating_elm.completed = true;
    updating_arr.push(updating_elm);

    main_st_func[1](updating_arr);
  }

  const checkHandleChange = (elm) => {
    let target_path = elm.currentTarget;
    let target_id = parseInt(target_path.id.toString().substring(
      target_path.id.toString().indexOf("_")+1,
      target_path.id.toString().length
    ));

    general_arr_update(target_id,"completed");
  }
  const removeHandleClick = (elm) => {
    let target_id = parseInt(elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().substring(
      elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().indexOf("_")+1,
      elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().length
    ));
    
    general_arr_update(target_id,"remove");
  }
  const editHandleClick = (elm) => {
    let target_id = parseInt(elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().substring(
      elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().indexOf("_")+1,
      elm.currentTarget.parentElement.querySelector(".checkbox").id.toString().length
    ));

    //need the state from main as Master-Branch
  }

  return (
    <div className={`task_${id} task`}>
      <h5>{(completed || removed) ? <s>{name}</s> : name}</h5>
      {(details.length>3 && completed!==true && removed!==true) && <p className="task_details">{details}</p>}
      {(details.length>3 && completed!==true && removed!==true && typeof(retrieve_scheduled_info())!=='boolean') && 
        <p className="task_scheduled_for">
          {retrieve_scheduled_info()}
        </p>
      }
      <p className="tags">
        {tags.map(tg => 
          <span>
            <i className="fa-solid fa-tag"></i>&nbsp;{tg}
          </span>
        )}
      </p>
      <div className="actions">
        {(removed!==true) && <label className="select" htmlFor={`checkbox_${id}`}>
          <abbr title="&nbsp;complete&nbsp;">
            <i className={(completed!==true) ? "fa-solid fa-square-check" : "fa-solid fa-square-check active"}></i>
            <i className={(completed!==true) ? "fa-regular fa-square active" : "fa-regular fa-square"}></i>
          </abbr>
        </label>}
        {(removed!==true) && <input type="checkbox" id={`checkbox_${id}`} className="checkbox" onChange={checkHandleChange}/>}
        <button className="edit">
          <abbr title="&nbsp;edit&nbsp;"><i className="fa-solid fa-pen"></i></abbr>
        </button>
        {(removed!==true) && <button className="remove" onClick={removeHandleClick}>
          <abbr title="&nbsp;remove&nbsp;"><i className="fa-solid fa-xmark"></i></abbr>
        </button>}
      </div>
    </div>
  );
}

const GeneralSubTitleComponents = ({ sec, arr_alt, dropdownEffect }) => {
  return (
    <React.Fragment>
      <span>- {arr_alt.length}&nbsp;{(arr_alt.length===1) ? "item" : "items"}&nbsp;-</span>
      <i className={(sec==="tasks_undone") ? "fa-solid fa-angle-up" : "fa-solid fa-angle-down"} onClick={dropdownEffect}></i>
    </React.Fragment>
  );
}

export const TasksUndone = ({arr,tsk_st}) => {
  const [tuexpand,setTUExpand] = useState("down");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTUExpand(((tuexpand==="down") ? "up" : "down"));
  }
  
  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Undone Tasks</span>
          <GeneralSubTitleComponents sec={"tasks_undone"} arr_alt={arr} dropdownEffect={handleClick}/>
        </h4>
        <div className={(tuexpand==="down") ? "tasks_undone expand" : "tasks_undone"} >
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={tsk_st}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksDone = ({arr,tsk_st}) => {
  const [tdexpand,setTDExpand] = useState("up");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTDExpand(((tdexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Completed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} dropdownEffect={handleClick}/>
        </h4>
        <div className={(tdexpand==="down") ? "tasks_done expand" : "tasks_done"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={tsk_st}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksRemoved = ({arr,tsk_st}) => {
  const [trexpand,setTRExpand] = useState("up");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTRExpand(((trexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Removed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} dropdownEffect={handleClick}/>
        </h4>
        <div className={(trexpand==="down") ? "tasks_removed expand" : "tasks_removed"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={tsk_st}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksMissed = ({arr,tsk_st}) => {
  const [tmexpand,setTMExpand] = useState("up");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTMExpand(((tmexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Missed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} dropdownEffect={handleClick}/>
        </h4>
        <div className={(tmexpand==="down") ? "tasks_missed expand" : "tasks_missed"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={tsk_st}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
