import React, {Fragment} from 'react';
import {Route,NavLink} from 'react-router-dom';
// import Comments from './Comments';
import Tags from './Tags';
import MovieList from './MovieList';
import {Menu,Layout} from 'antd';

const {Content,Header}=Layout;

function Movies({match}){
    return(
        <Fragment>
            <Header> 
                <NavLink to={`${match.url}/search`} style={{float:'right'}} activeStyle={{color:'darkmagenta',fontSize:20}}>
                        <span className="Link-text">查看分类</span>
                </NavLink>
            </Header>
            <Content>
                <Route path={`${match.path}/:movieId`} component={Movie}/>
                <Route exact path={match.path} component={Movie}/>
            </Content>
        </Fragment>
    )
}

function Movie({match}){
    const {movieId} = match.params;
    if(movieId==='search'){
        return (
            <Tags {...match}/>
        )
    }
    else{
        return (
            <MovieList/>
        )
    }
}

export default Movies;