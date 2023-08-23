/* eslint-disable default-case */
import React, { useState } from 'react';
import { date_validator, time_validator, getDateTime } from './date_n_time.js';
 
const EditPreview = ({ edit, comp_st }) => {
  const [current_error,setCurrentError] = useState('');
  const [tag_imp,setTagImp] = useState(false);
  const [tag_urg,setTagUrg] = useState(false);
  const [tag_pvt,setTagPvt] = useState(false);
  const { id, name, details, scheduled_for, tag, completed, removed } = edit[0][1];

  const setCurrentErrorValue= (val) => {
    console.log(val)
    setCurrentError(val);
    setTimeout(setCurrentError(''),2000);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const holder = e.target.form;

    if(holder.getElementById("task_title").value.length<5) {
      setCurrentErrorValue("task title must contain at least 5 charactors!");
    } else {
      let task_id = parseInt(holder.getElementById("task_id").value);
      let task_cmp = holder.getElementById("task_ste_complete").value;
      let task_rmv = holder.getElementById("task_ste_remove").value;
      let task_title = holder.getElementById("task_title").value;
      let task_details = holder.getElementById("task_details").value;
      let task_schedule_date = holder.getElementById("task_schedule_date").value;
      let task_schedule_time = holder.getElementById("task_schedule_time").value;
      let task_tag = ((holder.getElementById("task_tag_important").isChecked) ? "imp" : 
        (((holder.getElementById("task_tag_urgent").isChecked) ? "urg" : 
        ((holder.getElementById("task_tag_private").isChecked) ? "pvt" : false ))));
      
      
      //////// complete the form submission
    }
  }
  const make_i_ii_digits = (id,type,fst_sec,comp,digit) => {
    if(!(/[0-9]/).test(digit)) {
      document.getElementById(id).value = '';
    } else {
      document.getElementById(id).value = (digit<=comp) ? digit : 
        '0'+digit+((fst_sec==="fst") ? ((type==="time") ? ':' : '/') : '');
    }
    return true;
  }
  const date_validation = (val) => {
    let date_val = (val[1]==="initial") ? val[0].target.value : val[0];

    switch(date_val.length) {
      case 1: {
        return (typeof(parseInt(date_val[0])==='number')) ? make_i_ii_digits("task_schedule_date","date","fst",3,parseInt(date_val[0])) : false;
      }
      case 2: {
        let state = false;

        if(typeof(parseInt(date_val.substring(0,2)))==='number') {

          if((parseInt(date_val[0])===3)) {

            if((parseInt(date_val[1])<=1)) {
              document.getElementById("task_schedule_date").value = date_val+'/';
            } else {
              state = false;
            }
          } else {
            document.getElementById("task_schedule_date").value = date_val+'/';
          }
          state = true;
        }
        return state;
      }
      case 4: {
        let state = false;

        if(date_validation([date_val.substring(0,2),"sec"]) && (typeof(parseInt(date_val[3]))=='number')) {
            
          if(parseInt(date_val[3])<=1) {
            document.getElementById("task_schedule_date").value = date_val;
          } else {
            document.getElementById("task_schedule_date").value = date_val.substring(0,3)+'0'+date_val[3];
          }
          state = true;
        } else {
          document.getElementById("task_schedule_date").value = date_val.substring(0,3);
        }
        return state;
      }
      case 5: {
        let state = false;

        if(date_validation([date_val.substring(0,2),"sec"]) &&
          date_validation([date_val.substring(3,5),"sec"])) {
          document.getElementById("task_schedule_date").value = date_val.substring(0,5);

          if(date_validator(date_val)!==true) {
            document.getElementById("task_schedule_date").value = '';
            setCurrentErrorValue("enter a valid date");
          } else {
            state = true;
          }
        }
        return state;
      }
      default: {
        document.getElementById("task_schedule_date").value = date_val.substring(0,5);
        document.getElementById("task_schedule_time").focus();
      }
    }
  }
  const time_validation = (val) => {
    let time_val = (val[1]==="initial") ? val[0][1].target.value : val[0][1];
    let date_val = val[0][0];

    switch(time_val.length) {
      case 1: {
        return (typeof(parseInt(time_val[0])==='number')) ? make_i_ii_digits("task_schedule_time","time","fst",1,parseInt(time_val[0])) : false;
      }
      case 2: {
        let state = false;

        if(typeof(parseInt(time_val.substring(0,2)))==='number') {

          if((parseInt(time_val[0])===1)) {

            if((parseInt(time_val[1])<=2)) {
              document.getElementById("task_schedule_time").value = time_val+':';
            } else {
              state = false;
            }
          } else {
            document.getElementById("task_schedule_time").value = time_val+':';
          }
          state = true;
        }
        return state;
      }
      case 4: {
        let state = false;

        if(time_validation([[date_val,time_val.substring(0,2)],"sec"]) && (typeof(parseInt(time_val[3]))==='number')) {
            
          if(parseInt(time_val[3])<=5) {
            document.getElementById("task_schedule_time").value = time_val;
          } else {
            document.getElementById("task_schedule_time").value = time_val.substring(0,3)+'0'+time_val[3];
          }
          state = true;
        } else {
          document.getElementById("task_schedule_time").value = time_val.substring(0,2);
        }
        return state;
      }
      case 5: {
        let state = false;

        if(time_validation([[date_val,time_val.substring(0,2)],"sec"]) &&
          time_validation([[date_val,time_val.substring(3,5)],"sec"])) {
          document.getElementById("task_schedule_time").value = time_val.substring(0,5);
          state = true;
        }
        return state;
      }
      default: {
        let state = false;
        let cur_date = new Date();
        let validation = getDateTime("time",cur_date);
        let time_val_i = time_val.substring(0,2);
        let time_val_ii = time_val.substring(3,5);
        let validation_index = validation.indexOf(':')+1;

        if(time_val[5]==='a') {
          document.getElementById("task_schedule_time").value = time_val.substring(0,5)+"am";
        } else if(time_val[5]==='p') {
          document.getElementById("task_schedule_time").value = time_val.substring(0,5)+"pm";
        }

        time_val = document.getElementById("task_schedule_time").value;

        const time_validation = (last,last_plus_ii) => {
          let st = false;
          let date_check = parseInt(cur_date.getDate())<=parseInt(date_val.substring(0,2));
          let month_check = parseInt(cur_date.getMonth()+1)<=parseInt(date_val.substring(3,5));
          let hours_check = parseInt(validation.substring(0,2))<=parseInt(time_val_i);
          let am_pm_check = validation.substring(validation.length-2,validation.length)===time_val.substring(last+1,last_plus_ii);
          let minutes_check = parseInt(validation.substring(validation_index,validation_index+2))>parseInt(time_val_ii);
        
          // console.log(validation,validation_index)
          // console.log('dt_chk : '+date_check,parseInt(cur_date.getDate()),parseInt(date_val.substring(0,2)));
          // console.log('mn_chk : '+month_check,parseInt(cur_date.getMonth()+1),parseInt(date_val.substring(3,5)))
          // console.log('hr_chk : '+hours_check,parseInt(validation.substring(0,2)),parseInt(time_val_i))
          // console.log('ap_chk : '+am_pm_check,validation.substring(validation.length-2,validation.length),time_val.substring(last+1,last_plus_ii))
          // console.log('mn_chk : '+minutes_check,parseInt(validation.substring(validation_index,validation_index+2)),parseInt(time_val_ii))

          if(date_check && month_check) {
            if(hours_check && minutes_check) {
              st = (am_pm_check) ? true : false;
            } else {
              st = (am_pm_check) ? true : false;
              // st = true;
            }
          }
          return st;
        }

        state = time_validation(4,7);
        console.log(state);

        if(state===false) {
          document.getElementById("task_schedule_time").value = '';
          // setCurrentErrorValue("enter a valid time");
          state = true;
        }
        return state;
      }
    }
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
            <input type="text" id="task_schedule_date" onChange={(e) => date_validation([e,"initial"])}
              defaultValue={(scheduled_for) && scheduled_for[0]} placeholder="DD/MM"/>
            <input type="text" id="task_schedule_time" onChange={(e) => time_validation([
              [(document.getElementById("task_schedule_date").value),e],"initial"
            ])}
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