import React, {Fragment} from 'react';
import {Route,Link} from 'react-router-dom';
// import Comments from './Comments';
import Tags from './Tags';
import MovieList from './MovieList';
import {Menu ,Layout} from 'antd';

const {Content}=Layout;

function Movies({match}){
    const menu = (
        <Menu
            theme={"light"}
            mode="horizontal"
            style={{ lineHeight: '64px' }}
        >
            <Menu.Item key="1">
                <Link to={`${match.url}/tuijian`}>
                    <span className="Link-text">推荐</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">
                <Link to={`${match.url}/yingku`}>
                    <span className="Link-text">影库</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="3">
                <Link to={`${match.url}/search`}>
                        <span className="Link-text">搜索</span>
                </Link>
            </Menu.Item>
        </Menu>
    );
    return(
        <Fragment>
                {menu}
            <Content>
                <Route path={`${match.path}/:movieId`} component={Movie}/>
                <Route exact path={match.path} component={Movie}/>
            </Content>
        </Fragment>
        
    )
}

function Movie({match}){
    const {movieId} = match.params;
    if(movieId==='tuijian'){
        return (
            <MovieList/>
        )
    }
    else if(movieId==='yingku'){
        return (
            <div>
                影库
            </div>
        )
    }
    else if(movieId==='search'){
        return (
            <Tags/>
        )
    }
    else{
        return (
            <div>
                {/* <Comment/> */}
                Movie
            </div>
        )
    }
}

export default Movies;