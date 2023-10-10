import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ChakraProvider } from '@chakra-ui/react'
import { CustomTheme } from './themes/Themes.js'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={CustomTheme}>
    <App />
    </ChakraProvider>
  </React.StrictMode>,
)
