import React, { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
import styles from "./TodoList.module.css";

function TodoList({ todos, deleteTask, updateTask, toggleComplete }) {
  const [filter, setFilter] = useState("all");
  const [visibleTodos, setVisibleTodos] = useState([]);

  useEffect(() => {
    setVisibleTodos(filteredTodos.slice(0, 5));
  }, [todos, filter]);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;

    if (scrollHeight - scrollTop <= clientHeight + 1) {
      if (visibleTodos.length < filteredTodos.length) {
        setVisibleTodos((prev) => [
          ...prev,
          ...filteredTodos.slice(prev.length, prev.length + 5),
        ]);
      }
    }
  };

  return (
    <div>
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterSelect}
      >  
        <option value="all">All Tasks</option>
        <option value="completed">Completed Tasks</option>
        <option value="pending">Pending Tasks</option>
      </select>
      <div className={styles.container}>
        <div className={styles.taskWrapper} onScroll={handleScroll}>
          <ul className={styles.list}>
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                deleteTask={deleteTask}
                updateTask={updateTask}
                toggleComplete={toggleComplete}
              />  
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
