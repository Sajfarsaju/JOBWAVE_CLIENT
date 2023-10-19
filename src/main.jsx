import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';
import { store , persistor } from './store/store';
import { UserAuthContextProvider } from './context/UserAuthContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
<UserAuthContextProvider>
  <React.StrictMode>
  <PersistGate loading={null} persistor={persistor}>
    <App />
    </PersistGate>
  </React.StrictMode>
  </UserAuthContextProvider>
  </Provider>
)
