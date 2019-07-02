import React, { Component } from 'react';
import {Link} from 'react-router-dom';
class Error extends Component {

    render() {
        // console.log(this.props);
        return (
            <div className='back404'>
                <Link to={this.props.location.pathname==='/error'?'/':'/admin'} style={{display:'block',fontSize:20}}>返回首页</Link>
            </div>
        )
    }
}
export default Error;