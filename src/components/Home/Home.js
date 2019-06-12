import React, { Component } from 'react';
import MovieList from '../Movie/MovieList';
import AllComments from '../Comment/AllComments';
import { Carousel,BackTop } from 'antd';

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
                <hr/>
                <MovieList/>
                <hr style={{marginTop:30}}/>
                <p>评论区</p>
                <AllComments/>
                <BackTop>
                <span className="ant-back-top-inner"><img alt='To top' width='40' hight='40' src='http://localhost:5555/_uploads/photos/image_wk2N24jFcb3zewgEm6fGxgyEiulVCAC9.jpg'/></span>
            </BackTop>   
            </div>
        )
    }
}
export default Home;