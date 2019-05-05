import {actionSwitcher} from '../helpers/CRUDActionReducer'

export default function produkReducer(state={
    records:[],
    record:{},
    affectedRecord:null,
    successSave:false,
    afterRequestDelete:false
},action){
    return actionSwitcher('PRODUK',state,action)
}

