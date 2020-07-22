import React from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = React.useState([]);
  const [taskName, setTaskName] = React.useState('');

  const listTasks = tasks.map(({ id, task, completed }) => <li key={id} className={`completed-${completed.toString()}`}>{task}</li>);

  const handleChange = event => {
    setTaskName(event.target.value);
  }

  const submitHandler = () => {
    const newTask = {
      id: uuidv4(),
      task: taskName,
      completed: false
    };
    setTasks(tasks.concat(newTask));
    setTaskName('');
  }

  return (
    <div>
      <h1>TODO list</h1>

      <input type="text" placeholder="add new task here" value={taskName} onChange={handleChange} />
      <button onClick={submitHandler}>Add task</button>

      <ul>
        {listTasks}
      </ul>
    </div>
  );
}

export default App;
