import axios from 'axios'
import {API_URL} from '../config/Config'

export const CHECKOUT_RECEIVE_ORDER = 'CHECKOUT_SUBMIT_RECEIVE'
export const CHECKOUT_FETCH_SUBMIT_ORDER = 'CHECKOUT_FETCH_SUBMIT_ORDER'
export const CHECKOUT_ERROR_RECEIVE = 'CHECKOUT_ERROR_RECEIVE'

function actionReceivceOrder(json){
    return {
        type:CHECKOUT_RECEIVE_ORDER,
        data:json
    }
}

function actionFetchSubmitOrder(){
    return {
        type:CHECKOUT_FETCH_SUBMIT_ORDER
    }
}

function actionErrorReceive(response){
    return {
        type:CHECKOUT_ERROR_RECEIVE,
        response
    }
}

export function submitOrder(purchase) {

    // axios.defaults.headers.common = {'Authorization': `Bearer ${token}`}

   
 
    return dispatch => {
        dispatch(actionFetchSubmitOrder())

        return axios.post(`${API_URL}/api/v2/purchases/save-with-embedded`,purchase)
        .then(response => response.data)
        .then((json) =>dispatch(actionReceivceOrder(json)))
        .catch( (error) => dispatch(actionErrorReceive(error.response)) )
    }
    
}