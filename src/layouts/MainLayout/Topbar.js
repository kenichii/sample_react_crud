import React, {Component} from "react";
import {Navbar, Nav, Container, Row, Col} from 'react-bootstrap';
import './Topbar.scss';
import Avatar from 'react-avatar';
import Select from 'react-select';
//import {filterAllProjects, filterProjects} from '../../store/actions/index'
//import store from '../../store/store';
import {connect} from 'react-redux';
import {filterProjectDatas} from "../../actions/index";

const sampleOptions = [
    {value: 'chocolate', label: 'Chocolate'},
    {value: 'strawberry', label: 'Strawberry'},
    {value: 'vanilla', label: 'Vanilla'}
];
const minInvestment = [
    {id: 1, value: '$7 - $200k', minMax: '$7 - $200k', label: '$7 - $200k'},
    {id: 2, value: '$7 - $250k', minMax: '$7 - $250k', label: '$7 - $250k'},
    {id: 3, value: '$8 - $300k', minMax: '$8 - $300k', label: '$8 - $300k'}
];

class Topbar extends Component {
    state = {
        projects: null,
    };

    render() {
        return (
            <div className="Topbar">
                <Navbar expand="lg" variant="dark">
                    <Navbar.Brand>
                        <div className="image-logo"></div>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="ml-auto">
                            {/* <Avatar name="Wim Mostmans" unstyled="true"/>*/}
                            <Nav.Link className="text-dark"  href="/">User List</Nav.Link>
                            <Nav.Link eventKey={2} className="text-dark" href="/Projects">
                                Add User
                            </Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            {/*    <Container expand="lg" className="is-column" fluid>
                    <Row className="container-row">
                        <Col className="border-right-gray">
                            <p className="dropdown-fields mb-0">LOCATION</p>
                            <Select options={sampleOptions}/>
                        </Col>
                        <Col className="border-right-gray">
                            <p className="dropdown-fields mb-0">LOCATION</p>
                            <select className="form-control"
                                    value={this.props.sort}
                                    onChange={(e) => this.props.filterProjectDatas(this.props.projects, e.target.value)}
                                // onChange={this.props.handleChangeSort}
                                // onChange={(e) => this.props.filterProjectDatas(this.props.projects, e.target.value)}>
                            >
                                <option value={1}>$7 - $200k</option>
                                <option value={2}>$7 - $250k</option>
                                <option value={3}>$7 - $300k</option>
                            </select>
                                                            value={this.props.id}

                            <Select
                            placeholder="Select Option"
                            options={minInvestment}
                            onChange={(e) => this.props.filterProjectDatas(this.props.projects, e.target.value)}
                            // assign onChange function
                            />
                        </Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col className="border-right-gray">Col</Col>
                        <Col>Col</Col>
                    </Row>
                </Container>*/}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    projects: state.ProjectReducer.items,
});
export default connect(
    mapStateToProps,
    {filterProjectDatas}
)(Topbar);
