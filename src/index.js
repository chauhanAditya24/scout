import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import configureStore from './store/configureStore'
import { ChakraProvider } from '@chakra-ui/react'

const store = configureStore()
// console.log(store)

console.log('state' , store.getState())

store.subscribe( () => {
  // console.log('updated state' , store.getState())
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <ChakraProvider>
      <App style={{backgroundColor: 'grey'}}/>
      </ChakraProvider>
    </BrowserRouter>
  </Provider>
)