import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {APPwithRouter} from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';

const client = new ApolloClient ({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
     <APPwithRouter />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);


