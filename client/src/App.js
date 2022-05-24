import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Goals from './pages/Goals'
import SingleGoal from './pages/SingleGoal'
import Nav from './components/Nav';
const httpLink = createHttpLink({
  uri: '/graphql',
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
    <ApolloProvider client={client}>
      <Router>
        <Nav />
        <Routes>
          <Route exact path="/" element={<Goals/>} />
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/dashboard" element={<Dashboard/>} />
          <Route exact path="/goal" element={<SingleGoal/>} />
        </Routes>
      </Router>
    </ApolloProvider>
    
  );
}

export default App;
