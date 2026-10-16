import React from 'react';
import './TodoInput.css';

export default function TodoInput() {
  // Add your state and submit handlers here later

  return (
    <form className="todo-input-form">
      <input
        type="text"
        className="todo-input"
        placeholder="What needs to be done?"
        // Add your value and onChange props here
      />
      <button type="submit" className="add-button">
        Add
      </button>
    </form>
  );
}