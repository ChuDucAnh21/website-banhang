import { createRoot } from 'react-dom/client'
import './index.css'
import "./style/styles.scss"
import { RouterProvider } from 'react-router-dom'
import {router} from "./router"
import { Provider } from 'react-redux'
import { ToastProvider } from './components/toastMessage/ToastMessage'
import store,{persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <>
  <ToastProvider>
     <Provider store={store}>  
       <PersistGate persistor={persistor} > 
         <RouterProvider router={router}/>
       </PersistGate>
     </Provider>
  </ToastProvider>
  </>,
)
