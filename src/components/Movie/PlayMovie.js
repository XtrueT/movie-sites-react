import React,{useState, Fragment} from 'react';
import PlayerContainer from 'griffith';

import {useDataApi} from '../../api/data_api';
import {formatSeconds} from '../../utils/utils';

import {Spin,message as Message,BackTop,Row,Col,Card,Icon,Alert,Button} from 'antd'; 


function PlayMovie(props){
    // console.log(props);
    const [movie_url] = useState(props.match.url);
    const [visible,set_visible] =useState(false);
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
    const {message}=data;
    const {url,cover_img,title,info,play_number,comment_number,movie_length,area,release_time,tag_id} = data.data;
    
    if(isError){
        return (Message.error(message));
    }
    const text =(
        <ul style={{textAlign:'left' ,listStyle:'none',marginTop:15,marginBottom:15}}>
            <span>空格键：进度条处于选中状态时，可控制视频的播放/暂停。如果已经选中某个按钮，则可用于点击该按钮</span>
            <li>选中进度条状态下的向左/向右箭头：快进/快退 5 秒钟。</li>
            <li>选中进度条状态下的向上/向下箭头：将音量增大/减小 5%。</li>
            <li>选中进度条状态下的数字 1 到 9（不是数字小键盘上的数字）：跳至视频进度的 10% 到 90%。</li>
            <li>选中进度条状态下的数字 0（不是数字小键盘上的 0）：跳至视频的开头。</li>
            <li>K： 在播放器中暂停/播放视频。</li>
            <li>J：在播放器中快退 10 秒。L：在播放器中快进 10 秒。</li>
            <li>F：启用全屏模式。如果已启用全屏模式，则再次按 F 键或按 Esc 键可退出全屏模式。</li>
            <li>M：切换静音。</li>
        </ul>
    );
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
        // <video src={url} preload="metadata"  width="760" height="500" controls/>
        (
            <Fragment>
                <PlayerContainer {...play_props}/>
                <div style={{ background: '#ECECEC', padding: '30px',textAlign:'left' }}>
                    <Card title={`《${title}》`} 
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
                                <p>简介：{info}</p>
                            </Col>
                        </Row>
                        }
                        />
                    {visible ? (
                    <Alert
                        type='info' 
                        message={text} 
                        closable
                        afterClose={()=>set_visible(false)}
                    />
                    ) : <Button type='link' onClick={()=>set_visible(true)}> 查看播放器快捷说明 </Button>}
                    </Card>
                </div>
            <BackTop>
                <span className="ant-back-top-inner"><img alt='To top' width='40' hight='40' src='http://localhost:5555/_uploads/photos/image_wk2N24jFcb3zewgEm6fGxgyEiulVCAC9.jpg'/></span>
            </BackTop>    
        </Fragment>
        )
    )
}
export default PlayMovie;