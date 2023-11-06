import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ApolloProvider } from '@apollo/client'; // Import ApolloProvider
import { ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloClient


import App from './App.jsx'
import SearchBooks from './pages/SearchBooks'
import SavedBooks from './pages/SavedBooks'

// Create an ApolloClient instance
const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // GraphQL API endpoint
  cache: new InMemoryCache(),
});


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    ),
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: (
          <ApolloProvider client={client}>
            <SearchBooks />
          </ApolloProvider>
        ),
      },
      {
        path: '/saved',
        element: (
          <ApolloProvider client={client}>
            <SavedBooks />
          </ApolloProvider>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);


