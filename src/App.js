import React from "react";
import { v4 as uuidv4 } from "uuid";
import "./task.css";

const TaskList = ({ tasksList, deleteHandler, completeHandler }) => (
  <ul>
    {tasksList.map(({ id, task, completed }) => (
      <li key={id} className={`completed-${completed.toString()}`}>
        [{task}]
        <button data-id={id} onClick={completeHandler}>
          {completed ? "Undo" : "Complete task"}
        </button>
        <button data-id={id} onClick={deleteHandler}>
          Delete Task
        </button>
      </li>
    ))}
  </ul>
);

const AddTask = ({ taskName, handleChange, addHandler }) => (
  <div>
    <input
      type="text"
      placeholder="add new task here"
      value={taskName}
      onChange={handleChange}
    />
    <button onClick={addHandler}>Add task</button>
  </div>
);

function App() {
  const [tasks, setTasks] = React.useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [taskName, setTaskName] = React.useState("");

  React.useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleChange = (event) => {
    setTaskName(event.target.value);
  };

  const addHandler = () => {
    const newTask = {
      id: uuidv4(),
      task: taskName,
      completed: false,
    };
    setTasks(tasks.concat(newTask));
    setTaskName("");
  };

  const deleteHandler = (event) => {
    const id = event.target.getAttribute("data-id");
    const newList = tasks.filter((item) => item.id !== id);
    setTasks(newList);
  };

  const completeHandler = (event) => {
    const id = event.target.getAttribute("data-id");
    const newList = tasks.map((task) => {
      if (task.id === id) {
        const newTask = {
          ...task,
          completed: !task.completed,
        };
        return newTask;
      } else {
        return task;
      }
    });

    setTasks(newList);
  };

  return (
    <div>
      <h1>TODO list</h1>

      <AddTask
        taskName={taskName}
        handleChange={handleChange}
        addHandler={addHandler}
      />

      <TaskList
        tasksList={tasks}
        deleteHandler={deleteHandler}
        completeHandler={completeHandler}
      />
    </div>
  );
}

export default App;
