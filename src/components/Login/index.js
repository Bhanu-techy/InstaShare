import { useState } from "react"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"

import './index.css'

const Login = () => {

    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [showSubmitErr, setShowErr] = useState(false)
    const [errMsg, setErrmsg ] = useState("")

     const navigate = useNavigate();

    const submitForm = async event => {
        event.preventDefault()

    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      navigate("/", {replace : true})
    } else {
      setErrmsg(data.error_msg)
      setShowErr(true)
    }
    }

    const onChangeName = e => {
        setUserName(e.target.value)
    }

    const onChangePassword = e => {
        setPassword(e.target.value)
    }

    return(
            <div className="login-container">
              <div className="login-img-container">
                <img
                  src="https://res.cloudinary.com/dya0bwju7/image/upload/v1749728287/Illustration_qpy0ly.png"
                  className="login-image"
                  alt="website login"
                />
              </div>
              <form className="login-form-container" onSubmit={submitForm}>
                <div className="login-logo-containter">
                  <img
                    src="https://res.cloudinary.com/dya0bwju7/image/upload/v1749788026/Standard_Collection_8_ujpfzk.png"
                    alt="website logo"
                    className="logo"
                  />
                  <h1 className="login-heading">Insta share</h1>
                </div>
                <div className="input-container">
                  <label htmlFor="username">USERNAME</label>
                  <input
                    id="username"
                    type="text"
                    className="login-input"
                    value={username}
                    onChange={onChangeName}
                  />
                </div>
                <div className="input-container">
                  <label htmlFor="password">PASSWORD</label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    className="login-input"
                    onChange={onChangePassword}
                  />
                  {showSubmitErr && <p className="error-msg">{errMsg}</p>}
                </div>

                <button type="submit" className="login-button">
                  Login
                </button>
              </form>
            </div>
          
    )
}

export default Login