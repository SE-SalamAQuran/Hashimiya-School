import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NotFound from './components/NotFound';
import Main from "./components/Main";
import Login from "./components/Login";
import StudentProfile from "./components/StudentProfile";
import TeacherProfile from "./components/TeacherProfile";
import AdminProfile from "./components/AdminProfile";
import Teachers from './components/Teachers';
import About from './components/About';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact component={Main} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={StudentProfile} />
          <Route path="/tprofile" component={TeacherProfile} />
          <Route path="/aprofile" component={AdminProfile} />
          <Route path='/teachers' component={Teachers} />
          <Route path='/about' component={About} />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />

        </Switch>

      </Router>

    </div>
  );
}

export default App;
