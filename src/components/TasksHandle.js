// import React, { useEffect, useCallback } from 'react';
import React from 'react';
import { tasks } from './task_list.js';
import { TasksUndone, TasksDone, TasksRemoved, TasksMissed } from './Task.js';

const check_missed_task_sts = (sts) => {
  if(sts.length<2) {
    return false;
  } else {
    let current_date = new Date();
    let scheduled_date_i = parseInt(sts.substring(0,sts.indexOf('/')));
    let scheduled_date_ii = parseInt(sts.substring(sts.indexOf('/'),sts.length));

    if((current_date.getDate() > scheduled_date_i) && ((current_date.getMonth()+1) > scheduled_date_ii)) {
      return true;
    } else {
      return false;
    }
  }
}

export const TasksHandle = (props) => {
  const appStateObj = props.appState;
  const myTasks = tasks;
  let tasks_undone = appStateObj["tuarr"];
  let tasks_done = appStateObj["tdarr"];
  let tasks_missed = appStateObj["trarr"];
  let tasks_removed = appStateObj["tmarr"];

  // const derivate_tasks = useCallback((arr) => {
  const derivate_tasks = (arr) => {
    let new_arr =[];

    arr.forEach(tsk => {
      if(tsk.completed!==true && check_missed_task_sts(tsk.scheduled_for[0])) {
        new_arr = tasks_missed['arr'];
      } else if(tsk.removed) {
        new_arr = tasks_removed['arr'];
      } else if(tsk.completed && tsk.removed!==false) {
        new_arr = tasks_done['arr'];
      } else {
        new_arr = tasks_undone['arr'];
      }
      new_arr.push(tsk);
    });

    return null;
  // },[]);
  }

  // useEffect(() => derivate_tasks(myTasks),[derivate_tasks]);

  return (
    <section className="tasks">
      {derivate_tasks(myTasks)}
      <TasksUndone arr={tasks_undone} func={appStateObj["tuarr"]["func"]}/>
      {/* <TasksDone arr={tasks_done} func={appStateObj["tdarr"]["func"]}/> */}
      {/* <TasksRemoved arr={tasks_removed} func={appStateObj["trarr"]["func"]}/> */}
      {/* <TasksMissed arr={tasks_missed} func={appStateObj["tmarr"]["func"]}/> */}
    </section>
  );
}

export default TasksHandle;