import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import './stylsheets/App.scss';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Topbar from './layouts/MainLayout/Topbar';
import Main from './layouts/Main';
import Projects from './components/Projects/Projects';
import ListOfUsers from './components/ListOfUsers/ListOfUsers';
import EditUser from './components/EditUser/EditUser';

import {connect} from 'react-redux';
import {getProjectDatas, filterProjectDatas} from './actions/index';
// function App() {
//     return (
//         <React.Fragment>
//             <Topbar/>
//             <Main>
//                 <Router>
//                     <Switch>
//                         <Route exact path="/" component={Projects}></Route>
//                     </Switch>
//                 </Router>
//             </Main>
//         </React.Fragment>
//     );
// }
// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             projects: [],
//             filteredProjects: []
//         }
//         this.handleChangeSort = this.handleChangeSort.bind(this);
//     }
//
//     handleChangeSort(e) {
//         console.log(e.target.value);
//         this.setState({sort: e.target.value});
//     }
//
//     componentWillMount() {
//         this.listProject();
//     }
//
//     listProject() {
//         // this.setState(state => {
//         //     if (state.sort !== '') {
//         //         state.projects.sort((a,b) => (state.sort === '1') ?
//         //             a.
//         //         )
//         //     }
//         // })
//     }
//
//     render() {
//         return (
//             <div className="App">
//
//             </div>
//         )
//     }
// }
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projects: [],
            filteredProjects: []
        }
        this.handleChangeSort = this.handleChangeSort.bind(this);
    }

    handleChangeSort(e) {
        console.log(e.target.value);
        this.setState({sort: e.target.value});
    }

    componentWillMount() {
        this.listProject();
    }

    listProject() {
        // this.setState(state => {
        //     if (state.sort !== '') {
        //         state.projects.sort((a,b) => (state.sort === '1') ?
        //             a.
        //         )
        //     }
        // })
    }
    render() {
        return (
            <Router>
                <div>
                    <Topbar id={this.state.id}
                            sort={this.state.sort}
                            handleChangeSize={this.handleChangeSize}
                            handleChangeSort={this.handleChangeSort}
                            count={this.props.projects.length}
                    />
                    <div className="container mt-3">
                        <Switch>
                            <Route exact path={["/", "/userList"]} component={ListOfUsers} />
                            <Route exact path="/Projects" component={Projects} />
                            <Route path="/EditUser/:id" component={EditUser} />
                        </Switch>
                    </div>
                </div>
            </Router>
        );
    }
}

const mapStateToProps = state => ({
    projects: state.ProjectReducer.filteredItems,
    selected: state.ProjectReducer.selected,
});

export default connect(
    mapStateToProps,
    {getProjectDatas}
)(App);
//export default App;
