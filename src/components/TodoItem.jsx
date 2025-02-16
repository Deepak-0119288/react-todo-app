import React, { useState } from "react";
import styles from "./TodoItem.module.css";

function TodoItem({ todo, deleteTask, updateTask, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  function handleUpdate() {
    if (!newText.trim()) return; 
    updateTask(todo.id, newText);
    setIsEditing(false);
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleUpdate();
    }
  }
  
  return (
    <li className={styles.item}>
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={handleKeyDown} 
            className={styles.editInput}
          />
          <span onClick={handleUpdate} className={styles.saveButton}>
            ✔️
          </span>
        </div>
      ) : (
        <div className={styles.taskContainer}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
            className={styles.checkbox}
          />
          <span className={`${styles.text} ${todo.completed ? styles.completed : ""}`}>
            {todo.text}
          </span>

          <div className={styles.actions}>
            <span onClick={() => setIsEditing(true)} className={styles.editButton}>
              ✏️
            </span>
            <span onClick={() => deleteTask(todo.id)} className={styles.deleteButton}>
              ❌
            </span>
          </div>
        </div>
      )}
    </li>
  );
}

export default TodoItem;
