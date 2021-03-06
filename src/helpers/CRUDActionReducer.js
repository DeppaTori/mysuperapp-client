import axios from 'axios'
import {API_URL} from '../config/Config'

export function actionSwitcher(name,state,action){

    if(action.type===`${name}_RECEIVE`){
        return {
            ...state,
            records:action.data,
            fetching:false
        }
    }else if(action.type===`${name}_SAVE_RECEIVE`){
        return {
            ...state,
            affectedRecord:action.data,
            successSave:true
        }
    }else if(action.type===`${name}_SAVE_OFF`){
        return {
            ...state,
            affectedRecord:null,
            successSave:false
        }
    }else if(action.type===`${name}_READONE_RECEIVE`){
        return {
            ...state,
            record:action.data
        }
    }else if(action.type===`${name}_DELETE_RECEIVE`){
        return {
            ...state,
            sucessDelete:true,
            afterRequestDelete:true
        }
    }else if(action.type===`${name}_DELETE_OFF`){
        return {
            ...state,
            sucessDelete:false,
            afterRequestDelete:false
        }
    }
    else if(action.type===`${name}_EDIT_RECEIVE`){
      return {
        ...state,
        affectedRecord:action.data,
        successEdit:true
      }
    }

    else if(action.type===`${name}_EDIT_OFF`){
      return {
        ...state,
        affectedRecord:null,
        successEdit:false
      }
    }
    else if(action.type===`${name}_RESP500_RECEIVE`){
        return {
          ...state,
          receivedResponse500:true,
          fetching:false
        }
    }
    else if(action.type===`${name}_FETCHING`){
        return {
          ...state,
          fetching:true
        }
    }


    return state
   
  
}

function actionReceive(name,json){
    return {
        type:`${name}_RECEIVE`,
        data:json
    }
}

function actionSaveReceive(name,json){
    return {
        type:`${name}_SAVE_RECEIVE`,
        data:json
    }
}

function actionEditReceive(name,json){
  return {
    type:`${name}_EDIT_RECEIVE`,
    data:json
  }
}

function actionOffSave(name){
    return {
        type:`${name}_SAVE_OFF`
    }
}

function actionOffEdit(name){
  return {
    type:`${name}_EDIT_OFF`
  }
}

function actionOffDelete(name){
    return {
        type:`${name}_DELETE_OFF`
    }
}

function actionReadOneReceive(name,json){
    return {
        type:`${name}_READONE_RECEIVE`,
        data:json
    }
}

function actionDeleteReceive(name){
    return {
        type:`${name}_DELETE_RECEIVE`
    }
}

function actionReceiveResp500(name){
    return {
        type:`ERROR_RESPONSE_500_RECEIVE`
    }
}

function actionFetching(name){
    return {
        type:`${name}_FETCHING`
    }
}





export function CRUDOffSave(name){
    return actionOffSave(name)
}

export function CRUDOffEdit(name){
  return actionOffEdit(name)
}

export function CRUDOffDelete(name){
    return actionOffDelete(name)
}

export function CRUDRead(token,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

   
 
    return dispatch => {
        dispatch(actionFetching(name))

        return axios.get(`${API_URL}${pathUrl}`)
        .then(response => response.data)
        .then((json) =>dispatch(actionReceive(name,json)))
        .catch( (error) => dispatch(actionReceiveResp500(name,error.response)) )
    }
    
}

export function CRUDSave(token,params,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    const bodyFormdata = new FormData()
    const keys = Object.keys(params)    
    keys.map((key)=>{
        bodyFormdata.set(key,params[key])
    })
    return dispatch => {
 
       // return axios.post(`${API_URL}${pathUrl}`,params)
       return axios({
        method: 'post',
        url: `${API_URL}${pathUrl}`,
        data: bodyFormdata,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(response => response.data)
        .then((json) =>dispatch(actionSaveReceive(name,json)))
    }
    
}

export function CRUDEdit(token,params,pathUrl,name) {

  axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}


  return dispatch => {

    return axios.post(`${API_URL}${pathUrl}`,params)
      .then(response => response.data)
      .then((json) =>dispatch(actionEditReceive(name,json)))
  }

}


export function CRUDSaveJson(token,params,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
    return dispatch => {
        return axios.post(`${API_URL}${pathUrl}`,params)
        .then(response => response.data)
        .then((json) =>dispatch(actionSaveReceive(name,json))
        )
    }
    
}




export function CRUDReadOne(token,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
    return dispatch => {
 
        return axios.get(`${API_URL}${pathUrl}`)
        .then(response => response.data)
        .then((json) =>{
            dispatch(actionReadOneReceive(name,json))
         
        }
        
        )
    }
    
}

export function CRUDDelete(token,pathUrl,name) {

    axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}
 
    return dispatch => {
 
        return axios.delete(`${API_URL}${pathUrl}`)
        .then(response => response.data)
       // .then((json) =>dispatch(CRUDRead(token,pathUrl,name)) // refresh table
       .then((json) =>dispatch(actionDeleteReceive(name)) // refresh table
        )
    }
    
}
