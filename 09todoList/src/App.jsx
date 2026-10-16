import React from 'react';
import TodoInput from '../component/todoComponent/TodoInput'; 
import TodoList from '../component/todoComponent/TodoList';   
import './App.css';

export default function App() {
  // Add your state (e.g., todos) and functions (add, delete, toggle) here later

  return (
    <div className="app-container">
      <div className="todo-card">
        <h1 className="todo-title">My Tasks</h1>
        
        {/* Pass your props to these components once your logic is ready */}
        <TodoInput />
        <TodoList />
        
      </div>
    </div>
  );
}