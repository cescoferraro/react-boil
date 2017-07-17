import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/filter'
import { combineEpics } from "redux-observable";

export const PING_ACTION_NAME = "PING";
export function PING_ACTION() {
    return {
        type: PING_ACTION_NAME
    }
}

const pingEpic = action$ =>
    action$.filter(action => action.type === 'PING')
        .map((hey) => (hey))
        .mapTo({ type: 'HOME' });

export const RootEpic = combineEpics(
    pingEpic
);
