import  React ,{Component, Fragment} from 'react';
import {Axios_post,Axios_get} from '../../api/server';
import UploadMovie from './UploadMovie';
import UploadVideo from './UploadVideo';
import { Form, Button, Input,Radio,message as Message,PageHeader,DatePicker,Select} from 'antd';

const {Option} =Select;

class AddMovieForm extends Component {

    constructor(props){
        super(props);
        this.state={
            is_Upload:false,
            tags:[]
        };
    }

    componentWillMount(){
        Axios_get('/admin/tags',this,(that,res)=>{
            console.log(res);
            const {message,data,status} = res;
            if(status===200){
                this.setState({
                    tags:data
                })
            }else{
                Message.error(message);
            }
        })
    }

    set_isUpload = (Boolean) =>this.setState({is_Upload:Boolean});

    handleSubmit = (e) => {
        e.preventDefault();
        const callback = (that,res)=>{
            const {message} = res
            if (res.status===200){
                Message.success(message,3);
                this.props.history.push('/admin/resources/movies')
            };
            if(message!=="添加成功"){
                Message.error(message,1);
            };
        };
        this.props.form.validateFields((err, values) => {
            if (!err) {
            const data = {
                ...values,
                'release_time':values['release_time'].format('YYYY-MM-DD HH:mm:ss'),
                'area':values['area'].join("/")
            }
            console.log(data);
            Axios_post('/admin/add/movie',data,this,callback);
            };
        });
    };

    render() {
        const { getFieldDecorator  } = this.props.form;
        const {tags} = this.state;
        return (
        <Fragment>
            <PageHeader onBack={() =>this.props.history.push('/admin/resources/movies')} title="NewMovie" subTitle="新建电影" >
            <Form onSubmit={this.handleSubmit} style={{marginLeft:'auto',marginRight:'auto',width:480,border:'1px'}}>
                <Form.Item label="片名">
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input movie title!' }],
                })(
                    <Input  placeholder="Title" />
                )}
                </Form.Item>
                <Form.Item label="简介">
                {getFieldDecorator('info', {
                    rules: [{ required: true, message: 'Please input movie info' }],
                })(
                    <Input.TextArea placeholder="Info" />
                )}
                </Form.Item>
                <Form.Item label="上映时间">
                {getFieldDecorator('release_time', {
                    rules: [{ required: true, message: 'Please input movie release_time!' }],
                })(
                    <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                )}
                </Form.Item>
                <Form.Item label="上映地区">
                {getFieldDecorator('area', {
                    rules: [{ required: true, message: 'Please input movie area!' }],
                })(
                    <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="选择一个地区"
                            optionLabelProp="label"
                        >
                            <Option value="中国" label="China">
                            <span role="img" aria-label="China">
                                🇨🇳{' '}
                            </span>
                                China (中国)
                            </Option>
                            <Option value="美国" label="USA">
                            <span role="img" aria-label="USA">
                                🇺🇸{' '}
                            </span>
                            USA (美国)
                            </Option>
                        </Select>
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('movie_length', {
                    rules: [{ 
                        required: true, 
                        message: 'Please input movie area!' }],
                })(
                    <Input hidden  placeholder="movie_length" />
                )}
                </Form.Item>
                <Form.Item label="标签">
                {getFieldDecorator('tag', {
                    rules: [{ required: true, message: 'Please input movie tag!' }],
                })(
                    <Radio.Group  
                    buttonStyle="solid" >
                    {
                        tags.map(tag=>{
                            return <Radio.Button value={tag.tag_name} key={tag.tag_name}>{tag.tag_name}</Radio.Button>
                        })
                    } 
                    </Radio.Group>
                )}
                </Form.Item>
                <Form.Item label="上传封面图">
                    {getFieldDecorator('cover_img', {
                        rules: [{ 
                            required: true, 
                            message: 'Please input movie cover_img!' }],
                    })(
                        <UploadMovie {...this.props}/>
                    )}
                </Form.Item>
                <Form.Item label="上传电影资料">
                    {getFieldDecorator('movie', {
                        rules: [{ 
                            required: true, 
                            message: 'Please input movie movie!' }],
                    })(
                        <UploadVideo {...this.props}/>
                    )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className='login-form-button'>
                    添加
                </Button>
                </Form.Item>
            </Form>
            </PageHeader>
        </Fragment>
        );
    }
    }
const AddMovie = Form.create({name: 'add_movie'})(AddMovieForm);

export default AddMovie;
