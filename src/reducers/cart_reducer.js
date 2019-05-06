import {CART_ADD_PRODUK,CART_REMOVE_PRODUK} from '../actions/cart_action'

export default function cartReducer(state={
    produks:{},
    jumlahProduk:0,
    totalHarga:0
},action){
    if(action.type===CART_ADD_PRODUK){
        let id = action.produk._id
        let jml = 0
        if(state.produks.hasOwnProperty(id)){
            jml = state.produks[id].jumlah;
            jml = jml +1;
        }else{
            jml = 1
        }

        return {
            ...state,
            produks:{
                ...state.produks,
                [id]:{
                    jumlah:jml,
                    nama:action.produk.nama,
                    harga:action.produk.harga,
                    deskripsi:action.produk.deskripsi
                }
            },
            jumlahProduk:state.jumlahProduk+1,
            totalHarga:state.totalHarga+action.produk.harga
        }
        
    }

    if(action.type===CART_REMOVE_PRODUK){
       
        let id = action.produkId
       
        if(state.produks.hasOwnProperty(id)){
           // console.log(id);
           let produkJumlah = state.produks[id].jumlah;
           let produkTotal = state.produks[id].harga*produkJumlah;
            const {[id]:deleted,...rest} = state.produks;
           
            return {
                ...state,
                produks:rest,
                jumlahProduk:state.jumlahProduk-1,
                totalHarga:state.totalHarga-produkTotal
            }
        }

        
    }

    return state
}

