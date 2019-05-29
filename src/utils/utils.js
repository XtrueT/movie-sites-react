
const isLogin = ()=>{
    let auth_token = window.sessionStorage.access_token;
    if(auth_token){
        return true;
    }else{
        return false;
    }
};

const isLogout = ()=>{
    window.sessionStorage.removeItem('access_token');
    // props.history.push('/');
    window.location.href='/';
    return;
}

export {isLogin,isLogout};