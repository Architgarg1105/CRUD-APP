import React, {useState, useEffect} from "react";
import './App.css';

//importing components
import Form from "./components/Form";
import TodoList from "./components/TodoList";

function App() {
  //STATES

  // inputText is a value, setInputText allows to chage that inputText value
  const [inputText, setInputText] = useState("");
  // [] is arrayOfObject
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filterTodos, setFilterdTodos] = useState([]);

  //USEEFFECT
  useEffect(() => {
    getLocalTodos();
  }, []);

  useEffect(() => {
    //FUNCTIONS, EVENTS
    const filterHandler = () => {
      switch(status) {
        case "completed":
          setFilterdTodos(todos.filter(todo => todo.completed === true))
          break;
        case "uncompleted":
          setFilterdTodos(todos.filter(todo => todo.completed === false))
          break;
        default:
          setFilterdTodos(todos);
    }
  };
     filterHandler();
     saveLocalTodos();
  }, [todos, status]);

  //SAVE TO LOCAL
  const saveLocalTodos = () => {
      localStorage.setItem('todos', JSON.stringify(todos));
  };

  const getLocalTodos = () => {
    if(localStorage.getItem('todos') === null){
      localStorage.setItem('todos', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  };

  return (
    <div className="App">
      <header>
        <h2>To Do List</h2>
      </header>

      <Form 
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}/>

      <TodoList 
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filterTodos} />

    </div>
  );
}

export default App;