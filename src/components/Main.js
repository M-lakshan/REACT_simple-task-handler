import React, { useState } from 'react';
import TasksHandle from './TasksHandle.js';

const Main = ({taskManage}) => {
  const [tuarr,setTUArray] = useState([]);
  const [tdarr,setTDArray] = useState([]);
  const [trarr,setTRArray] = useState([]);
  const [tmarr,setTMArray] = useState([]);
  const stateObj = {
    "tuarr": {
      arr: tuarr,
      func: (param) => setTUArray(param)
    },
    "tdarr": {
      arr: tdarr,
      func: (param) => setTDArray(param)
    },
    "trarr": {
      arr: trarr,
      func: (param) => setTRArray(param)
    },
    "tmarr": {
      arr: tmarr,
      func: (param) => setTMArray(param)
    },
  }

  return (
    <main className="App-main">
      <TasksHandle appState={stateObj} tskMngr={taskManage}/>
    </main>
  );
}

export default Main;