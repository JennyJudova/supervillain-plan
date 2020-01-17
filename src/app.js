import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './styles/style.scss';
import Home from './components/common/home';
import PlanShow from './components/plans/PlanShow';

const App = () => {
  return (
    <BrowserRouter>
      <main>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/evilplans/:id" component={PlanShow} />
        </Switch>
      </main>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
