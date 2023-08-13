import React, { useState } from 'react';

const Task = (props) => {
  let {id,name,details,scheduled_for,completed,tags,removed} = props.info;
  
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
  const checkHandleClick = (elm) => {
    let target = elm.currentTarget.querySelector('.active');
    
    if(target.classList.contains("fa-square-check")) {
      elm.currentTarget.querySelector(".fa-square").classList.add("active")
    } else {
      elm.currentTarget.querySelector(".fa-square-check").classList.add("active")
    }

    target.classList.remove("active");
  }
  const checkHandleChange = (elm) => {
    let target_id = parseInt(elm.currentTarget.id.toString().substring(
      elm.currentTarget.id.toString().indexOf("_")+1,
      elm.currentTarget.id.toString().length
    ));

    let updated_arr = props.sec_state[1].filter(each_tsk => each_tsk.id!==target_id);
    let updated_elm = props.sec_state[1].filter(each_tsk => each_tsk.id===target_id);
    updated_elm.completed = true;
    
    setTimeout(() => {props.sec_state[2](updated_arr)},50);
    // setTimeout(taskUploader("tdarr",updated_elm),250);
  }

  // const taskUploader = (type,arr) =>{
  //   if(type==="tdarr") {
  //     setTDArray(arr);
  //   } else if(type==="trarr") {
  //     setTRArray(arr);
  //   } else if(type==="tmarr") {
  //     setTMArray(arr);
  //   } else {
  //     setTUArray(arr);
  //   }
  // }

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
            <i class="Namefa-solid fa-tag"></i>&nbsp;{tg}
          </span>
        )}
      </p>
      <div className="actions">
        {(removed!==true) && <label className="select" htmlFor={`checkbox_${id}`}>
          <abbr title="&nbsp;complete&nbsp;" onClick={checkHandleClick}>
            <i className={(completed) ? "fa-solid fa-square-check active" : "fa-solid fa-square-check"}></i>
            <i className={(completed) ? "fa-regular fa-square" : "fa-regular fa-square active"}></i>
          </abbr>
        </label>}
        {(removed!==true) && <input type="checkbox" id={`checkbox_${id}`} onChange={checkHandleChange}/>}
        <button className="edit"><abbr title="&nbsp;edit&nbsp;"><i className="fa-solid fa-pen"></i></abbr></button>
        <button className="remove"><abbr title="&nbsp;remove&nbsp;"><i className="fa-solid fa-xmark"></i></abbr></button>
      </div>
    </div>
  );
}

const GeneralSubTitleComponents = ({arr_alt,func}) => {
  return (
    <React.Fragment>
      <span>- {arr_alt.length}&nbsp;{(arr_alt.length===1) ? "item" : "items"}&nbsp;-</span>
      <i className="fa-solid fa-angle-down" onClick={func}></i>
    </React.Fragment>
  );
}

export const TasksUndone = ({arr,func}) => {
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
          <GeneralSubTitleComponents arr_alt={arr} func={handleClick}/>
        </h4>
        <div className={(tuexpand==="down") ? "tasks_undone expand" : "tasks_undone"} >
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={["tuarr",arr,func]}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksDone = ({arr,func}) => {
  const [tdexpand,setTDExpand] = useState("down");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTDExpand(((tdexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Completed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} func={handleClick}/>
        </h4>
        <div className={(tdexpand==="down") ? "tasks_done expand" : "tasks_done"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={["tdarr",arr,func]}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksRemoved = ({arr,func}) => {
  const [trexpand,setTRExpand] = useState("down");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTRExpand(((trexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Removed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} func={handleClick}/>
        </h4>
        <div className={(trexpand==="down") ? "tasks_removed expand" : "tasks_removed"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={["trarr",arr,func]}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}

export const TasksMissed = ({arr,func}) => {
  const [tmexpand,setTMExpand] = useState("down");
  const handleClick = (elm) => {
    elm.currentTarget.classList.toggle("active");
    setTMExpand(((tmexpand==="down") ? "up" : "down"));
  }

  if(arr.length > 0) {
    return (
      <React.Fragment>
        <h4>
          <span>&#8227;&nbsp;Missed Tasks</span>
          <GeneralSubTitleComponents arr_alt={arr} func={handleClick}/>
        </h4>
        <div className={(tmexpand==="down") ? "tasks_missed expand" : "tasks_missed"}>
          {arr.map((tsk,ky) => <Task key={ky} info={tsk} sec_state={["tmarr",arr,func]}/>)}
        </div>
      </React.Fragment>
    );
  } else {
    return null;
  }
}
