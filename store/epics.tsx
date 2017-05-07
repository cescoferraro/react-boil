import { combineEpics } from "redux-observable";
import "rxjs";


const pingEpic = action$ =>
    action$.filter(action => action.type === 'PING')
        .mapTo({ type: 'PONG' });

export const RootEpic = combineEpics(
    pingEpic
);
