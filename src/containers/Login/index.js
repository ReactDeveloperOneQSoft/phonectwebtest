/*=== import the common packages ===*/
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Row } from 'react-bootstrap';
import { MuiThemeProvider, TextField, RaisedButton, Checkbox, Snackbar } from 'material-ui';
/*=== import internal ===*/
import './styles.scss'; // import styles of login page
import { actions, types } from '../../middle'; // call to actions & types (redux)
import { ApiRequest } from '../../ApiRequest';
import { subscriptionUpdated } from '../../actions/company';

class Login extends Component {
    // constructor: this is function to setup default states & call to the init functions
    constructor(props) {
        super(props);

        this.state = {};
    }
    // componentWillMount: this function will called before render (lifecycle react)
    componentWillMount() {
        const { auth } = this.props;
        // redirect to list patient page if user authenticated
        console.log(ApiRequest.getInstance());
    }

    // handleRequestClose: this function will called to hidden a error message
    handleRequestClose() {
        this.setState({ msgStatus: false });
    }

    // componentWillReceiveProps: this function will called when have a new props or prop received a new value (lifecycle react)
    componentWillReceiveProps(props) {
        const { auth } = props;
    }

    // onLogin: call to action login. this action defined in middle
    onLogin() {}

    // onRememberChange: call to action remember. this action defined in middle
    onRememberChange(checked) {}

    // onChangeValue: this is function to handle the change of the inputs in form. we will set state again when the value changed
    onChangeValue(key, value) {}

    onKeyPress(event) {}

    // render: this is function to render all element of login page into dom
    render() {
        return (
            <MuiThemeProvider>
                <Grid className="form">
                    <div className="form-login lbl-change-top">
                        <Snackbar
                            open={false}
                            message={''}
                            autoHideDuration={4000}
                            onRequestClose={() => this.handleRequestClose()}
                            bodyStyle={{ background: '#dc4437', textAlign: 'center' }}
                        />
                        <Row>
                            <h3 className="text-center">Sign In</h3>
                        </Row>
                        <Row>
                            <TextField
                                className="input-border"
                                floatingLabelText="Username"
                                multiLine={false}
                                fullWidth={true}
                                rows={1}
                                onChange={(event, value) => {
                                    this.onChangeValue('username', value);
                                }}
                                onKeyPress={this.onKeyPress}
                            />
                        </Row>
                        <Row>
                            <TextField
                                className="input-border"
                                floatingLabelText="Password"
                                multiLine={false}
                                fullWidth={true}
                                rows={1}
                                type={'password'}
                                onChange={(event, value) => {
                                    this.onChangeValue('password', value);
                                }}
                                onKeyPress={this.onKeyPress}
                            />
                        </Row>
                        <Row>
                            <RaisedButton
                                className="btn-save"
                                label="Login"
                                primary={true}
                                onTouchTap={() => {
                                    this.onLogin();
                                }}
                            />
                            <Checkbox
                                className="checkbox"
                                label="Remember"
                                defaultChecked={true}
                                onCheck={(event, checked) => {
                                    this.onRememberChange(checked);
                                }}
                            />
                        </Row>
                    </div>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

function bindAction(dispatch) {
    return {
        subscriptionUpdated: subscription => dispatch(subscriptionUpdated(subscription))
    };
}
// map data of redux
const mapStateToProps = state => {
    const { auth } = state;

    return {
        auth
    };
};

// map the states to props to using in login page
export default connect(mapStateToProps, bindAction)(Login);
