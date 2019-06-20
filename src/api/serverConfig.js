import axios from 'axios';
import {message as Message} from 'antd';
//创建axios实例
let Axios_server = axios.create({
    timeout:1500 ,//请求超时时间
    baseURL:"http://localhost:5555"
})

//请求拦截
Axios_server.interceptors.request.use(
    config =>{
        //判断登录与token的存在// sessionStorage.setItem('token', data["token"]);
        const auth_token = " Flask " + window.sessionStorage.access_token;
        // config.headers.common['Authorization'] = auth_token;
        config.headers = {
            'Content-Type':'application/json',
            'Authorization': auth_token
        }
        return config;
    },
    error =>{
        if(error.request){
            console.log(error.request.data);
            let {message} = error.request.data;
            // alert(message);
            Message.error(message);
            console.log(message);
            return error.request.data;
        }
        return Promise.reject(error)
    }
)
//响应拦截
Axios_server.interceptors.response.use(
    // 后台响应数据格式
    /*
    (axios).data:
        {
            message:'',
            status:200,401,500,
            //token:''
            data:{
                username:'',
                ...
            }
        }    
    */ 
    response =>{
        let {token} = response.data;
        // console.log(message);
        // console.log(token);
        // console.log(data);
        if (token){
            sessionStorage.setItem('access_token', token);
        }
        return response.data;
    },
    error =>{
        if(error.response){
            // console.log(error.response.data);
            let {message} = error.response.data;
            if(message==='无效token,请重新登录'){
                // alert(message);
                Message.error(message);
                window.sessionStorage.removeItem('access_token');
                if(window.sessionStorage.getItem('admin_name')){
                    window.sessionStorage.removeItem('admin_name');
                    window.location.href='/admin/login';
                }else{
                    window.location.href='/login';
                }
            }
            return error.response.data;
        }
        else{        
            // if (sessionStorage.getItem('access_token')){
            //     window.sessionStorage.removeItem('access_token');
            // }
            // console.log(error.request);
            if(error.request.status===0){
                Message.error("连接超时或没有该资源",3);
                // window.location.pathname='/error';
            }
            return Promise.reject(error.request);
        }
    }
)
//并发axios.all([])
//处理响应回调axios.spread(callback)
export {Axios_server};