import { ApolloProvider } from '@apollo/client';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from "react-router-dom";
import App from './App';
import backendClient from './backend/apollo';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <React.StrictMode>
            <HashRouter>
                <ApolloProvider client={backendClient} >
                        <App />
                </ApolloProvider>
            </HashRouter>
  </React.StrictMode>
);

