import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, {APPwithRouter} from './App';
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux'; 
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from "./reducers"

const initialState = {}; 
const middleware = [thunk]; 

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
 }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
);

const store = createStore (
  rootReducer,
  initialState,
  enhancer
);

const client = new ApolloClient ({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache()
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <Provider store ={store}>
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
     <APPwithRouter />
    </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
  
);


