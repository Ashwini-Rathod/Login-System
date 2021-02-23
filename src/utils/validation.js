export function validateTask(task){
    if(task === null){
      return true;
    }
    else{
      let regex = /^[A-Za-z0-9 _]*$/;
      if (!regex.test(task) || task.trim() === "") {
        return true;
      }
    }
}

