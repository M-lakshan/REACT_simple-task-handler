/* eslint-disable default-case */
import React, { useState } from 'react';
import { date_validator, time_validator } from './date_n_time.js';
 
const EditPreview = ({ edit, comp_st, user_tasks }) => {
  const [current_error,setCurrentError] = useState('');
  const [tag_imp,setTagImp] = useState(false);
  const [tag_urg,setTagUrg] = useState(false);
  const [tag_pvt,setTagPvt] = useState(false);
  const { id, name, details, scheduled_for, tag, completed, removed } = edit[0][1];

  const setCurrentErrorValue = (val) => {
    document.querySelector(".error_pop_up").classList.add('active');
    setCurrentError(val);
    setTimeout(() => {
      document.querySelector(".error_pop_up").classList.remove('active');
      setCurrentError('');
    },3000);
  }
  const generate_task_id = () => (user_tasks[0].map(tsk => tsk.id)).sort((a,b) => b-a)[0] + 1;
  const handleSubmit = (e) => {
    const holder = e.target.form;
    e.preventDefault();
    
    if(holder.task_title.value.length<5) {
      setCurrentErrorValue("task title must contain at least 5 charactors!");
    } else {
      let task_id = holder.task_id.value;
      // let task_cmp = holder.task_ste_complete.value;
      // let task_rmv = holder.task_ste_remove.value;
      let task_title = holder.task_title.value;
      let task_details = holder.task_details.value;
      let task_schedule_date = holder.task_schedule_date.value;
      let task_schedule_time = holder.task_schedule_time.value;
      let task_tag = ((holder.task_tag_important.checked) ? "imp" : 
        (((holder.task_tag_urgent.checked) ? "urg" : 
        ((holder.task_tag_private.checked) ? "pvt" : false ))));
      let updating_task_arr = user_tasks[0];
        
      if(!(/[0-9]/).test(task_id)) {
        task_id = generate_task_id();
      } else {
        updating_task_arr = user_tasks[0].filter(tsk => tsk.id!==parseInt(task_id));
      }

      const update_tasks = (_date=task_schedule_date,_time=task_schedule_time) => {
        updating_task_arr.push({
          id: parseInt(task_id),
          name: task_title,
          details: task_details,
          scheduled_for: [_date,_time],
          completed: false,
          removed: false,
          tag: (!task_tag) ? "pvt" : task_tag
        });
      
        user_tasks[1](updating_task_arr);
      }
        
      if(task_schedule_date.length>3) {
        if(date_validation(task_schedule_date)) {
          update_tasks();
        } else {
          setCurrentErrorValue("enter a valid date");
        }
      }

      setTimeout(() => update_tasks("",""),300);
      setTimeout(() => cancelTsk(),500);
    }
  }
  const number_only_validation = (edit,type) => {
    let passing_val = edit.target.value[(edit.target.value.length)-1];

    if((/[0-9]/).test(parseInt(edit.target.value[edit.target.value.length-1]))) {
      if(type==="date") {
        date_validation(passing_val);
      } else {

        if(document.getElementById("task_schedule_time").value.length<6) {
          time_validation(passing_val);
        } else {
          document.getElementById("task_schedule_time").value = document.getElementById("task_schedule_time")
            .value.substring(0,5);
        }
      }
    } else {
      if(type==="date") {
        let elm_val = document.getElementById("task_schedule_date").value; 
        document.getElementById("task_schedule_date").value = elm_val.substring((elm_val.length-3),(elm_val.length-1));
      } else {
        let elm_val = document.getElementById("task_schedule_time").value;
        
        if(document.getElementById("task_schedule_time").value.length>=5) {
          document.getElementById("task_schedule_time").value = elm_val.substring(0,5) + 
            ((passing_val==='a' || passing_val==='p') ? passing_val+'m' : '');
          
          setTimeout(() => {
            if(document.getElementById("task_schedule_date").value==='') {
              setCurrentErrorValue("enter a date value");
            } else {
              if(time_validator(
                  document.getElementById("task_schedule_date").value,
                  document.getElementById("task_schedule_time").value
                )!==true) {
                document.getElementById("task_schedule_time").value = '';
                setCurrentErrorValue("enter a valid time");
              }
            }},
          1000);
        } else {
          document.getElementById("task_schedule_time").value = elm_val.substring((elm_val.length-3),(elm_val.length-1));
        }
      }
    }
  }
  const make_i_ii_digits = (id,type,fst_sec,comp,digit) => {
    if(!(/[0-9]/).test(parseInt(digit))) {
      document.getElementById(id).value = '';
    } else {
      if(fst_sec==="fst") {
        document.getElementById(id).value = (digit<=comp) ? digit : '0'+digit+((type==="time") ? ':' : '/');
      } else {
        document.getElementById(id).value = document.getElementById(id).value.substring(0,2) + 
          ((type==="time") ? ':' : '/') +
          ((digit<=comp) ? digit : '0'+digit);
      }
    }
    return true;
  }
  const date_validation = (val) => {
    let main_input = document.getElementById("task_schedule_date").value;
    let date_val = val;
    let state = false;

    switch(main_input.length) {
      case 1:
        state = make_i_ii_digits("task_schedule_date","date","fst",3,date_val);
        break;
      case 2: {
        document.getElementById("task_schedule_date").value = main_input+'/';
        state = true;
        break;
      }
      case 4: {
        state = make_i_ii_digits("task_schedule_date","date","sec",1,date_val);
        state = true;
        break;
      }
      case 5: {
        document.getElementById("task_schedule_date").value = main_input.substring(0,5);

        if(date_validator(main_input)!==true) {
          state = false;
          document.getElementById("task_schedule_date").value = '';
          setCurrentErrorValue("enter a valid date");
        } else {
          state = true;
        }
        break;
      }
      default: {
        document.getElementById("task_schedule_date").value = main_input.substring(0,5);
        document.getElementById("task_schedule_time").focus();
      }
    }
      
    return state;
  }
  const time_validation = (val) => {
    let main_input = document.getElementById("task_schedule_time").value;
    let time_val = val;
    let state = false;

    switch(main_input.length) {
      case 1:
        state = make_i_ii_digits("task_schedule_time","time","fst",1,time_val);
        break;
      case 2: {
        document.getElementById("task_schedule_time").value = main_input+':';
        state = true;
        break;
      }
      case 4: {
        state = make_i_ii_digits("task_schedule_time","time","sec",5,time_val);
        state = true;
        break;
      }
      case 5: {
        document.getElementById("task_schedule_time").value = main_input.substring(0,7);
        state = true;
        break;
      }
      default: {
        if(time_val!=='a' || time_val!=='p') {
          document.getElementById("task_schedule_time").value = main_input.substring(0,6);
        } else {
          document.getElementById("task_schedule_time").value = main_input.substring(0,5);
        }
        state = true;
        break;
      }
    }

    return state;
  }
  const cancelTsk = () => {
    document.querySelector('footer').classList.remove('focus_out');
    edit[1](false,{});
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
      <div className={(current_error==='') ? "error_pop_up" : "error_pop_up active"}>
        <p className="error">{current_error}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input type="hidden" id="task_id" defaultValue={id} required/>
        <input type="hidden" id="task_ste_remove" defaultValue={removed} required/>
        <input type="hidden" id="task_ste_complete" defaultValue={completed} required/>
        <div className="for_title">
          <label htmlFor="task_title">Title : </label>&nbsp;&nbsp;&nbsp;
          <input type="text" id="task_title" defaultValue={name} placeholder=" - add the task title - " required/>
        </div>
        <div className="for_details">
          <label htmlFor="task_details">Details : </label>&nbsp;&nbsp;&nbsp;
          <textarea type="text" id="task_details" defaultValue={details} 
            placeholder=" 
            - provide a brief info -  
            - optional description - "/>
        </div>
        <div className="for_schedule">
          <label htmlFor="task_schedule">Scheduled for : </label>&nbsp;&nbsp;&nbsp;
          <div id="task_schedule">
            <input type="text" id="task_schedule_date" onChange={(e) => number_only_validation(e,"date")}
              defaultValue={(scheduled_for) && scheduled_for[0]} placeholder="DD/MM"/>
            <input type="text" id="task_schedule_time" onChange={(e) => number_only_validation(e,"time")}
              defaultValue={(scheduled_for) && scheduled_for[1]} placeholder="00:00am"/>
          </div>
        </div>
        <div className="task_tags">
          <p>Tags : </p>&nbsp;&nbsp;&nbsp;
          <div className="tag_list">
            <label htmlFor="task_tag_important" 
              className={((tag && tag.includes('tag_imp')) || ((tag_imp!==false))) ? "active" : undefined}
              onClick={() => handleTagClick('imp')}>
              {(tag_imp===true) && <span>
                <i className="fa-solid fa-tag"></i>&nbsp;
              </span>}
              important
            </label>&nbsp;
            <label htmlFor="task_tag_urgent" 
              className={((tag && tag.includes('tag_urg')) || ((tag_urg!==false))) ? "active" : undefined}
              onClick={() => handleTagClick('urg')}>
              {(tag_urg===true) && <span>
                <i className="fa-solid fa-tag"></i>&nbsp;
              </span>}
              urgent
            </label>&nbsp;
            <label htmlFor="task_tag_private" 
              className={((tag && tag.includes('tag_pvt')) || ((tag_pvt!==false))) ? "active" : undefined}
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