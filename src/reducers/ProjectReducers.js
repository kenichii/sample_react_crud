const initialState = {
    fetching: false,
    fetched: false,
    projects: [],
    filteredItems: [],
    investment: null,
    error: null,
};

const ProjectReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_PROJECTS':
            return {
                ...state,
                items: action.payload,
                filteredItems: action.payload
            };
        case "FILTER_PROJECTS":
            return {
                ...state,
                selected: action.payload.investment,
                filteredItems: action.payload.items
            };
            break;
        default:
            return state;
    }
};
export default ProjectReducer;
