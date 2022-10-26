import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import LogInPage from './pages/LogInPage';


function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/loginpage" element={<LogInPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
