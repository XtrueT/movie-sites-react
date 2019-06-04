import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Error extends Component {

    render() {
        // console.log(this.props);
        return (
            <div>
                <img alt="Notfound" src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/crop%3D0%2C23%2C500%2C330%3Bc0%3Dbaike80%2C5%2C5%2C80%2C26/sign=17066fd43b12b31bd3239769bb281a48/a8ec8a13632762d09388572ca2ec08fa503dc6eb.jpg"/>
                <Link to={window.sessionStorage.getItem("admin_name")?'/admin':'/'}style={{display:'block',fontSize:20}}>返回首页</Link>
            </div>
        )
    }
}
export default Error;