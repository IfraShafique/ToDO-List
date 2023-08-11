import React, { useState, useEffect } from 'react';
import Input from './Components/InputField';
import Enteries from './Components/Enteries';

// Set the data in local location 
const getLocalItems = () => {
  const list = localStorage.getItem('lists');
  return list ? JSON.parse(list) : [];
};

function App() {
  const [todos, setTodos] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
  }, [todos]);


  // Remove Items
  const removeToDo = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  // Update or edit in list
  const updateTodo = (id, updatedItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, item: updatedItem } : todo
    );
    setTodos(updatedTodos);
  };

  // Add Items And remove duplicate entries
  const addToDoHandler = (item) => {
    const isDuplicate = todos.some((todo) => todo.item === item);

    if (!isDuplicate) {
      setTodos([
        ...todos,
        {
          item,
          time: new Date().toLocaleDateString(),
          id: Date.now(),
        },
      ]);
    }
  };

  // Add when click on enter button
  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      addToDoHandler(event.target.value);
      event.target.value = '';
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className='bg-[#350435] h-screen p-3 flex'>
      <div className='w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto'>
        <h1 className='text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl'>
          ToDo List
        </h1>
        <Input handler={addToDoHandler} />
        <Enteries data={todos} removeHandler={removeToDo} updateTodo={updateTodo} />
      </div>
    </div>
  );
}

export default App;
