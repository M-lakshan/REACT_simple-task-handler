import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import {useState} from 'react';
import './styles/App.css';

function App() {
  const [taskManagePanel,setTaskManagePanel] = useState(false);
  const [currentTskEditInfo,setCurrentTskEditInfo] = useState({});
  const setTskMngPanel = (param_i,param_ii) => {
    setCurrentTskEditInfo(param_ii);
    setTimeout(setTaskManagePanel(param_i),50);
  }

  return (
    <div className="App">
      <Header />
      <Main taskManage={[taskManagePanel,setTskMngPanel]}/>
      <Footer 
        taskManage={[taskManagePanel,setTskMngPanel]} 
        curEdit={[currentTskEditInfo,setCurrentTskEditInfo]}
      />
    </div>
  );
}

export default App;