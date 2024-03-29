import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState(null);
  const [compTodos, setCompTodos] = useState([])
  
  // Fetch data and from API and set todos to the data
  useEffect(() => {
    fetch("http://localhost:3001/todo-entries")
    .then(res => res.json())
    .then(data => {
      console.log(data);
      setTodos(data)
    })
    .catch(error => {
      console.log(error)
    });
  }, []);

  // Change the value of todoText to what's being written by the user
  const handleChange = e => {
    e.preventDefault();
    setTodoText(e.target.value);
  }

  // If todoText exists, post the entry on the API
  const handleClick = () => {
    // setTodos([...todos, todoText])
    todoText &&
    (fetch('http://localhost:3001/todo-entries', {
      method: 'POST',
      body: JSON.stringify({ entry: `${todoText}` }),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
    .then((res) => res.json())
    .then((data) => {
      setTodoText("");
      setTodos([...todos, data]);
    }));
  }

  // Delete the entry by using the key as index for splice method
  const handleDelete = (e) => {
    console.log(e.target.dataset.id);
    fetch(`http://localhost:3001/todo-entries/${e.target.dataset.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      todos.splice(e.target.dataset.id,1);
      setTodos([...todos]);
    })
    .catch(error => console.log(error));
  }

  // If check mark is clicked, add entry by setCompTodos then delete the entry
  const handleComplete = (e) => {
    fetch("http://localhost:3001/completed-todo-entries",)
    .then(res => res.json())
    .then(entry => {
      setCompTodos([...compTodos, entry])
      handleDelete(e)
    })
    .catch(error => {
      console.log(error)
    });
  };

  const handleDeleteCTD = (e) => {
    console.log(e.target.dataset.id);
    fetch(`http://localhost:3001/completed-todo-entries/${e.target.dataset.id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log("Data deleted", data);
      todos.splice(e.target.dataset.id,1);
    setCompTodos([...compTodos]);
    })
    .catch(error => console.log(error));
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-us', {month: 'long', day: 'numeric'})
  }

  return (
    <div className="App">    
      <div>
        <h1 className="heading">TODAY</h1>
        <p className="date">{formatDate(Date.now())}</p>
      </div>

      <input className="todo-space" type="text" value={todoText} onChange={handleChange}/>
        <button className="add-button" onClick={handleClick}>+</button> 

      <ul className='to-dos'>
        {todos.map((todo, idx) => {
          return (
            <li key={`todo-${todo._id}`}>
              <div>
                <p>{todo.entry}</p>
                <button data-idx={idx} data-id={todo._id} onClick={handleDelete}>×</button>
                <button data-idx={idx} data-id={todo._id} onClick={handleComplete}>✓</button>
              </div>
            </li>
          )
        })}
      </ul>

      <ul className="completed-to-dos">
        {compTodos.map((compTodo, idx) => {
          return (
            <li key={`completed ${compTodo._id}`}>
              <div>
                <p>{compTodo.entry}</p>
                <button data-idx={idx} data-id={compTodo._id} onClick={handleDeleteCTD}>×</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
