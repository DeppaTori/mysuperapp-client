
export const CART_ADD_PRODUK = 'CART_ADD_PRODUK'
export const CART_REMOVE_PRODUK = 'CART_REMOVE_PRODUK'

export function addProdukToCart(produk){
    return {
        type:CART_ADD_PRODUK,
        produk
    }
}

export function removeProdukFromCart(produkId){
    return {
        type:CART_REMOVE_PRODUK,
        produkId
    }
}


// export function addProdukToCart(produk){
//     return dispatch=>{
//         return dispatch(addProdukRecieve(produk))
//     }
// }