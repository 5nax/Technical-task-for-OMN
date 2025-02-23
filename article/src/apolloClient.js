// src/apolloClient.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost/Technical%20Task/Technical-task-for-OMN/index.php?graphql', 
  cache: new InMemoryCache(),
});

export default client;
