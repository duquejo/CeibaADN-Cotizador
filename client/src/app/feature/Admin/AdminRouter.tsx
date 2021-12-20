import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const AdminMainPage = React.lazy(() => import('./pages/Main'));

export const AdminRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    {/* Layout compartido entre las rutas va aquí */}
    <Switch>
      <Route path="/" component={AdminMainPage}></Route>
    </Switch>
  </React.Suspense>
);
