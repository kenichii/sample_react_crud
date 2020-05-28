// import React from 'react';
// import {connect} from 'react-redux';
// import {getProjectDatas, filterProjectDatas} from '../../actions/index';
// import PropTypes from 'prop-types';
//
// const minInvestment = [
//     {id: 1, value: '$7 - $200k', minMax: '$7 - $200k', label: '$7 - $200k'},
//     {id: 2, value: '$7 - $250k', minMax: '$7 - $250k', label: '$7 - $250k'},
//     {id: 3, value: '$8 - $300k', minMax: '$8 - $300k', label: '$8 - $300k'}
// ];

// class Projects extends React.Component {
// componentDidMount() {
//     // const projects = [];
//     // this.setState({
//     //     projects
//     // })
//     this.props.getProjectDatas();
// }
/*
    componentWillMount() {
        this.props.getProjectDatas();
    }

    render() {
        const projectItems = this.props.projects.map(proj => (
            <div key={proj.id}>
                <div>
                    {proj.projectTitle}
                </div>
            </div>
        ));
        // const items = this.props.projects.map(proj => (
        //     <div key={proj.id}>
        //         <div>
        //             {proj.projectTitle}
        //         </div>
        //     </div>
        // ));

        return (
            <div>
                <div>
                    {this.props.projects.length} projects count
                </div>
                {projectItems}
            </div>
        )
    }*/
// }

// Projects.propTypes = {
//     getProjectDatas: PropTypes.func.isRequired
// };
//
// const mapStateToProps = state => ({
//     projects: state.ProjectReducer.filteredItems,
//     selected: state.ProjectReducer.selected,
// });
//
// export default connect(
//     mapStateToProps,
//     {getProjectDatas, filterProjectDatas}
// )(Projects);
// export default Projects;
import React, {Component} from "react";
import RegistrationService from "../../services/registration.service";
import axios from 'axios';

export default class Projects extends Component {
    constructor(props) {
        super(props);
        this.onChangeFullName = this.onChangeFullName.bind(this);
        this.onChangeBirthday = this.onChangeBirthday.bind(this);
        this.onChangeAddress = this.onChangeAddress.bind(this);
        this.onChangeGender = this.onChangeGender.bind(this);
        this.saveRegistration = this.saveRegistration.bind(this);
        this.newUser = this.newUser.bind(this);

        this.state = {
            data: [],
            id: null,
            fullName: "",
            birthday: "",
            address: "",
            gender: "",
            published: false,
            submitted: false
        };
    }

    onChangeFullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangeBirthday(e) {
        this.setState({
            birthday: e.target.value
        });
    }

    onChangeAddress(e) {
        this.setState({
            address: e.target.value
        });
    }

    onChangeGender(e) {
        this.setState({
            gender: e.target.value
        });
    }

    saveRegistration() {
        var data = {
            fullname: this.state.fullName,
            birthday: this.state.birthday,
            address: this.state.address,
            gender: this.state.gender
        };

        RegistrationService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    fullname: response.data.fullName,
                    birthday: response.data.birthday,
                    address: response.address,
                    gender: response.gender,
                    published: response.data.published,
                    submitted: true
                });
            })
            .catch(e => {
                console.log(e);
            });
    }

    getSampleData = () => {
        RegistrationService.getAll()
            .then((response) => {
                const data = response.data;
                this.setState({
                    data: data
                });
                console.log(data);
                console.log('Data has been received');
            })
            .catch(() => {
                console.log('Error retrieving data!!!');
            });
    }

    newUser() {
        this.setState({
            id: null,
            fullName: "",
            birthday: "",
            address: "",
            gender: "",
            published: false,

            submitted: false
        });
    }

    componentWillMount() {
        this.getSampleData();
    }

    render() {
        return (
            <div className="container">
                <div className="submit-form">
                    {this.state.submitted ? (
                        <div>
                            <h4>You submitted successfully!</h4>
                            <button className="btn btn-success" onClick={this.newUser}>
                                Add
                            </button>
                        </div>
                    ) : (
                        <div>
                            <div className="form-group">
                                <label htmlFor="title">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    required
                                    value={this.state.fullName}
                                    onChange={this.onChangeFullName}
                                    name="title"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Birthday</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.birthday}
                                    onChange={this.onChangeBirthday}
                                    name="description"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Address</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.address}
                                    onChange={this.onChangeAddress}
                                    name="description"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="description">Gender</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    required
                                    value={this.state.gender}
                                    onChange={this.onChangeGender}
                                    name="description"
                                />
                            </div>
                            <button onClick={this.saveRegistration} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
