import React, { useState, useEffect } from "react";
import styles from "./components/App.module.css";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState(JSON.parse(localStorage.getItem("todos")) || []);

  
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);  

  function addTask(task) {  
    const newTodos = [...todos, { id: Date.now(), text: task, completed: false }];
    setTodos(newTodos);
  }

  function deleteTask(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function updateTask(id, newText) {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );
  }

  function toggleComplete(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );  
  }

  return (
    <div className={styles.app}>
      <h2>Dynamic To-Do List 📝</h2>
      <TodoForm addTask={addTask}/>
      <TodoList 
        todos={todos}
        deleteTask={deleteTask}
        updateTask={updateTask}
        toggleComplete={toggleComplete}
      />
    </div>
  );
}

export default App;
