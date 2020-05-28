import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {Container} from 'react-bootstrap';
import './Main.scss'

const Main = (props) => {
    return (
        <Container fluid>
            <div className="child">
                {props.children}
            </div>
        </Container>
    );
};

Main.propTypes = {
    children: PropTypes.node
};

export default Main;
