import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App, { APPwithRouter } from './App';
import { ApolloClient, ApolloProvider, InMemoryCache, from, HttpLink } from '@apollo/client';
import { BrowserRouter } from 'react-router-dom';
import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import rootReducer from './reducers';
import { onError } from '@apollo/client/link/error';
import ErrorBoundary from './Pages/ErrorBoundary';

const initialState = {};
const middleware = [thunk];

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(rootReducer, initialState, enhancer);

const httpLink = new HttpLink({
  uri: 'http://localhost:4000',
});

// Log any GraphQL errors or network error that occurred
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  if (networkError) console.error(`[Network error]: ${JSON.stringify(networkError, null, 2)})`);
});

const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <ErrorBoundary>
            <APPwithRouter />
          </ErrorBoundary>
        </ApolloProvider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);
