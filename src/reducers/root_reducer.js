import produkReducer from './produk_reducer'
import userReducer from './user_reducer'
import cartReducer from './cart_reducer'
import shippingReducer from './shipping_reducer'
import { combineReducers } from 'redux';

const AppReducer = combineReducers({produkReducer,userReducer,cartReducer,shippingReducer});
export default AppReducer

