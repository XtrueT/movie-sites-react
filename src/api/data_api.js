import { useState,useEffect,useReducer} from 'react';
import {Axios_server} from './serverConfig';

const useDataApi = (initialUrl,initialData,initialMethod) =>{

    const [url,set_url] = useState(initialUrl);
    const [method] = useState(initialMethod);

    const dataFetchReducer = (state,action)=>{
        switch(action.type){
            case 'INIT':{
                return {
                    ...state,
                    isLoading:true,
                    isError:false
                };
            }
            case 'SUCCESS':{
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    data:action.payload,
                };
            }
            case 'ERROR':{
                return {
                    ...state,
                    message:action.payload,
                    data:{data:action.payload},
                    isLoading:false,
                    isError:true,
                };
            }
            default:
                throw new Error();
        }
    };

    const [state,dispatch] = useReducer(dataFetchReducer,{
        isLoading:false,
        isError:false,
        data:initialData,
    });

    

    useEffect(()=>{
        let didCancel = false;
        const fetch_data = async ()=>{
            dispatch({type:'INIT'})
                try {
                        let result;
                        switch (method){
                            case 'post':
                                {
                                    result = await Axios_server.post(url,state.data);
                                    break;
                                }
                                case 'get':
                                {
                                    result = await Axios_server.get(url);
                                    // console.log(result);
                                    if(result==='Unauthorized Access'){
                                        return dispatch({type:'ERROR',payload:result});
                                    }
                                    break;
                                }
                                case 'delete':
                                {
                                    result = await Axios_server.delete(url,state.data);
                                    break;
                                }
                                default:{
                                    alert("method error");
                                    break;
                                }
                        };
                        if(!didCancel){
                            dispatch({type:'SUCCESS',payload:result});
                        }
                } 
                catch (error) {
                    if(!didCancel){
                        dispatch({type:'ERROR'});
                    }
                }
        };
        fetch_data();
        return () => {
            didCancel = true;
        };
    },
    // eslint-disable-next-line 
    [url,method] 
    );

    const doFetch_url = (url) =>{
        set_url(url);
    };
    // console.log(state);
    return [state, doFetch_url];
};
export {useDataApi};