import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    fetch("http://localhost:3001//api")
    .then((res) => res.json())
    .then((data) => setData(data.entry))
    .catch((error) => {
      console.log(error)
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
      </header>
    </div>
  );
}

export default App;