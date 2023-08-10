import Input from "./Components/InputField";
import Enteries from "./Components/Enteries";
import React, {useState, useEffect} from 'react'


// Get data from local storage
const getLocalItems = () =>{
  let list = localStorage.getItem('lists');
  

  if (list) {
    return JSON.parse(localStorage.getItem('lists'));
  } else {
    return [];
  }
}

function App() {
  const [todos,setTodos] = useState(getLocalItems());

  // Set Data From Local Storage
  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(todos))
}, [todos]);



// Remove Item Functionality
const removeToDO = (id) => {
  const newTodos = todos.filter((todo) => todo.id !== id);
  setTodos(newTodos);
};


  //Edit functionality 
  const updateTodo = (id, updatedItem) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, item: updatedItem } : todo
    );
    setTodos(updatedTodos);
  };

  // Add Item Functionality
  const addToDoHandler = (item) => {
    
    setTodos(
      [...todos,
        {
          item,
          time: new Date().toLocaleDateString(),
          id: Date.now()
        }
      ]
    )
  }
  // Enter Event Handler
  const handleKeyPress = (event) => {
    if(event.key === "Enter"){
      addToDoHandler(event.target.value);
      event.target.value = "";
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown",handleKeyPress)
    };
  }, [todos]);


  // Duplicate Enteries remove

  useEffect(() => {
    const updateTodos = todos.filter((todo, index) =>
      index === todos.findIndex(t => t.item === todo.item)
    );

    setTodos(updateTodos);
  }, [todos]);

  return (
    <div className="bg-[#350435] h-screen p-3 flex">
      <div className="w-[95%] h-[60vh] sm:w-[50%] sm:h-[80vh] shadow-2xl rounded bg-[#FFE6FC] m-auto">
        <h1 className="text-center font-bold text-white text-xl bg-[#913891] p-2 sm:text-2xl sm:p-3 xl:text-4xl">ToDo List </h1>
        <Input handler = {addToDoHandler} />
        <Enteries data = {todos} removeHandler={removeToDO} updateTodo= {updateTodo}/>

      </div>
    </div>
  );
}

export default App;
