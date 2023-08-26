import React from 'react';
import { TasksUndone, TasksDone, TasksRemoved, TasksMissed } from './Task.js';
import { check_missed_task_sts } from './date_n_time.js';
  
const Main = ({ cur_edit_alt, cur_tasks_list }) => {
  let tasks_undone = [];
  let tasks_done = [];
  let tasks_missed = [];
  let tasks_removed = [];
  let alt_myTasks = cur_tasks_list[0];
  let alt_setMyTasks = cur_tasks_list[1];

  const derivate_tasks = (arr) => {
      
    arr.forEach(tsk => {
      if(tsk.completed!==true) {
        if(check_missed_task_sts(tsk.scheduled_for[0]) && tsk.scheduled_for[0]!=="") {
          tasks_missed.push(tsk);
        } else {
          if(tsk.removed) {
            tasks_removed.push(tsk);
          } else {
            tasks_undone.push(tsk);
          }
        }
      } else if(tsk.completed && tsk.removed!==true) {
        tasks_done.push(tsk);
      } else if(tsk.removed) {
        tasks_removed.push(tsk);
      } else {
        tasks_undone.push(tsk);
      }
    });
  }

  derivate_tasks(alt_myTasks);

  return (
    <main className="App-main">
      <section className="tasks">
        <TasksUndone 
          arr={tasks_undone}
          tsk_st={[alt_myTasks,(update) => alt_setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksDone 
          arr={tasks_done}
          tsk_st={[alt_myTasks,(update) => alt_setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksRemoved 
          arr={tasks_removed}
          tsk_st={[alt_myTasks,(update) => alt_setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
        <TasksMissed 
          arr={tasks_missed}
          tsk_st={[alt_myTasks,(update) => alt_setMyTasks(update)]}
          cur_edit={cur_edit_alt}
        />
      </section>
    </main>
  );
}

export default Main;