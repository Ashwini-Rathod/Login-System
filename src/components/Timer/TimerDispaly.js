const formattedSeconds = (sec) =>{
    if((sec / 60) < 10){
      let time =  "0" + Math.floor(sec / 60) +
        ':' +
      ('0' + sec % 60).slice(-2)
      return time;
    }
    else{
    let time = Math.floor(sec / 60) +
        ':' +
      ('0' + sec % 60).slice(-2)
      return time;
    }    
}

export default formattedSeconds;