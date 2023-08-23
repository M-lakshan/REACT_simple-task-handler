import Header from './components/Header.js';
import Main from './components/Main.js';
import Footer from './components/Footer.js';
import { useState } from 'react';
import './styles/App.css';

function App() {
  const [currentEdit,setCurrentEdit] = useState([false,{}]);

  return (
    <div className="App">
      <Header />
      <Main 
        cur_edit_alt={[currentEdit,(edit) => setCurrentEdit(edit)]}
      />
      <Footer 
        cur_edit_alt={[currentEdit,(edit) => setCurrentEdit(edit)]}
      />
    </div>
  );
}

export default App;