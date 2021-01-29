import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import home from "./components/home";
import login from "./components/login";
import register from "./components/register";
import applicantUI from "./components/applicantUI";
import recruiterUI from "./components/recruiterUI";
import Rdashboard from "./components/Rdashoard";
import Adashboard from "./components/Adashboard";
import Rapplications from "./components/Rapplications";
import Aapplications from "./components/Aapplications";
import Rviewapps from "./components/Rviewapps";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

function App() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    setUser({
      _id: localStorage.getItem("_id") || null,
      email: localStorage.getItem("email") || null,
      jobtype: localStorage.getItem("jobtype") || null,
      name: localStorage.getItem("name") || null,
      BioData: localStorage.getItem("BioData") || null,
      contact: localStorage.getItem("contact") || null,
      // education: localStorage.getItem("education") || null,
    });
  }, []);

  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React !!!!
    //     </a>
    //   </header>
    //  </div>
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Switch>
          <Route exact path="/login" component={login} />
          <Route exact path="/register" component={register} />
          {/* <Route exact path="/applicantUI" component={applicantUI} /> */}
          <Route exact path="/Rdashboard" component={Rdashboard} />
          <Route exact path="/Rapplications" component={Rapplications} />
          <Route exact path="/Adashboard" component={Adashboard} />
          <Route exact path="/Aapplications" component={Aapplications} />
          <Route exact path="/Rviewapps" component={Rviewapps} />

          <Redirect to="/login" />
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
