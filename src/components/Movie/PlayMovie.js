import React,{useState, Fragment} from 'react';
import PlayerContainer from 'griffith';

import {useDataApi} from '../../api/data_api';
import {formatSeconds} from '../../utils/utils';

import {Spin,BackTop,Row,Col,Card,Icon,Typography} from 'antd'; 
import AddComment from '../Comment/AddComment';

const { Paragraph } = Typography;
function PlayMovie(props){
    // console.log(props)
    const [movie_url] = useState(props.match.url);
    const [state] = useDataApi(
        movie_url,
        {
            message:'',
            status:'',
            data:{
            }
        },
        'get'
    )
    const {data,isError,isLoading} = state;
    const {url,cover_img,title,info,play_number,comment_number,movie_length,area,release_time,tag_id} = data.data;
    
    if(isError){
        return (<div>Something error</div>);
    }
    const duration = 182
    const sources = {
    hd: {
        bitrate: 2005,
        size: 46723282,
        duration,
        format: 'mp4',
        width: 1280,
        height: 720,
        play_url: url||'',
    },
    sd: {
        bitrate: 900.49,
        size: 20633151,
        duration,
        format: 'mp4',
        width: 320,
        height: 240,
        play_url: url||'',
    },
    }

    const play_props = {
        id: 'play',
        standalone: true,
        title: title,
        cover: cover_img||'',
        duration,
        sources,
        // autoplay: true,
        shouldObserveResize: true,
        src: url,
    };

    return (
        isLoading?
        <Spin className='login-form'/>:
        (
            <Fragment>
                <PlayerContainer {...play_props}/>
                <div style={{ background: '#ECECEC', padding: '30px',textAlign:'left' }}>
                    <Card 
                        title={`《${title}》`}
                        bordered={false}
                        extra={[
                            <span key='plays' style={{marginLeft:30,marginRight:30}}><Icon type="play-square" />播放次数：{play_number||0}</span>,
                            <span key='comments' style={{marginLeft:30,marginRight:30}}><Icon type="message" />评论次数：{comment_number||0}</span>]}
                    >
                        <Card.Meta
                            description={
                        <Row gutter={16}>
                            <Col span={6}>
                                <img alt={title} src={cover_img} width='200' hight='150'/>
                            </Col>
                            <Col span={18}>
                                <p>类型：{tag_id}</p>
                                <p>上映日期：{release_time}</p>
                                <p>上映地区：{area}</p>
                                <p>片长：{formatSeconds(movie_length)}</p>
                                <Paragraph ellipsis={{ rows: 1, expandable: true }} >简介：{info}</Paragraph>
                            </Col>
                        </Row>
                            }
                        />
                    </Card>
                    <hr/>
                    <AddComment {...props}/>
                </div>
                <BackTop>
                    <span className="ant-back-top-inner"><img alt='To top' width='40' hight='40' src='http://localhost:5555/_uploads/photos/image_wk2N24jFcb3zewgEm6fGxgyEiulVCAC9.jpg'/></span>
                </BackTop>    
        </Fragment>
        )
    )
}
export default PlayMovie;