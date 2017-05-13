export function todos(state = [], action) {

    switch (action.type) {
        case 'TODO':
            return state.concat([action.text])
        case 'ADD_TODO':
            return state.concat([action.text])
        default:
            return state
    }
}
