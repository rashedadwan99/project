import React, { Component } from 'react'
import classes from './logReg.module.css'
import HomePage from './HomePage'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import { thisExpression } from '@babel/types';
const passwordValidation = new RegExp(/^[a-zA-Z0-9]{8,20}$/);
const phoneNumValidation = new RegExp(/^[0-9]{10}$/)
const emailValidation = new RegExp(/^([a-zA-z0-9]+)@([a-zA-z0-9]+).([a-zA-z0-9]+)$/)
const FnameStructure = new RegExp(/^[a-zA-Z]{3,10}/)
const LnameStructure = new RegExp(/^[a-zA-Z]{3,10}/)
const dateOfBearth = new RegExp(/^[0-9]+$/)
export default class LoginReg extends Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false,
            showLogForm: false,
            showRegForm: false,
            FirstName: '',
            LastName: '',
            Email: '',
            phoneNumber: '',
            Password: '',
            confirmPassword: '',
            showWeakPassword: false,
            showPasswordNotSame: false,
            showInvalidFirstName: false,
            showInvalidLirstName: false,
            showInvalidEmail: false,
            showInvalidPhoneNum: false,
        }
    }
    showLoginForm = () => {
        this.setState({ showLogForm: true })
    }
    hideLoginForm = () => {
        this.setState({ showLogForm: false })
    }
    showRegisterForm = () => {
        this.setState({ showRegForm: true })
    }
    hideRegisterForm = () => {
        this.setState({
            showRegForm: false,
            showInvalidFirstName: false,
            showInvalidLastName: false,
            showInvalidEmail: false,
            showInvalidPhoneNum: false,
            showWeakPassword: false,
            showPasswordNotSame: false,
            FirstName: '',
            LastName: '',
            Email: '',
            phoneNumber: '',
            dateOfBearth: '1999-3-19',
            day: '',
            month: '',
            year: '',
            Password: '',
            confirmPassword: ''
        })
    }
    Register = () => {
        if (FnameStructure.test(this.state.FirstName))
            this.setState({ showInvalidFirstName: false })
        else this.setState({ showInvalidFirstName: true })
        ///////////////////////////
        if (LnameStructure.test(this.state.LastName))
            this.setState({ showInvalidLastName: false })
        else this.setState({ showInvalidLastName: true })
        ///////////////////////////
        if (emailValidation.test(this.state.Email))
            this.setState({ showInvalidEmail: false })
        else this.setState({ showInvalidEmail: true })
        ///////////////////////////
        if (phoneNumValidation.test(this.state.phoneNumber))
            this.setState({ showInvalidPhoneNum: false })
        else this.setState({ showInvalidPhoneNum: true })
        ///////////////////////////
        if (dateOfBearth.test(this.state.year) &&
            dateOfBearth.test(this.state.month) &&
            dateOfBearth.test(this.state.day))
            this.setState({ showInvaliDate: false, date: this.state.year + '-' + this.state.month + '-' + this.state.day })
        else
            this.setState({ showInvaliDate: true })
        //////////////////////////
        if (passwordValidation.test(this.state.Password)) {
            this.setState({ showWeakPassword: false })

        }
        else { this.setState({ showWeakPassword: true }) }
        ///////////////////////////
        if (this.state.Password === this.state.confirmPassword)
            this.setState({ showPasswordNotSame: false })
        else
            this.setState({ showPasswordNotSame: true })
        //////////////////////////
        if (FnameStructure.test(this.state.FirstName) && LnameStructure.test(this.state.LastName)
            && emailValidation.test(this.state.Email)
            && passwordValidation.test(this.state.phoneNumber)
            && passwordValidation.test(this.state.Password)
            && dateOfBearth.test(this.state.year) && dateOfBearth.test(this.state.month) && dateOfBearth.test(this.state.day)
            && this.state.Password === this.state.confirmPassword) {
            this.setState({ loggedIn: true })
        }
    }
    render() {
        const { loggedIn, showLogForm, showRegForm, showInvalidFirstName,
            showInvalidLastName, showInvalidEmail, showInvalidPhoneNum, showPasswordNotSame,
            showWeakPassword, FirstName, LastName, Email, phoneNumber, date, showInvaliDate } = this.state
        if (loggedIn) {
            return (
                <Router>
                    < Redirect to="/HomePage" />
                    <Switch>
                        <Route path="/HomePage">
                            <HomePage FirstName={FirstName} LastName={LastName} Email={Email} phoneNumber={phoneNumber} date={date} />
                        </Route>
                    </Switch>
                </Router>)
        }
        else {

            return (
                <div className={classes.Container}>
                    <h1>
                        Adwan
                        <h6 style={{ "color": "rgb(62, 13, 77)", "font-weight": "600" }}>
                            Social Mediea Site to Make The Communication Easy
                        </h6>
                    </h1>
                    <div className={classes.logRegBoxes} >
                        <div className={classes.logBox} onClick={() => { this.showLoginForm(); this.hideRegisterForm() }}>
                            <div>
                                Login
                            </div>
                        </div>
                        {/* ********Login******* */}
                        {(showLogForm) ?
                            <div className={classes.loginForm}>
                                <h2>
                                    Login
                                </h2>
                                <p>
                                    <i class="fas fa-user"> </i><input type="text" placeholder="Username or email" />
                                </p>
                                <p>
                                    <i class="fas fa-key"></i><input type="password" placeholder="Password" />
                                </p>
                                <p className={classes.Buttons}>
                                    <button>Login</button>
                                    <button onClick={() => this.setState({ showLogForm: false })}>Cancel</button>

                                </p>
                                <p className={classes.Links}>
                                    <a>Forget a password ?</a>
                                    <a onClick={() => { this.hideLoginForm(); this.showRegisterForm() }}>Dont have an account? sign up</a>
                                </p>
                            </div> : null}
                        <div className={classes.regBox} onClick={() => { this.showRegisterForm(); this.hideLoginForm() }}>
                            <div>
                                Register
                            </div>
                        </div>
                        {/* ********Register Form******** */}
                        {(showRegForm) ?
                            <div className={classes.regForm}>
                                <h2>Register</h2>
                                <p>
                                    <i class="fas fa-user"> </i><input type="text" placeholder="First Name"
                                        onChange={(e) => this.setState({ FirstName: e.target.value })} />
                                </p>
                                {(showInvalidFirstName) ?
                                    <p className={classes.Pattern}>First name must be at least 3 characters</p>
                                    : null}
                                < p >
                                    <i class="fas fa-user"> </i><input type="text" placeholder="Last Name"
                                        onChange={(e) => this.setState({ LastName: e.target.value })}
                                    />
                                </p>
                                {(showInvalidLastName) ?
                                    <p className={classes.Pattern}>Last name must be at least 3 characters</p>
                                    : null}
                                <p>
                                    <i class="fas fa-envelope-square"></i><input type="email" placeholder="Email"
                                        onChange={(e) => this.setState({ Email: e.target.value })}
                                    />
                                </p>
                                {(showInvalidEmail) ?
                                    <p className={classes.Pattern}>Email Invalid</p>
                                    : null}
                                <p>
                                    <i class="fas fa-phone"></i><input type="text" placeholder="Phone Number"
                                        onChange={(e) => this.setState({ phoneNumber: e.target.value })}
                                    />
                                </p>
                                {(showInvalidPhoneNum) ?
                                    <p className={classes.Pattern}>Phone number must be at least 10 numbers </p>
                                    : null}
                                <p className={classes.Bearth}>
                                    <i class="fas fa-birthday-cake"></i>
                                    <div>
                                        <input type="number" placeholder="Year"
                                            onChange={(e) => this.setState({ year: e.target.value })} min="1" />
                                        <input type="number" placeholder="Month" min="1" max="12"
                                            onChange={(e) => this.setState({ month: e.target.value })} />
                                        <input type="number" placeholder="Day" min="1" max="31"
                                            onChange={(e) => this.setState({ day: e.target.value })} />
                                    </div>
                                </p>
                                {(showInvaliDate) ? <p className={classes.Pattern}>
                                    Enter your date of bearth correctly
                                </p> : null}
                                <p>
                                    <i class="fas fa-key"></i><input type="password" placeholder="Password"
                                        onChange={(e) => this.setState({ Password: e.target.value })}
                                    />
                                </p>
                                <p>
                                    <i class="fas fa-key"></i><input type="password" placeholder="Confirm Password"
                                        onChange={(e) => this.setState({ confirmPassword: e.target.value })}
                                    />
                                </p>
                                {(showWeakPassword) ?
                                    <p className={classes.Pattern}>Password must be at least 8 characters </p>
                                    : null}
                                {(showPasswordNotSame) ?
                                    <p className={classes.Pattern}>You must enter same password twice in order to confirm it</p>
                                    : null}
                                <p className={classes.Buttons}>
                                    <button onClick={() => this.Register()}>
                                        Register
                                    </button>
                                    <button onClick={() => this.hideRegisterForm()}>Cancel</button>
                                </p>
                            </div>
                            : null}
                    </div>
                </div >

            )
        }
    }
}