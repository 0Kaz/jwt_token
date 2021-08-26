import React from 'react'
import {Link} from 'react-router-dom'
const Navbar = ({auth}) => {
    const logOut = () => {
        localStorage.removeItem('token')
    }
    return (
        <div>
            {auth ? 
             <ul>
             <li><Link to='/'>Home</Link></li>
             <li><Link to='/products'>Products</Link></li>
             <li><Link onClick={logOut}>Logout</Link></li>
         </ul>
            :
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/registration'>Register</Link></li>
                <li><Link to='/login'>Login</Link></li>
            </ul>
            }
        </div>
    )
}

export default Navbar
