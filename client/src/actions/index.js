import axios from 'axios'; 
import {browserHistory} from 'react-router';
import {AUTH_USER,AUTH_ERROR,UNAUTH_USER} from './types';

const ROOT_URL='http://localhost:4000';

export function signin({email,password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signin`,{email,password})
            .then(response=>{
                dispatch({type:AUTH_USER});
                localStorage.setItem('token',response.data.token);
                browserHistory.push('/feature');
            })
            .catch(()=>{
                dispatch(autherror('Bad Login Info'));
            });
    };
};

export function signupUser({email,password}){
    return function(dispatch){
        axios.post(`${ROOT_URL}/signup`,{email,password})
            .then(response=>{
                dispatch({type:AUTH_USER});
                localStorage.setItem('token',response.data.token);
                browserHistory.push('/feature');
            })
            .catch((response)=>{
                dispatch(autherror(' Email in use'));
            });
    };
};

export function autherror(error){
    return{
        type: AUTH_ERROR,
        payload: error
    };
};

export function signoutUser(){
    
    localStorage.removeItem('token');

    return{
        type: UNAUTH_USER
    };
};

export function fetchMessage(){
    return function(dispatch){
        axios.get(ROOT_URL,{
            headers: {
                authoriation:localStorage.getItem('token')
            }
        }).then(response=>{
            console.log(response);
        })
    };
};