import logo from './../imgs/logo.png';
import getDateTime from './date_n_time.js';
// import React, { useEffect } from "react";

const Header = ({sub_title,date_n_time}) => {
  return (
    <header className="App-header">
      <section className="main-title">
        <img src={logo} className="App-logo" alt="logo" />
        <h2 className="title">Task Handler</h2>
      </section>
      <section className="sub-title">
        <h3 className="sub-title">{sub_title}</h3>
        <div className="date_n_time">
          <p className="date">{getDateTime("date")}</p>
          <p className="time">{getDateTime("time")}</p>
          {/* <p className="time">{useEffect(setInterval(getDateTime("time"),1000),[])}</p> 
          //https://sebhastian.com/setinterval-react/
          */}
        </div>
      </section>
    </header>
  );
}

Header.defaultProps = {
  sub_title: ''
}

export default Header;