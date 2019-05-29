import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import UserLayout from './views/UserLayout';

const App = () =>(
  <BrowserRouter>
    <UserLayout/>
</BrowserRouter>
)
export default App;