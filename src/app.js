import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './components/common/home';
import PlanShow from './components/plans/PlanShow';
import PlansAll from './components/plans/PlansAll';
import VillainsAll from './components/villains/VillainsAll';
import VillainsShow from './components/villains/VillainShow';

import Register from './components/auth/Register';
import Login from './components/auth/Login';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/evilplans/:id" component={PlanShow} />
          <Route path="/evilplans" component={PlansAll} />
          <Route path="/villains/:id" component={VillainsShow} />
          <Route path="/villains" component={VillainsAll} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
