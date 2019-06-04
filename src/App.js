import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import UserLayout from './views/UserLayout';
import AdminLayout from './views/AdminLayout';

import {isLogin} from './utils/utils';

const {role} = isLogin();

const App = () =>(
  <BrowserRouter>
  {role === "admin"?<AdminLayout/>:<UserLayout/>}
  </BrowserRouter>
)
export default App;