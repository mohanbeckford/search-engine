import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient

import Navbar from './components/Navbar';

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // GraphQL API endpoint
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}> {/* Wrap your App with ApolloProvider */}
      <>
        <Navbar />
        <Outlet />
      </>
    </ApolloProvider>
  );
}

export default App;
