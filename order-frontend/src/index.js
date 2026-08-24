import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import keycloak from './keycloak';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Render loading indicator while Keycloak initializes
root.render(
  <div style={{ textAlign: 'center', marginTop: '50px', fontFamily: 'sans-serif' }}>
    <h3>Connecting to Keycloak...</h3>
  </div>
);

keycloak
  .init({ onLoad: 'login-required', checkLoginIframe: false })
  .then((authenticated) => {
    if (authenticated) {
      root.render(
        <React.StrictMode>
          <App />
        </React.StrictMode>
      );
    } else {
      window.location.reload();
    }
  })
  .catch((err) => {
    root.render(
      <div style={{ textAlign: 'center', marginTop: '50px', color: 'red', fontFamily: 'sans-serif' }}>
        <h3>Keycloak Authentication Failed</h3>
        <p>Ensure Keycloak is running at http://localhost:8181 and react-client is configured.</p>
      </div>
    );
  });