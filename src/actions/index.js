import axios from 'axios';

export const getProjectDatas = () => dispatch => {
    return fetch("http://localhost:8000/projects")
        .then(res => res.json())
        .then((data) => {
            dispatch({
                type: "FETCH_PROJECTS",
                payload: data
            });

        })
        .catch((err) => {
            dispatch({
                type: "FETCH_SAMPLE_DATA_ERROR", payload: err
            });
        })
};

export const filterProjectDatas = (projects, investment) => dispatch => {
    let id = parseInt(investment);
    console.log(projects);
    /* console.log();console.log(id + " " +a.id)*/
    let item = projects.filter(a => a.id === id);
    //console.log(item);
    return dispatch({
        type: 'FILTER_PROJECTS',
        payload: {
            investment: investment,
            items: investment === '' ? projects : item
        }
    })
};
