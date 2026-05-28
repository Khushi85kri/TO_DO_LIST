import { useEffect, useState } from "react";

import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "firebase/firestore";

import { db } from "./firebase";

function App() {

  const [task, setTask] = useState("");

  const [todos, setTodos] = useState([]);

  // Fetch Tasks
  const fetchTasks = async () => {

    const querySnapshot = await getDocs(
      collection(db, "tasks")
    );

    const taskArray = [];

    querySnapshot.forEach((docItem) => {

      taskArray.push({
        id: docItem.id,
        ...docItem.data()
      });
    });

    setTodos(taskArray);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {

    if(task.trim() === ""){
      alert("Please enter a task");
      return;
    }

    await addDoc(collection(db, "tasks"), {
      text: task,
      completed: false,
      createdAt: new Date()
    });

    setTask("");

    fetchTasks();
  };

  // Delete Task
  const deleteTask = async (id) => {

    await deleteDoc(doc(db, "tasks", id));

    fetchTasks();
  };

  // Toggle Complete
  const toggleTask = async (id, completed) => {

    await updateDoc(doc(db, "tasks", id), {
      completed: !completed
    });

    fetchTasks();
  };

  // Enter Key Support
  const handleKeyDown = (e) => {

    if(e.key === "Enter"){
      addTask();
    }
  };

  return (

    <div className="container">

      <h1>✨ Todo App</h1>

      <div className="input-section">

        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button onClick={addTask}>
          Add
        </button>

      </div>

      <p className="count">
        Total Tasks: {todos.length}
      </p>

      {
        todos.map((todo) => (

          <div className="task" key={todo.id}>

            <span
              className={
                todo.completed
                ? "completed"
                : ""
              }
            >
              {todo.text}
            </span>

            <div className="btn-group">

              <button
                className="complete-btn"
                onClick={() =>
                  toggleTask(
                    todo.id,
                    todo.completed
                  )
                }
              >
                ✔
              </button>

              <button
                className="delete-btn"
                onClick={() =>
                  deleteTask(todo.id)
                }
              >
                ❌
              </button>

            </div>

          </div>
        ))
      }

    </div>
  );
}

export default App;