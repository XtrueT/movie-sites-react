import jwt_decode from 'jwt-decode'

import {message as Message} from 'antd';

function check_isImage(file) {
    let isImage = false;
    const file_type = ['image/jpeg','image/png'];
    if(file.type){
        if (file_type.includes(file.type) ){
            isImage = true;
        };
    };
    if (!isImage) {
        Message.error('只能上传图片');
    };
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        Message.error('图片最大为 5MB!');
    };
    return isImage && isLt5M ;
}

function check_isVideo(file) {
    let isVideo = false;
    let isError = false;
    const file_type = ['video/mp4'];
    if(file.type){
        if (file_type.includes(file.type) ){
            isVideo = true;
        };
    };
    if (!isVideo) {
        Message.error('只能上传视频文件');
    };
    const isLt50000M = file.size / 1024 / 1024 < 50000;
    if (!isLt50000M) {
        Message.error(`文件最大为${50000}`);
    };
    const Callback = (bool) => (isError=bool);
    try {
        if(isVideo){
            const url = URL.createObjectURL(file);
            console.log(url.valueOf);
            const audioElement = new Audio(url);
            audioElement.addEventListener("loadedmetadata", function (_event) {
                
            });
        }
        Callback(false);
    } catch (error) {
        isError=true;
    }
    console.log(isError);
    if(isError&&isVideo){
        Message.error(`非法文件`);
    }
    return isVideo && isLt50000M && !isError ;
}

function formatSeconds(value) {
    var secondTime = parseInt(value);// 秒
    var minuteTime = 0;// 分
    var hourTime = 0;// 小时
    if(secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        // console.log(minuteTime)
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if(minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    if(minuteTime > 0 && !hourTime) {
        return `${minuteTime}分${secondTime}`;
    }
    if(hourTime > 0) {
        return `${hourTime}小时${minuteTime}分${secondTime}`;
    }
    return `${secondTime}秒`;
}

//十六进制颜色随机
function color16(){
    var r = Math.floor(Math.random()*256);
    var g = Math.floor(Math.random()*256);
    var b = Math.floor(Math.random()*256);
    var color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    // console.log(color);
    if(color!==('#ffffff' && '#000000')){
        return color;
    }
}


const isLogin = ()=>{
    let auth_token = window.sessionStorage.access_token;
    if(auth_token){
        const data = jwt_decode(auth_token);
        console.log(data);
        const {role,name} = data;
        if(name){
            sessionStorage.setItem('admin_name',name);
        }
        if(role){
            return {'isLogged':true,'role':role};
        }else{
            return {'isLogged':false,'role':role};
        }
    }
    else{
        return {'isLogged':false,'role':'user'};
    }
};

const navMenus = ()=>{
    const menus={
    admin_menus:[
    {
        key: '/',
        name: '首页',
        icon:'home',
        NavLinkTo: '/admin',
        subMenu:null,
    },
    {
        key: '/admin/resources/lists',
        name: '资源管理',
        icon:'bars',
        NavLinkTo: '/admin/resources/lists',
        subMenu: [
        {
            key: 'resources/lists',
            name: '电影管理',
            NavLinkTo: '/admin/resources/movies',
        },
        {
            key: 'resources/trailers',
            name: '预告管理',
            NavLinkTo: '/admin/resources/trailers',
        },
        {
            key: 'resources/tags',
            name: '标签管理',
            NavLinkTo: '/admin/resources/tags',
        },
        ]
    },
    {
        key: '/admin/users/lists',
        name: '人员管理',
        icon:'idcard',
        NavLinkTo: '/admin/users/lists',
        subMenu: [
        {
            key: 'users/lists',
            name: '用户管理',
            NavLinkTo: '/admin/users/users',
        },
        {
            key: 'users/admins',
            name: '管理员管理',
            NavLinkTo: '/admin/users/admins',
        },
        {
            key: 'users/roles',
            name: '角色管理',
            NavLinkTo: '/admin/users/roles',
        },
        ]
    },
    {
        key: '/admin/logs/lists',
        name: '日志管理',
        icon: 'exception',
        NavLinkTo: '/admin/logs/lists',
        subMenu: [
        {
            key: 'logs/user_logs',
            name: '用户日志管理',
            NavLinkTo: '/admin/user/logs',
        },
        {
            key: 'logs/admin_logs',
            name: '管理员日志管理',
            NavLinkTo: '/admin/admin/logs',
        },
        {
            key: 'logs/op_logs',
            name: '管理员操作日志管理',
            NavLinkTo: '/admin/op/logs',
        },
        ]
    },
    ],

    user_menus:[
        {
            key: '/',
            name: 'Home',
            icon:'home',
            NavLinkTo: '/',
            subMenu:null,
        },
        {
            key: '/movies',
            name: 'Movies',
            icon:'bars',
            NavLinkTo: '/movies',
            subMenu: null,
        },
    ],
    
    isLogged:[
        {
            key: '/profile',
            name: 'Profile',
            icon:'idcard',
            NavLinkTo: '/profile',
            subMenu: null
        },
        {
            key: '/about/you',
            name: 'AboutYou',
            icon:'bars',
            NavLinkTo: '/about/comments',
            subMenu: [
            {
                key: 'about/comments',
                name: 'MyComments',
                NavLinkTo: '/about/comments',
            },
            {
                key: '/about/favorites',
                name: 'MyFavorite',
                NavLinkTo: '/about/favorites',
            },
            {
                key: '/about/history',
                name: 'MyHistory',
                NavLinkTo: '/about/history',
            },
            ]
        },
    ],
    
    notLogged:[
        {
            key: '/Login',
            name: 'Login',
            icon: 'exception',
            NavLinkTo: '/login',
            subMenu:[
                {
                    key: 'Register',
                    name: 'Register',
                    NavLinkTo: '/register',
                },
                {
                    key: 'admin/login',
                    name: 'AdminLogin',
                    NavLinkTo: '/admin/login',
                },
                {
                    key: 'admin/register',
                    name: 'AdminRegister',
                    NavLinkTo: '/admin/register',
                },
            ]
        },
    ]
    }
    return menus;
}

const set_pagination = ()=>{

    const pagination={
        pageSize:10,
        pageSizeOptions:['15','20'],
        hideOnSinglePage:true,
        showSizeChanger:true,
    }

    return pagination;
}

export {isLogin,color16,navMenus,set_pagination,check_isImage,check_isVideo,formatSeconds};