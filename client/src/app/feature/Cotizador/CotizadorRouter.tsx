import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { LazyFallback } from 'app/shared/components/LazyFallback';

const CotizadorPage = React.lazy(() => import('./pages/Main'));

export const CotizadorRouter = () => (
  <React.Suspense fallback={<LazyFallback />}>
    {/* Layout compartido entre las rutas va aquí */}
    <Switch>
      <Route path="/" component={CotizadorPage}></Route>
    </Switch>
  </React.Suspense>
);
