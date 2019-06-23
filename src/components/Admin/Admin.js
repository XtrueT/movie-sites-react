import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import AuthRouter from '../Auth/AuthRouter';
import Logs from './Logs';
import AddMovie from './AddMovie';
import Resources from './Resources';
import Error from '../Home/Error';
import AdminHome from './AdminHome';

const Admin = ()=>{
    return (
        <Switch>
        <Route path="/admin" exact component={AdminHome}/>
        <AuthRouter path="/admin/resources/:action" exact component ={Resources}/>
        <AuthRouter path='/admin/resources/movies/add' extra component={AddMovie}/>
        <AuthRouter path="/admin/:role/logs" exact component ={Logs}/>
        {/* 登录权限控制组件 */}
        <AuthRouter path="/admin/users/:action" exact component ={()=>(<div>adminUser</div>)}/>
        <AuthRouter path="/admin/change_password" exact component={()=>(<div>change_password</div>)}/>
        <Route path="/admin/error" component={Error} />
        <Route path="*" render={() => <Redirect to="/admin/error"/> }/>
        </Switch>
    )
}

export default Admin;