import React, {useState} from 'react'
import axios from 'axios'
axios.defaults.withCredentials = true

const Registration = () => {
    const [error, setError] = useState()

    const registerIn = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3001/signup',{
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value
        }, {withCredentials: true}).then( res => {
            if(res.data.token){
                localStorage.setItem('token', res.data.token)
                window.location.reload()
            }
            setError(res.data.message)
        }).catch( error => {
            console.log(error)
        })

    }
    return (
        <>
        <form onSubmit={registerIn}>
            Username: <input type="text" name='username'/>
            Email : <input type="text" name='email'/>
            Password: <input type="password" name='password' />
            <button>Registration</button>
        </form>
        {error}
        </>
    )
}

export default Registration
