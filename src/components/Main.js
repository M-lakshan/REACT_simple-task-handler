import React, { useState } from 'react';
import { tasks } from './task_list.js';
import { TasksUndone, TasksDone, TasksRemoved, TasksMissed } from './Task.js';

const check_missed_task_sts = (sts) => {
  if(sts.length<2) {
    return false;
  } else {
    let current_date = new Date();
    let scheduled_date_i = parseInt(sts.substring(0,sts.indexOf('/')));
    let scheduled_date_ii = parseInt(sts.substring((sts.indexOf('/')+1),sts.length));

    return ((current_date.getDate() > scheduled_date_i) && ((current_date.getMonth()+1) > scheduled_date_ii));
  }
}
  
const Main = ({cur_edit_alt}) => {
  const [myTasks,setMyTasks] = useState(tasks);
  let tasks_undone = [];
  let tasks_done = [];
  let tasks_missed = [];
  let tasks_removed = [];

  const derivate_tasks = (arr) => {
    let new_arr = [];
    
    arr.forEach(tsk => {
      new_arr.push(tsk);
      if(tsk.completed!==true && check_missed_task_sts(tsk.scheduled_for[0])) {
        tasks_missed.push(tsk);
      } else if(tsk.removed) {
        tasks_removed.push(tsk);
      } else if(tsk.completed && tsk.removed!==true) {
        tasks_done.push(tsk);
      } else {
        tasks_undone.push(tsk);
      }
    });
  }

  derivate_tasks(myTasks);

  return (
    <main className="App-main">
      <section className="tasks">
        <TasksUndone 
          arr={tasks_undone}
          tsk_st={[myTasks,(update) => setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksDone 
          arr={tasks_done}
          tsk_st={[myTasks,(update) => setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksRemoved 
          arr={tasks_removed}
          tsk_st={[myTasks,(update) => setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksMissed 
          arr={tasks_missed}
          tsk_st={[myTasks,(update) => setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
      </section>
    </main>
  );
}

export default Main;