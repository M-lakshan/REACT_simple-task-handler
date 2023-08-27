import { useState, useEffect } from 'react';

const SubTitleClock = ({ date_val, func }) => {
  const [time, setTime] = useState(date_val);

  useEffect(() => {
    let timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <p className="time">{func(time)}</p>
  );
}

export default SubTitleClock;