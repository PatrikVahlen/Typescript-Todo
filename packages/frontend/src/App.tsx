import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';


function App() {

  return (
    <div className="App">
      <header>
        <Routes>
          <Route path="/" element={<ChatPage />} />
        </Routes>
      </header>

    </div>
  );
}

export default App;
