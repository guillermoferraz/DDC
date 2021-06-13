import logo from './logo.svg';
import './App.css';
import 'bootswatch/dist/lux/bootstrap.min.css';

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'


import UserState from './context/User/UserState';
import User from './components/User';
import CreateUser from './components/CreateUser';
import Login from './components/Login';
import Error from './components/Error'
import Table from './components/Table';
import Profile from './components/profile';
import Blog from './components/Blog';

function App() {
  return (
    <div className="App">
        <UserState>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login}/>
                     <Route exact path ="/register" component={CreateUser}/>
                    <Route exact path ="/home" component={User}/>
                    <Route exact path="/error" component={Error}/>
                    <Route exact path="/table" component={Table}/>
                    <Route exact path="/profile" component={Profile}/>
                    <Route exact path="/blog" component={Blog}/>
                </Switch>
            </Router>
        </UserState>
    </div>
  );
}

export default App;
