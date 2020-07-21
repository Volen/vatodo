import React from "react";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [tasks, setTasks] = React.useState([
    {
      id: '0',
      task: "buy milk",
      completed: false,
    },
    {
      id: '1',
      task: "buy bread",
      completed: false,
    },
    {
      id: '2',
      task: "buy new gaming pc",
      completed: true,
    }
  ]);

  const listTasks = tasks.map(({ id, task, completed }) => <li key={id} className={`completed-${completed.toString()}`}>{task}</li>);

  const submitHandler = () => {
    const newTask = {
      id: uuidv4(),
      task: document.getElementById('task-input').value,
      completed: false
    };
    console.log(newTask);
    setTasks(tasks.concat(newTask));
  }

  return (
    <div>
      <h1>TODO list</h1>

      <input id="task-input" type="text" placeholder="add new task here" />
      <button onClick={submitHandler}>Add task</button>

      <ul>
        {listTasks}
      </ul>
    </div>
  );
}

export default App;
