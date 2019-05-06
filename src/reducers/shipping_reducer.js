import {actionSwitcher} from '../helpers/CRUDActionReducer'
import {ADD_SHIPPING_INFO} from '../actions/shipping_action'

const stateModel = {
    firstName:'',
    lastName:'',
    address1:'',
    address2:'',
    city:'',
    province:'',
    postalCode:'',
    country:''
}

export default function shippingReducer(state={
    shippingInfos:[],
    shippingInfo:{},
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false,
    fetching:false
},action){
    if(action.type===ADD_SHIPPING_INFO){
        return {
            ...state,
            shippingInfo:action.shippingInfo
        }
    }
    return actionSwitcher('SHIPPING',state,action)
}

