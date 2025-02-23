import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

// Get the container element
const container = document.getElementById('root');
// Create the root using the container
const root = ReactDOM.createRoot(container);

// Render your application; note that we don’t pass the container again
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
