
export const ADD_SHIPPING_INFO = 'ADD_SHIPPING_INFO'

export function addShippingInfo(shippingInfo){
    return {
        type:ADD_SHIPPING_INFO,
        shippingInfo
    }
}

