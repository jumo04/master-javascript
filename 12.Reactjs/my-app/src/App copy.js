import logo from './logo.svg'; //hay que importar los archivos con import y no con la ruta como en otros

import './App.css';

import HolaMundo from './HolaMundo';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"  />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React <HolaMundo/>
        </a>
      </header>
    </div>
  );
}

export default App;
