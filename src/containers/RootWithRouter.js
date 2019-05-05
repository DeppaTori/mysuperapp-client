import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../configureStore'
import SuperApp from './SuperApp'
import {BrowserRouter as Router,Route} from 'react-router-dom'
import HomePage from './home/HomePage'
import DetailPage from './home/DetailPage'
import KeranjangPage from './home/KeranjangPage'
import CheckoutPage from './home/CheckoutPage'

const store = configureStore()

export default class RootWithRouter extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
            <Route path="/" exact component={HomePage} />
            <Route path="/produk/:id" component={DetailPage} />
            <Route path="/simpledata" component={SuperApp} />
            <Route path="/keranjang"  component={KeranjangPage} />
            <Route path="/checkout"  component={CheckoutPage} />
        </Router>
       
      </Provider>
    )
  }
}