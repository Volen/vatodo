import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./task.css";

const TaskList = ({ tasksList, deleteHandler }) => (
  <ul>
    {tasksList.map(({ id, task, completed }) => (
      <li key={id} className={`completed-${completed.toString()}`}>
        [{task}]<button>Complete task</button>
        <button data-id={id} onClick={deleteHandler}>Delete Task</button>
      </li>
    ))}
  </ul>
);

const AddTask = ({ taskName, handleChange, submitHandler }) => (
  <div>
    <input
      type="text"
      placeholder="add new task here"
      value={taskName}
      onChange={handleChange}
    />
    <button onClick={submitHandler}>Add task</button>
  </div>
);

function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [taskName, setTaskName] = React.useState("");

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const submitHandler = () => {
    const newTask = {
      id: uuidv4(),
      task: taskName,
      completed: false,
    };
    setTasks(tasks.concat(newTask));
    localStorage.setItem("tasks", JSON.stringify(tasks.concat(newTask)));
    setTaskName("");
  };

  const deleteHandler = (event) => {
    const id = event.target.getAttribute('data-id');
    const newList = tasks.filter((item) => item.id !== id);
    setTasks(newList);
    localStorage.setItem("tasks", JSON.stringify(newList));
  };

  return (
    <div>
      <h1>TODO list</h1>

      <AddTask
        taskName={taskName}
        handleChange={handleChange}
        submitHandler={submitHandler}
      />

      <TaskList tasksList={tasks} deleteHandler={deleteHandler}/>
    </div>
  );
}

export default App;
