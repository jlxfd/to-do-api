import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([])
  const [data, setData] = useState(null);
  
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

  const handleChange = async e => {
    e.preventDefault();
    setTodoText(e.target.value);
    // try {
    //   const response = await fetch('/todo-entries', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ entry: todoText })
    //   })
    //   const body = await response.text();
    //   setTodoText(body)
    // } catch (error) {
    //   console.log("Error", error)
    // }
  }

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

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-us', {month: 'long', day: 'numeric'})
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>{!data ? "Loading..." : data}</p>
      </header>
    
      <div>
        <h1 className="heading">TODAY</h1>
        <p class="date">{formatDate(Date.now())}</p>
      </div>

      <input className="todo-space" type="text" value={todoText} onChange={handleChange}/>
        <button className="add-button" onClick={handleClick}>+</button> 

        <ul className='to-dos'>
        {todos.map((todo, idx)=>{
          return (
            <li key={`todo-${todo._id}`}>
              <div>
                <p>{todo.entry}</p>
                <button data-idx={idx} data-id={todo._id} onClick={handleDelete}>×</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}

export default App;
