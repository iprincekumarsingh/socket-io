import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SocketProvider } from './context/SocketContext'
import RandomCall from './randomCall/RandomCall'

ReactDOM.createRoot(document.getElementById('root')).render(

    <SocketProvider>

    {/* <App /> */}
        <RandomCall />
    </SocketProvider>

)
