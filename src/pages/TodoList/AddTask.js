import React, {Component} from "react";

class AddTask extends Component{
    render(){
        let {submit, handleChange, task} = this.props;
        console.log(task);
        return (
          <div>
            <form onSubmit={submit}>
              <input
                type="text"
                name="task"
                onChange={handleChange}
                value={task}
              ></input>
              <button type="submit">ADD</button>
            </form>
          </div>
        );
    }
}

export default AddTask;