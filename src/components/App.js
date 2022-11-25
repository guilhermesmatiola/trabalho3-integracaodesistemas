import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Disciplinas from './Disciplinas';


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element= {<Disciplinas />}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
