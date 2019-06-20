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
                                case 'put':
                                {
                                    result = await Axios_server.put(url,state.data);
                                    break;
                                }
                                case 'patch':
                                {
                                    result = await Axios_server.patch(url,state.data);
                                    break;
                                }
                                case 'get':
                                {
                                    result = await Axios_server.get(url);
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
    },[url,method]);

    const doFetch_url = (url) =>{
        set_url(url);
    };
    // console.log(state);
    return [state, doFetch_url];
};
export {useDataApi};