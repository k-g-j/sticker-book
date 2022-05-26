import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN_USER, ADD_USER } from '../utils/mutations'
import Auth from '../utils/auth'

import woodBg from '../assets/images/woodtexture.jpeg'
import noteBook from '../assets/images/sticker-book-home.png'

const Login = () => {
  // set login from state, and signup form state
  const [loginState, setLoginState] = useState({ email: '', password: '' })
  const [signupState, setSignupState] = useState({
    username: '',
    email: '',
    password: '',
  })

  // set login and signup mutations
  const [login, { loginError }] = useMutation(LOGIN_USER)
  const [addUser, { signupError }] = useMutation(ADD_USER)

  // Update login state when the form changes
  const handleLoginChange = (event) => {
    const { name, value } = event.target

    setLoginState({
      ...loginState,
      [name]: value,
    })
  }

  // Update the signup state when the form changes
  const handleSignupChange = (event) => {
    const { name, value } = event.target

    setSignupState({
      ...signupState,
      [name]: value,
    })
  }

  // Call login mutation when login submitted
  const handleLoginSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({
        variables: { ...loginState },
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }
    // clear form values
    setLoginState({
      email: '',
      password: '',
    })
  }

  // call signup mutation when signup submitted
  const handleSignupSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await addUser({
        variables: { ...signupState },
      })

      Auth.login(data.addUser.token)
    } catch (e) {
      console.error(e)
    }
    // clear form values
    setSignupState({
      username: '',
      email: '',
      password: '',
    })
  }

  // Handles when book is clicked
  function handleClick() {
    console.log('clicked!')
  }

  return (
    <div
    className=" login flex flex-row justify-center items-center w-screen h-screen bg-cover -center m-0"
    style={{
        backgroundImage: `url(${woodBg})`,
    }}
    >
      <img className="notebook-img drop-shadow-xl cursor-pointer" src={noteBook} onClick={handleClick} />
      <section>
        <div className="container text-hand">
          <h2 className="font-brush text-xl">Login:</h2>
          <form className="flex flex-col" onSubmit={handleLoginSubmit}>
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              id="login-email"
              autoComplete="email"
              value={loginState.email}
              onChange={handleLoginChange}
            />
            <input
              className="form-input"
              placeholder="******"
              name="password"
              type="password"
              id="login-password"
              autoComplete="current-password"
              value={loginState.password}
              onChange={handleLoginChange}
            />
            <button className="btn d-block w-100 font-hand text-base hover:bg-blue-600 rounded-xl" type="submit">
              Submit
            </button>
          </form>
          {loginError && <div className="font-hand text-base">Login failed</div>}
        </div>
        <div className="container pt-10">
          <h2 className="font-brush text-xl">Sign Up:</h2>
          <form className="flex flex-col" onSubmit={handleSignupSubmit}>
            <input
              className="form-input"
              placeholder="Your username"
              name="username"
              type="name"
              id="signup-name"
              autoComplete="username"
              value={signupState.username}
              onChange={handleSignupChange}
            />
            <input
              className="form-input"
              placeholder="Your email"
              name="email"
              type="email"
              id="signup-email"
              autoComplete="email"
              value={signupState.email}
              onChange={handleSignupChange}
            />
            <input
              className="form-input"
              placeholder="******"
              name="password"
              type="password"
              id="signup-password"
              autoComplete="current-password"
              value={signupState.password}
              onChange={handleSignupChange}
            />
            <button className="btn d-block w-100 font-hand text-base hover:bg-blue-600 rounded-xl" type="submit">
              Submit
            </button>
          </form>
          {signupError && <div className="font-hand text-base">Sign Up failed</div>}
        </div>
      </section>
    </div>
  )
}

export default Login
