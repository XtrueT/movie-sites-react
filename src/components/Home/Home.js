import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import MovieList from '../Movie/MovieList';
import AllComments from '../Comment/AllComments';
import { Carousel,BackTop,PageHeader,Icon,Typography,Divider} from 'antd';
import { Axios_get } from '../../api/server';

const {Title, Paragraph} = Typography;

class HomeCarousel extends Component{
    state = {list:[]}
    componentDidMount(){
        Axios_get('/movies/hot',this,(that,rs)=>{
            const {data:{list}}=rs;
            this.setState({
                list
            })
        })
    }
    next=()=> {
        this.slider.slick.slickNext();
    }
    prev=()=> {
        this.slider.slick.slickPrev();
    }
    render() {
        const Setting = {
            dots: true,
            lazyLoad: true,
            autoplay:true,
        };
        const {list} = this.state;
        return (
            <div>
                <Carousel {...Setting} ref={el => (this.slider = el)}>
                    {list.length > 0 ? list.map(item=>{
                        const {id,cover_img,title,info} = item;
                        return(
                        <div key={id} className='wrapper'>
                            <img alt={title} src={cover_img}/>
                            <Link to={`/movie/${id}`}>
                                <div className='wrapper1'>
                                    <Title style={{color:'#fff'}}>{title}</Title>
                                    <Paragraph style={{color:'#fff'}} ellipsis>{info}</Paragraph>
                                </div>
                            </Link>
                        </div>
                        )
                    }):null}
                </Carousel>
                <Icon type="left"  style={{top:240,left:20,fontSize:40,color:"#fff",position:"absolute"}} onClick={this.prev}/>
                <Icon type="right" style={{top:240,right:20,fontSize:40,color:"#fff",position:"absolute"}} onClick={this.next}/>
            </div>
        )
    }
}

class Home extends Component {
    render() {
        const paginationSetting ={
            simple:true
        }
        return (
            <div>
                <PageHeader 
                    style={{textAlign:'left'}} 
                    title={<span>推荐区</span>}
                    extra={[
                        <span key={'list'}><a href="#list">最近列表</a></span>,
                        <span key={'comment'}><a href="#comment">评论区</a></span>,
                    ]}
                >
                    <HomeCarousel/>
                </PageHeader>
                <Divider/>
                <PageHeader 
                style={{textAlign:'left'}} 
                title={<span id ='list'>排序列表</span>}
                extra={<Link to='/movies'>查看更多类别</Link>}
                >
                    <MovieList/>
                </PageHeader>
                <Divider/>
                <PageHeader style={{textAlign:'left'}} title={<span id='comment'>评论区</span>}>
                    <AllComments url={`comments`} paginationSetting = {paginationSetting}/>
                </PageHeader>
                <BackTop>
                    <span className="ant-back-top-inner">
                        <img alt='To top' width='40' hight='40' src='http://localhost:5555/_uploads/photos/image_wk2N24jFcb3zewgEm6fGxgyEiulVCAC9.jpg'/>
                    </span>
                </BackTop>   
            </div>
        )
    }
}
export default Home;