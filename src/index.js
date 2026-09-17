

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from "./Features/Store";
import ContextProvider from './components/Context';
import { unregister } from './serviceWorker';
import 'aos/dist/aos.css';


// --- CLEAN UP OLD PERSISTED DATA ---
const CLEANUP_KEY = 'cleaned_old_root_v1';
if (!localStorage.getItem(CLEANUP_KEY)) {
  localStorage.removeItem('persist:root'); // Deletes the old session data
  localStorage.setItem(CLEANUP_KEY, 'true'); // Ensures this only runs once per user

  // Force a one-time browser refresh to load the new state cleanly
  window.location.reload();
}
// -----------------------------------



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
    <ContextProvider>
    <App />
    </ContextProvider>
    </PersistGate>
    </Provider>
  </React.StrictMode>
);

// Unregister the service worker (disables offline support)
unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
