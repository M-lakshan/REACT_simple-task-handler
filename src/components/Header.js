import SubTitleClock from './SubTitleClock';
import logo from './../imgs/logo.png';
import { getDateTime } from './date_n_time.js';

const Header = ({sub_title}) => {
  let date = new Date();

  // const retrieve_time = (cdt) => {
  //   return useEffect(
  //     setInterval(
  //       getDateTime("time",cdt),
  //       1000
  //     ),[]
  //   )
  // }

  return (
    <header className="App-header">
      <section className="main-title">
        <img src={logo} className="App-logo" alt="logo"/>
        <h2 className="title">Task Handler</h2>
      </section>
      <section className="sub-title">
        <h3 className="sub-title">{sub_title}</h3>
        <div className="date_n_time">
          <p className="date">
            {getDateTime("date",date)[0]}
            <sup>{getDateTime("date",date)[1]}</sup>&nbsp;
            {getDateTime("date",date)[2]}
          </p>
          <SubTitleClock date_val={date} func={(e) => getDateTime("time",e)} />
        </div>
      </section>
    </header>
  );
}

Header.defaultProps = {
  sub_title: ''
}

export default Header;