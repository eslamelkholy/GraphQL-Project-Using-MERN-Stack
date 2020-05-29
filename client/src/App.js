import React from 'react';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';
// Components
import BookList from './components/Book/BookList';
import AddBook from './components/Book/AddBook';

// Apollo Client Setup
const client = new ApolloClient({
  uri:"http://localhost:8000/graphql"
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>Book List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
