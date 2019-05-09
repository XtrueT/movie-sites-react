import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import BaseLayout from './views/BaseLayout';
import './App.css';

const App = () =>(
  <BrowserRouter>
    <BaseLayout/>
  </BrowserRouter>
)

export default App;