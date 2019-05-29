import { Axios_server } from "./serverConfig";

function Axios_post(url,data,that,callback){
    Axios_server.post(
        url,
        data
    ).then(
        (result) =>{
            callback(that,result);//传入this，返回这里的result
        },
    )
    .catch(
        err =>{
            callback(that,err);
            // console.log(err);
        }
    )
}
function Axios_put(url,data,that,callback){
    Axios_server.put(
        url,
        data
    ).then(
        (result) =>{
            callback(that,result);//传入this，返回这里的result
        },
    )
    .catch(
        err =>{
            alert('err');
            console.log(err);
        }
    )
}
function Axios_delete(url,data,that,callback){
    Axios_server.delete(
        url,
        data
    ).then(
        (result) =>{
            callback(that,result);//传入this，返回这里的result
        },
    )
    .catch(
        err =>{
            callback(that,err);
        }
    )
}
function Axios_patch(url,data,that,callback){
    Axios_server.patch(
        url,
        data
    ).then(
        (result) =>{
            callback(that,result);//传入this，返回这里的result
        },
    )
    .catch(
        err =>{
            alert('err');
            console.log(err);
        }
    )
}
function Axios_get(url,that,callback){
    Axios_server.get(
        url
    ).then(
        (result) =>{
            callback(that,result);//传入this，返回这里的result
        },
    )
    .catch(
        err =>{
            callback(that,err);
            // console.log(err);
        }
    )
}

//并发
// axios.all([Axios_get()],)
export {Axios_get,Axios_post,Axios_delete,Axios_patch,Axios_put};