import './App.css';
import React from 'react';
import {Route} from 'react-router-dom'
import Landing from './components/landing.jsx'
import Home from './components/home.jsx'
import Create from './components/create.jsx'
function App() {
  return (
    <React.Fragment>
   <Route exact path={'/'} component={Landing}/>
    <Route path={'/home'} component={Home}/>
    <Route path={'/create'} component={Create}/>

   
   </React.Fragment>
  );
}

export default App;
