import React, { useState, useEffect, useCallback } from 'react';
import Input from './Components/InputField';
import Enteries from './Components/Enteries';

const getLocalItems = () => {
  const list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

function App() {
  const [todos, setTodos] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(todos));
  }, [todos]);

  const removeToDO = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateTodo = (id, updatedItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, item: updatedItem } : todo
    );
    setTodos(updatedTodos);
  };

  const addToDoHandler = useCallback(
    (item) => {
      setTodos([
        ...todos,
        {
          item,
          time: new Date().toLocaleDateString(),
          id: Date.now(),
        },
      ]);
    },
    [todos]
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && event.target.value.trim() !== '') {
        addToDoHandler(event.target.value);
        event.target.value = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [addToDoHandler]);

  // useEffect(() => {
  //   const updateTodos = todos.filter(
  //     (todo, index) => index === todos.findIndex((t) => t.item === todo.item)
  //   );
  //   setTodos(updateTodos);
  // }, []);

  useEffect(() => {
    const updateTodos = todos.filter(
      (todo, index) => index === todos.findIndex((t) => t.item === todo.item)
    );
    
    if (updateTodos.length !== todos.length) {
      setTodos(updateTodos);
    }
  }, [todos]);
  

  return (
    <div className="bg-[#350435] h-screen p-3 flex">
      <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
        <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">
          ToDo List
        </h1>
        <Input handler={addToDoHandler} />
        <Enteries data={todos} removeHandler={removeToDO} updateTodo={updateTodo} />
      </div>
    </div>
  );
}

export default App;
