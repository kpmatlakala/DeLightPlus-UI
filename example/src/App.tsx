import React from 'react';
import logo from './logo.svg';
import './App.css';

import { Button, PlusIcon } from 'delightplus-ui';

function App() {
  return (
    <div className="App">
      <Button onClick={() => alert("Clicked!")}>Hello from DeLightPlusUI</Button>
      <PlusIcon />
    </div>
  );
}

export default App;
