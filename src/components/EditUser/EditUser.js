import React, {Component} from "react";
import RegistrationService from "../../services/registration.service";

export default class EditUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeFullname = this.onChangeFullname.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.getUser = this.getUser.bind(this);
        this.updateUser = this.updateUser.bind(this);

        this.state = {
            currentUser: {
                id: null,
                fullname: "",
                address: "",
                birdthday: "",
                gender: "",
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getUser(this.props.match.params.id);
    }

    onChangeFullname(e) {
        const fullname = e.target.value;

        this.setState(function (prevState) {
            return {
                currentUser: {
                    ...prevState.currentUser,
                    fullname: fullname
                }
            };
        });
    }
    onChangeAddress(e) {
        const address = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                address: address
            }
        }));
    }
    onChangeBirthday(e) {
        const birthday = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                birthday: birthday
            }
        }));
    }
    onChangeGender(e) {
        const gender = e.target.value;

        this.setState(prevState => ({
            currentUser: {
                ...prevState.currentUser,
                address: gender
            }
        }));
    }

    getUser(id) {
        RegistrationService.getById(id)
            .then(response => {
                this.setState({
                    currentUser: response.data
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    updateUser(status) {
        var data = {
            id: this.state.currentUser._id,
            fullname: this.state.currentUser.fullname,
            address: this.state.currentUser.address,
            birdthday: this.state.currentUser.birdthday,
            gender: this.state.currentUser.gender,
        };

        RegistrationService.update(this.state.currentUser._id, data)
            .then(response => {
                this.setState(prevState => ({
                    currentTutorial: {
                        ...prevState.currentTutorial,
                        published: status
                    }
                }));
                console.log(response.data);
                this.props.history.push('/')
            })
            .catch(e => {
                console.log(e);
            });
    }

    render() {
        const {currentUser} = this.state;

        return (
            <div>
                {currentUser ? (
                    <div className="edit-form">
                        <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="title">Fullname</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={currentUser.fullname}
                                    onChange={this.onChangeFullname}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentUser.address}
                                    onChange={this.onChangeAddress}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Birthday</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentUser.birthday}
                                    onChange={this.onChangeBirthday}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={currentUser.gender}
                                    onChange={this.onChangeGender}
                                />
                            </div>

                        </form>

                        <button
                            type="submit"
                            className="badge badge-success"
                            onClick={this.updateUser}
                        >
                            Update
                        </button>

                    </div>
                ) : (
                    <div>
                        <br/>
                        <p>Please click on a Tutorial...</p>
                    </div>
                )}
            </div>
        );
    }
}
