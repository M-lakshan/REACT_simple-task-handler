export function getDateTime(type,date) {

  const date_post_identifier = (num) => {
    switch(num) {
      case 1: case 21: case 31:
        return "st";
      case 2: case 22:
        return "nd";
      case 3: case 13: case 33:
        return "rd";
      default:
        return "th";
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
    return ([
      (date.getDate()),
      (date_post_identifier(date.getDate())),
      (' '+week_date_identifier(date.getDay())
      +' '+month_identifier(date.getMonth())
      +' '+date.getFullYear())
    ]);
  } else {
    let hours = date.getHours();
    let minutes = ((date.getMinutes()<10) ? '0'+date.getMinutes() : date.getMinutes());
    let hour_format = (hours > 12);
    return ((hour_format) ? (hours-12)+':'+minutes+"pm" : ((hours === 0) ? 12 : hours)+':'+minutes+"am");
  }
}

export const date_validator = (_date) => {
  let current_date = new Date();
  let scheduled_date_i = parseInt(_date.substring(0,_date.indexOf('/')));
  let scheduled_date_ii = parseInt(_date.substring(_date.indexOf('/')+1,_date.length));

    console.log(scheduled_date_ii >= current_date.getMonth()+1) 
    console.log (scheduled_date_i >= current_date.getDate())
 console.log (
        (!(scheduled_date_i >= current_date.getDate())) && 
        (scheduled_date_ii >= current_date.getMonth()+1)
      );

  if(scheduled_date_ii >= current_date.getMonth()+1) {
    if(scheduled_date_i >= current_date.getDate()) {
      return true;
    } else {
      return (
        (!(scheduled_date_i >= current_date.getDate())) && 
        (scheduled_date_ii >= current_date.getMonth()+1)
      );
    }
  } else {
    return false;
  }
}

export const time_validator = (_date,_time) => {
  let current_time = new Date();
  let current_time_AmPm = (current_time.getHours() > 12) ? "pm" : "am";
  let scheduled_time_AmPm = (_time.substring(_time.indexOf(':')+3,(_time.indexOf(':')+6)));
  let scheduled_time_i = parseInt(_time.substring(0,_time.indexOf(':')));
  let scheduled_time_ii = parseInt(_time.substring(_time.indexOf(':')+1,(_time.indexOf(':')+3)));

  if(date_validator(_date)) {
    if(scheduled_time_i <= parseInt(current_time.getHours())) {
      if(scheduled_time_ii > parseInt(current_time.getMinutes())) {
        return true;
      } else {
        return (scheduled_time_AmPm !== current_time_AmPm);
      }
    } else {
      return (scheduled_time_AmPm !== current_time_AmPm);
    }
  } else {
    return false;
  }
}

export const check_missed_task_sts = (pd) => {
  if(pd.length>3) {
    console.log(date_validator(pd),pd)
    return ((date_validator(pd)) ? false : true);
  } else {
    console.log("empty")
    return true;
  }
}