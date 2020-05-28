import React, {Component} from "react";
import RegistrationService from "../../services/registration.service";
import {Link} from "react-router-dom";

export default class ListOfUsers extends Component {
    constructor(props) {
        super(props);
        this.onChangeSearchUser = this.onChangeSearchUser.bind(this);
        this.retrieveUsers = this.retrieveUsers.bind(this);
        this.refreshList = this.refreshList.bind(this);
        this.setActiveTutorial = this.setActiveTutorial.bind(this);
        this.removeAllTutorials = this.removeAllTutorials.bind(this);
        this.updateUser = this.updateUser.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.searchUser = this.searchUser.bind(this);

        this.state = {
            data: [],
            currentSelected: null,
            currentIndex: -1,
            searchUser: ""
        };
    }

    componentDidMount() {
        this.retrieveUsers();
    }

    onChangeSearchUser(e) {
        const searchUser = e.target.value;

        this.setState({
            searchUser: searchUser
        });
    }

    retrieveUsers() {
        RegistrationService.getAll()
            .then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }

    refreshList() {
        this.retrieveTutorials();
        this.setState({
            currentTutorial: null,
            currentIndex: -1
        });
    }

    setActiveTutorial(selected, index) {
        this.setState({
            currentSelected: selected,
            currentIndex: index
        });
    }

    removeAllTutorials() {
        RegistrationService.deleteAll()
            .then(response => {
                console.log(response.data);
                this.refreshList();
            })
            .catch(e => {
                console.log(e);
            });
    }

    searchUser() {
        RegistrationService.findByName(this.state.searchUser)
            .then(response => {
                this.setState({
                    data: response.data
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    updateUser() {
        RegistrationService.update(
            this.state.currentSelected.id,
            this.state.currentSelected
        )
            .then(response => {
                console.log(response.data);
                this.setState({
                    message: "The tutorial was updated successfully!"
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    deleteUser() {
        RegistrationService.delete(this.state.currentSelected._id)
            .then(response => {
                if(response){
                    console.log(response.data);
                    this.props.history.push('/')
                }
            })
            .catch(e => {
                console.log(e);
            });
    }
    render() {
        const {searchUser, data, currentSelected, currentIndex} = this.state;

        return (
            <div className="list row">
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by user"
                            value={searchUser}
                            onChange={this.onChangeSearchUser}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchUser}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>User List</h4>

                    <ul className="list-group">
                        {data &&
                        data.map((users, index) => (
                            <li
                                className={
                                    "list-group-item " +
                                    (index === currentIndex ? "active" : "")
                                }
                                onClick={() => this.setActiveTutorial(users, index)}
                                key={index}
                            >
                                {users.fullName ? users.fullName: users.fullname}
                            </li>
                        ))}
                    </ul>

                    <button
                        className="m-3 btn btn-sm btn-danger"
                        onClick={this.removeAllTutorials}
                    >
                        Remove All
                    </button>
                </div>
                <div className="col-md-6">
                    {currentSelected ? (
                        <div>
                            <h4>Tutorial</h4>
                            <div>
                                <label>
                                    <strong>Title:</strong>
                                </label>{" "}
                                {currentSelected.fullname  ? currentSelected.fullname : currentSelected.fullName }
                            </div>
                            <div>
                                <label>
                                    <strong>Address:</strong>
                                </label>{" "}
                                {currentSelected.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Birthday:</strong>
                                </label>{" "}
                                {currentSelected.birthday}
                            </div>
                            <div>
                                <label>
                                    <strong>Gender:</strong>
                                </label>{" "}
                                {currentSelected.gender}
                            </div>

                            <Link
                                to={"/EditUser/" + currentSelected._id}
                                className="badge badge-warning"
                            >
                                Edit
                            </Link>
                            <button
                                className="badge badge-danger mr-2"
                                onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) this.deleteUser(e) }}
                            >
                                Delete
                            </button>

                           {/* <button
                                type="submit"
                                className="badge badge-success"
                                onClick={this.updateUser}
                            >
                                Update
                            </button>*/}
                        </div>
                    ) : (
                        <div>
                            <br/>
                            <p>Please click on a Tutorial...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
