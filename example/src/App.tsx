import logo from './logo.svg';
import { Button, HomeIcon } from 'delightplus-ui';

import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />        
      <Button><HomeIcon/> HelloWorld!!!</Button>   
    </div>
  );
}

export default App;
