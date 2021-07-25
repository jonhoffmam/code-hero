import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import DetailsHero from './pages/Details';

const Routes = () => {
  const Page404 = () => (<div>Página 404</div>);

  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} path="/" exact/>
        <Route component={DetailsHero} path="/detalhes/:id" />
        <Route component={Page404} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;