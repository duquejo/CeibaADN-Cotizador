import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AdminRouter } from 'app/feature/Admin/AdminRouter';
import { CotizadorRouter } from './feature/Cotizador/CotizadorRouter';
import MainPage from 'app/Main';
import { NavigationHeader } from 'app/shared/components/NavigationHeader';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <NavigationHeader />
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route path="/home" component={MainPage} />
        <Route path="/administrador" component={AdminRouter} />
        <Route path="/cotizador" component={CotizadorRouter} />
      </Switch>
    </BrowserRouter>
  );
};
