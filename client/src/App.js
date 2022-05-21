import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
<<<<<<< HEAD
import Nav from './components/Nav';
import SingleGoal from './pages/SingleGoal';

=======
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
>>>>>>> develop

const httpLink = createHttpLink({
  uri: '/',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const styles = {
  flex: `flex justify-center flex items-center justify-center min-h-screen from-purple-100 via-red-300 to-indigo-500 bg-gradient-to-br`
}

function App() {
  return (
<<<<<<< HEAD
     <>
             <SingleGoal />
     </>
  )
};

=======
    
    // <Home />
    <Dashboard />

    
  );
}
>>>>>>> develop

export default App;
