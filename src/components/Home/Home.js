import React, { Component } from 'react';
import MovieList from '../Movie/MovieList';
import { Carousel } from 'antd';

const carousel=(
    <Carousel autoplay >
        <div>
        <h3>1</h3>
        </div>
        <div>
        <h3>2</h3>
        </div>
        <div>
        <h3>3</h3>
        </div>
        <div>
        <h3>4</h3>
        </div>
    </Carousel>
)



class Home extends Component {
    render() {
        return (
            <div>
                {carousel}
                <MovieList/>
            </div>
        )
    }
}
export default Home;