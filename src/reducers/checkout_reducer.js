import {CHECKOUT_ERROR_RECEIVE,CHECKOUT_FETCH_SUBMIT_ORDER,CHECKOUT_RECEIVE_ORDER} from '../actions/checkout_action'

export default function produkReducer(state={
    purchase:{},
    fetching:false
},action){
    if(action.type===CHECKOUT_FETCH_SUBMIT_ORDER){
        return {
            ...state,
            fetching:true
        }
    }
    if(action.type===CHECKOUT_RECEIVE_ORDER){
        return {
            ...state,
            purchase:action.data,
            fetching:false
        }
    }
    if(action.type===CHECKOUT_ERROR_RECEIVE){
        return {
            ...state,
            fetching:false
        }
    }
    
    return state
}