import React, { useState, useEffect } from 'react';
import './App.css';
import sun from "./assets/images/icon-sun.svg";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: 'Complete online JavaScript course', completed: true },
    { id: 2, text: 'Jog around the park 3x', completed: false },
    { id: 3, text: '10 minutes meditation', completed: false },
    { id: 4, text: 'Read for 1 hour', completed: false },
    { id: 5, text: 'Pick up groceries', completed: false },
    { id: 6, text: 'Complete Todo App on Frontend Mentor', completed: false },
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    document.body.className = darkMode ? 'dark-mode' : 'light-mode';
  }, [darkMode]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo('');
    }
  };

  const handleToggleComplete = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleUpdateTodo = (id: number, newText: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className='main'>
      <div className='sun'>
        <img src={sun} alt="Sun icon" />
      </div>
        
      <div className="app">
        <header className="header">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}></button>
        </header>
        
        <h1>TO DO</h1>  {/* Added heading here */}
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Currently typing"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleAddTodo();
              }
            }}
          />
        </div>
        
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => handleToggleComplete(todo.id)}
                />
                <span
                  contentEditable
                  onBlur={(e) => handleUpdateTodo(todo.id, e.currentTarget.textContent || '')}
                  suppressContentEditableWarning={true}
                >
                  {todo.text}
                </span>
              </label>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
        
        <div className="footer">
          <span>{todos.filter(todo => !todo.completed).length} items left</span>
          <div className="filters">
            <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All</button>
            <button className={filter === 'active' ? 'active' : ''} onClick={() => setFilter('active')}>Active</button>
            <button className={filter === 'completed' ? 'active' : ''} onClick={() => setFilter('completed')}>Completed</button>
          </div>
          <button onClick={() => setTodos(todos.filter(todo => !todo.completed))}>
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
