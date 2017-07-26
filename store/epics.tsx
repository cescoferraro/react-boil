import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/mapTo'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/filter'
import { combineEpics } from "redux-observable";

export const PING_ACTION_NAME = "PING";
export function PING_ACTION() {
    return {
        type: PING_ACTION_NAME
    }
}
const userEpic = action$ => {
    return action$.
        ofType("GET_USER")
        .mergeMap((action) =>
            (Observable.of(
                { type: "USER", payload: action.payload.id })))
};

const pingEpic = action$ =>
    action$.filter(action => action.type === 'PING')
        .map((hey) => (hey))
        .mapTo({ type: 'USER', payload: 78878 });

export const RootEpic = combineEpics(
    pingEpic, userEpic
);
