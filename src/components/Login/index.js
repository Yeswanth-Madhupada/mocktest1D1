// import {Component} from 'react'
// import Cookies from 'js-cookie'
// import {Redirect} from 'react-router-dom'

// class Login extends Component {
//   state = {user: 0, pass: 0, showSubmitError: false, errorMsg: ''}

//   userId = event => {
//     this.setState({user: event.target.value})
//   }

//   pin = event => {
//     this.setState({pass: event.target.value})
//   }

//   onSubmitSuccess = jwtToken => {
//     const {history} = this.props

//     Cookies.set('jwt_token', jwtToken, {
//       expires: 30,
//       path: '/',
//     })
//     history.replace('/')
//   }

//   onSubmitFailure = errorMsg => {
//     this.setState({showSubmitError: true, errorMsg})
//   }

//   onSbt = async event => {
//     event.preventDefault()
//     const {user, pass} = this.state
//     const ud = {user_id: user, pin: pass}
//     console.log(ud)
//     const url = 'https://apis.ccbp.in/ebank/login'
//     const options = {
//       method: 'POST',
//       body: JSON.stringify(ud),
//     }
//     const response = await fetch(url, options)
//     const data = await response.json()
//     console.log(data)
//     if (response.ok === true) {
//       this.onSubmitSuccess(data.jwt_token)
//     } else {
//       this.onSubmitFailure(data.error_msg)
//     }
//   }

//   render() {
//     const {showSubmitError, errorMsg} = this.state
//     const jwtToken = Cookies.get('jwt_token')
//     if (jwtToken !== undefined) {
//       return <Redirect to="/" />
//     }
//     return (
//       <div>
//         <div>
//           <img
//             src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
//             alt="website login"
//           />
//         </div>
//         <div>
//           <h1>Welcome Back!</h1>
//           <form onSubmit={this.onSbt}>
//             <label htmlFor="y1">User ID</label>
//             <input type="text" onChange={this.userId} id="y1" />
//             <label htmlFor="y2">PIN</label>
//             <input type="password" onChange={this.pin} id="y2" />
//             <button type="submit">Login</button>
//             {showSubmitError && <p>{errorMsg}</p>}
//           </form>
//         </div>
//       </div>
//     )
//   }
// }
// export default Login

import {Component} from 'react'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    userId: '',
    pin: '',
    se: false,
    em: '',
  }

  one = event => {
    this.setState({
      userId: event.target.value,
    })
  }

  two = event => {
    this.setState({
      pin: event.target.value,
    })
  }

  success = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })

    history.replace('/')
  }

  fail = em => {
    this.setState({
      se: true,
      em,
    })
  }

  BankLogin = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {user_id: userId, pin}
    const url = 'https://apis.ccbp.in/ebank/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.success(data.jwt_token)
    } else {
      this.fail(data.error_msg)
    }
  }

  render() {
    const {userId, pin, se, em} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="main-con">
        <div className="ct-con">
          <div className="im-con">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="ima"
            />
          </div>
          <form className="form-el" onSubmit={this.BankLogin}>
            <h1 className="header"> Welcome Back! </h1>
            <div className="inp-con">
              <label htmlFor="user" className="lab">
                User ID
              </label>
              <input
                id="user"
                placeholder="Enter User ID"
                className="inp"
                type="text"
                value={userId}
                onChange={this.one}
              />
            </div>
            <div className="inp-con">
              <label htmlFor="pin" className="lab">
                PIN
              </label>
              <input
                placeholder="Enter Pin"
                id="pin"
                className="inp"
                type="password"
                value={pin}
                onChange={this.two}
              />
            </div>
            <button className="but" type="submit">
              Login
            </button>
            <div className="ct">
              {se === true && <p className="ep"> {em} </p>}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
