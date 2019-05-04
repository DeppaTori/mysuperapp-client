import 'babel-polyfill'

import React from 'react'
import { render } from 'react-dom'
// import Root from './containers/Root'
import RootWithRouter from './containers/RootWithRouter'

render(<RootWithRouter />, document.getElementById('root'))