import { useState } from 'react';

import './App.scss';
import { getUsers,  } from './api';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a> */}
        <button onClick={getUsers} className="api-button">
          Получить пользователей
        </button>
      </div>
      <div>

        {/* <button onClick={setUser} className="api-button">
          Добавить пользователя
        </button> */}

      </div>
      <h1>Vite + React + Firebase</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
    </>
  );
}

export default App;
