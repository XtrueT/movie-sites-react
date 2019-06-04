import jwt_decode from 'jwt-decode'

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
        // console.log(data);
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
        key: '/admin/movies/lists',
        name: '资源管理',
        icon:'bars',
        NavLinkTo: '/admin/movies/lists',
        subMenu: [
        {
            key: 'movies/lists',
            name: '电影管理',
            NavLinkTo: '/admin/movies/lists',
        },
        {
            key: 'movies/trailers',
            name: '预告管理',
            NavLinkTo: '/admin/movies/trailers',
        },
        {
            key: 'movies/tags',
            name: '标签管理',
            NavLinkTo: '/admin/movies/tags',
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
            key: 'users/tags',
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
            NavLinkTo: '/admin/logs/user_logs',
        },
        {
            key: 'logs/admin_logs',
            name: '管理员日志管理',
            NavLinkTo: '/admin/logs/admin_logs',
        },
        {
            key: 'logs/op_logs',
            name: '管理员操作日志管理',
            NavLinkTo: '/admin/logs/op_logs',
        },
        ]
    },
    ],
    }
    
    return menus;
}

export {isLogin,color16,navMenus};