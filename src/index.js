import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: 'https://countries-274616.ew.r.appspot.com/',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          Country(_, { args, toReference }) {
            if (!args.hasOwnProperty('_id')) {
              return _;
            }

            return [
              toReference({
                __typename: 'Country',
                id: args._id
              })
            ]
          }
        }
      }
    }
  })
})

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
