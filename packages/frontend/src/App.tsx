import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import LogInPage from './pages/LogInPage';
import RegisterPage from './pages/RegisterPage';


function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<ChatPage />} />
          <Route path="/user/loginpage" element={<LogInPage />} />
          <Route path="/user/registerpage" element={<RegisterPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
