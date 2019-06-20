import React from 'react';
import {Link} from 'react-router-dom';

import {Axios_post} from '../../api/server';
import { isLogin } from '../../utils/utils';

import Face from '../User/Face';
import AllComments from './AllComments';

import { Comment,  Form, Button,message as Message, Input ,PageHeader,List,Icon,Avatar} from 'antd';




const { TextArea } = Input;

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }}/>
        {text}
    </span>
);

const CommentList = ({list}) =>(
<List
itemLayout="horizontal"
dataSource={list}
renderItem={item => (
    <li className='comment-list'>
    <Comment
        actions={[
            <IconText type="star-o" text={item.comment_number||0} />,
            <IconText type="play-square" text={item.play_number||0} />,
        ]}
        key={item.id}
        author={item.name}
        avatar={<Avatar src={item.user_img}/>}
        content={<span><Link to={`/movies/${item.about_movie_id}`}>@{item.about_movie}</Link>
        <p>{item.content}</p></span>}
        datetime={<span>{item.add_time||0}</span>}
        />
    </li>
)}
/>)


const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <div style={{marginLeft:20,width:480}}>
        <Form.Item>
            <TextArea autosize onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
            添加评论
        </Button>
        </Form.Item>
    </div>
    );

class AddComment extends React.Component {
    state = {
        submitting: false,
        value: '',
        list:[],
        isLogged:isLogin().isLogged,
        url:`/${this.props.match.params.id}/comments`,
    };
    handleSubmit = () => {
        if (!this.state.value) {
        return;
        }

        this.setState({
        submitting: true,
        });
        
        setTimeout(() => {
        const data ={content:this.state.value}
        Axios_post(`/add/movie/${this.props.match.params.id}/comments`,data,this,(that,rs)=>{
            
            const {message} = rs;
            const {data} = rs;
            Message.success(message);
            this.setState({
                isAdd:true,
                submitting: false,
                value: '',
                list:[...data,...this.state.list],
            });
        })},1000);
    }

    handleChange = e => {
        this.setState({
        value: e.target.value,
        });
    };

    render() {
        const { submitting, value,isLogged,url,list} = this.state;
        // console.log(list);
        return (
        isLogged ?(
            <PageHeader title='最新评论'>
            <Comment
                avatar={<Face/>}
                content={
                    <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                    />
                }
            />
            {list.length > 0 && <CommentList list={list} />}
            <AllComments url={url}/>
        </PageHeader>
        )
        :(
            <PageHeader title={<Link to='/login'>登录后评论</Link> }></PageHeader>
        )
        );
    }
}
export default AddComment;
