import { BrowserRouter } from 'react-router-dom';
import Main from "./components/Main/Main";
import './scss/app.scss';

function App() {
  return (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
  );
}

export default App;
