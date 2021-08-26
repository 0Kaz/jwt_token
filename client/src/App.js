import { Switch, Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Login from './Components/Login'
import Registration from './Components/Registration'
import {useEffect, useState} from 'react'

const App =() => {
  const [auth, setAuth] = useState(false)

  useEffect(()=>{
    localStorage.getItem('token') ? setAuth(true): setAuth(false)
  },[auth])
  return (
   <>

      <Navbar auth={auth}/>

      <Switch>
        <Route path='/' exact>
          <Home/>
        </Route>

        <Route path='/login'>
          <Login/>
        </Route>

        <Route path='/registration'>
          <Registration/>
        </Route>
      </Switch>

   </>
  );
}

export default App;
