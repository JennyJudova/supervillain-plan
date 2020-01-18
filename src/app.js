import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './components/common/home';
import PlanShow from './components/plans/PlanShow';
import PlansAll from './components/plans/PlansAll';
import VillainsAll from './components/villains/VillainsAll';
import VillainsShow from './components/villains/VillainShow';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/evilplans/:id" component={PlanShow} />
          <Route exact path="/evilplans" component={PlansAll} />
          <Route exact path="/villains" component={VillainsAll} />
          <Route exact path="/villains/:id" component={VillainsShow} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
