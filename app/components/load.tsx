import * as Loadable from 'react-loadable';
import * as React from "react"

export const LoadableComponent = Loadable({
    loader: () => import('./product'),
    loading: () => (<h4>Cesco</h4>)
});
