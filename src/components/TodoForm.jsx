import React, { useState } from "react";
import styles from "./TodoForm.module.css";

function TodoForm({ addTask }) {
  const [task, setTask] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!task.trim()) return; 
    addTask(task);    
    setTask(""); 
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Enter a task..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Add
      </button>
    </form>
  );
}
  
export default TodoForm;
