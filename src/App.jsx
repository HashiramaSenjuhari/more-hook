import React, { useReducer, useRef } from 'react';
import './App.css'

const initialState = {
  tasks: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { tasks: [...state.tasks, { id: Date.now(), text: action.payload, hidden: false }] };

    case 'TOGGLE_TASK':
      return {
        tasks: state.tasks.map((task) =>
          task.id === action.payload ? { ...task, hidden: !task.hidden } : task
        ),
      };

    default:
      return state;
  }
};

const TaskList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const inputRef = useRef();

  const handleAddTask = () => {
    const taskText = inputRef.current.value;
    if (taskText.trim() !== '') {
      dispatch({ type: 'ADD_TASK', payload: taskText });
      inputRef.current.value = '';
    }
  };

  const handleToggleTask = (taskId) => {
    dispatch({ type: 'TOGGLE_TASK', payload: taskId });
  };

  const scrollToInput = () => {
    inputRef.current.scrollIntoView({ behavior: 'smooth' });
    inputRef.current.focus();
  };

  return (
    <div className="task-list-container">
      <div>
        <input type="text" ref={inputRef} placeholder="Add a task" />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul>
        {state.tasks.map((task) => (
          <li key={task.id}>
            <span className={task.hidden ? 'hidden' : ''}>{task.text}</span>
            <button onClick={() => handleToggleTask(task.id)}>Toggle</button>
          </li>
        ))}
      </ul>
      <button onClick={scrollToInput} className="scroll-to-input-button">
        Scroll to Input
      </button>
    </div>
  );
};

export default TaskList;
