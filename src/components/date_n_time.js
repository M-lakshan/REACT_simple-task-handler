function getDateTime(type) {
  let date = new Date();

  const date_post_identifier = (num) => {
    switch(num) {
      case 1: case 21: case 31:
        return num+"<sup>st</sup>";
      case 2: case 22:
        return num+"<sup>nd</sup>";
      case 3: case 13: case 33:
        return num+"<sup>rd</sup>";
      default:
        return num+"<sup>th</sup>";
    }
  }
  const week_date_identifier = (num) => {
    switch(num) {
      case 1:
        return 'Monday';
      case 2:
        return 'Tuesday';
      case 3:
        return 'Wednesday';
      case 4:
        return 'Thursday';
      case 5:
        return 'Friday';
      case 6:
        return 'Saturday';
      default:
        return 'Sunday';
    }
  }
  const month_identifier = (num) => {
    switch(num) {
      case 1:
        return 'February';
      case 2:
        return 'March';
      case 3:
        return 'April';
      case 4:
        return 'May';
      case 5:
        return 'June';
      case 6:
        return 'July';
      case 7:
        return 'August';
      case 8:
        return 'September';
      case 9:
        return 'October';
      case 10:
        return 'November';
      case 11:
        return 'December';
      default:
        return 'January';
    }
  }

  if(type==='date') {
    return (
      date_post_identifier(date.getDate())+' '+
      week_date_identifier(date.getDay())+' '+
      month_identifier(date.getMonth())+' '+
      date.getFullYear()
      );
  } else {
    let hours = date.getHours();
    let minutes = ((date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes());
    let hour_format = (hours > 12);
    return ((hour_format) ? (hours-12)+':'+minutes+"pm" : ((hours === 0) ? 12 : hours)+':'+minutes+"am");
  }
}

export default getDateTime;