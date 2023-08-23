import React from 'react';
import { tasks } from './task_list.js';
import { TasksUndone, TasksDone, TasksRemoved, TasksMissed } from './Task.js';
import { check_missed_task_sts } from './date_n_time.js';

export const TasksHandle = (props) => {
  const appStateObj = props.appState;
  const myTasks = tasks;
  const taskManagerArr = props.tskMngr;
  let tasks_undone = appStateObj["tuarr"]["arr"];
  let tasks_done = appStateObj["tdarr"]["arr"];
  let tasks_missed = appStateObj["trarr"]["arr"];
  let tasks_removed = appStateObj["tmarr"]["arr"];

  // useEffect(() => {
  const derivate_tasks = () => {
    let new_arr = [];
    
    myTasks.forEach(tsk => {
      new_arr.push(tsk);
      if(tsk.completed!==true && check_missed_task_sts(tsk.scheduled_for[0])) {
        (!tasks_missed.includes(tsk)) && tasks_missed.push(tsk);
      } else if(tsk.completed!==true && tsk.removed) {
        (!tasks_removed.includes(tsk)) && tasks_removed.push(tsk);
      } else if(tsk.completed && tsk.removed) {
        (!tasks_done.includes(tsk)) && tasks_done.push(tsk);
      } else {
        (!tasks_undone.includes(tsk)) && tasks_undone.push(tsk);
      }
    });
  }
  // },[]);
  
  derivate_tasks();

  return (
    <section className="tasks">
      <TasksUndone
        arr={tasks_undone}
        func={appStateObj["tuarr"]["func"]}
        stObj={appStateObj}
        tskMngrArr={taskManagerArr}
      />
      <TasksDone 
        arr={tasks_done}
        func={appStateObj["tdarr"]["func"]}
        stObj={appStateObj}
        tskMngrArr={taskManagerArr}
      />
      <TasksRemoved 
        arr={tasks_removed}
        func={appStateObj["trarr"]["func"]}
        stObj={appStateObj}
        tskMngrArr={taskManagerArr}
      />
      <TasksMissed 
        arr={tasks_missed}
        func={appStateObj["tmarr"]["func"]}
        stObj={appStateObj}
        tskMngrArr={taskManagerArr}
      />
    </section>
  );
}

export default TasksHandle;