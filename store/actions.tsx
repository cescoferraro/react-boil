import { bindActionCreators } from "redux";



export const DRAWER_ACTION_NAME = "DRAWER";

export function DRAWER_ACTION(state) {
    return {
        type: DRAWER_ACTION_NAME,
        payload: state
    }
}

export const DRAWER_TOGGLE_ACTION_NAME = "DRAWER_TOOGLE";
export function DRAWER_TOGGLE_ACTION() {
    return {
        type: DRAWER_TOGGLE_ACTION_NAME,
    }
}

export function USER_ACTION(id) {
    return { type: 'USER', payload: { id } }
}

export const APP_ACTIONS = (dispatch) => {
    return bindActionCreators({
        DRAWER_ACTION,
        USER_ACTION,
        DRAWER_TOGGLE_ACTION,
        dispatch
    }, dispatch);
};
