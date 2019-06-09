import React, { Component } from 'react';
import MovieList from '../Movie/MovieList';
import AllComments from '../Comment/AllComments';
import { Carousel } from 'antd';

const carousel=(
    <Carousel autoplay >
        <div>
        <img alt='绣春刀' width='100%' src='http://localhost:5555/_uploads/photos/image_uLVFxG8YSIXdMVOO93PwIW9rZx57tveQ.jpg'/>
        </div>
        <div>
        <img alt='英雄' width='100%' src='http://localhost:5555/_uploads/photos/image_K236OjkrQphft4TrFjcxy7qn0L56m95z.jpg'/>
        </div>
        <div>
        <img alt='影' width='100%' src='http://localhost:5555/_uploads/photos/image_Arn99DpcWDTe1KCfB7Cu8rlzPYd9ZHIi.jpg'/>
        </div>
    </Carousel>
)



class Home extends Component {
    render() {
        return (
            <div>
                {carousel}
                <MovieList/>
                <AllComments/>
            </div>
        )
    }
}
export default Home;