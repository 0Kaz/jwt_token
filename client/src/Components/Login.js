import React, {useState} from 'react'
import axios from 'axios'
import {history} from '../index'
axios.defaults.withCredentials = true

const Login = () => {
    const [error, setError] = useState()
    const loggedIn = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/login',{
            email: e.target.email.value,
            password: e.target.password.value
        }, {withCredentials: true}).then( res => {
            if(res.data.token){
                localStorage.setItem('token', res.data.token)
                history.push('/')
            }
            setError(res.data.message)

            console.log(res)
        }).catch( error => {
            console.log(error)
        })

    }
    return (
        <>
        <form onSubmit={loggedIn}>
            Email : <input type="text" name='email' />
            Password: <input type="password" name='password' />
            <button>Login</button>
        </form>
            {error}
        </>
    )
}

export default Login
