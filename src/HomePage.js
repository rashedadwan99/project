import React, { Component } from 'react'
import Classes from './HomePage.module.css'
import Post from './Post'
import Profile from './Profile'
import Ahmed from './ahmedProfile'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";

class Header extends Component {
    constructor() {
        super()
        this.state = {
            HeaderMembers: [
                {
                    icon: <i class="fas fa-home"></i>,
                    url: 'Post'
                },
                {
                    icon: <i class="fas fa-user-circle"></i>,
                    url: 'Profile'
                },
            ],
            NotificationMembers: [
                { sender: 'Ahmad', accept: false }],
            showCartContent: false,
            search: '',
            showNotification: false,
            showUsers: false,
            users: [
                {
                    FirstName: 'Ahmed',
                    LastName: 'Dyack',
                    DateOfBearth: '23-4-1998',
                    phoneNumber: '078613162',
                    Email: 'ahmed@gmail.com',
                    imgUrl: 'profilePic.png',
                },
            ]
        }
    }
    clickBell = () => {
        this.setState(prevState => {
            this.setState({ showNotification: !prevState.showNotification })
        })
    }
    deleteRequest = (index) => {
        let m = Object.assign([], this.state.NotificationMembers)
        m.splice(index, 1)
        this.setState({ NotificationMembers: m })
    }
    acceptReq = (index) => {
        let m = Object.assign([], this.state.NotificationMembers)
        m[index].accept = true
        this.setState({ NotificationMembers: m })
    }
    render() {
        const { HeaderMembers, showNotification, NotificationMembers, users, showUsers } = this.state;
        return (
            <Router>
                <main className={Classes.Main}>
                    <div className={Classes.FirstHeader}>
                        <div>
                            <p style={{ "margin-right": "5px", "font-size": "20px", "color": "black", "font-family": "cursive" }}>Adwan Site</p>
                            <input type='text' placeholder="Search for ahmed"
                                onChange={(e) => this.setState({ search: e.target.value, showUsers: true })}
                                onFocus={(e) => this.setState({ showUsers: false })}
                            />
                            {(showUsers) ?
                                < div className={Classes.History}>
                                    {users.map((item, index) => {
                                        return (
                                            <Link to="AhmedProfile">
                                                <p>
                                                    <img src={item.imgUrl} alt="" style={{
                                                        "height": "50px",
                                                        "width": "50px",
                                                        "border-radius": "50%"
                                                    }} />{item.FirstName} {item.LastName}
                                                </p>
                                            </Link>)
                                    })}

                                </div> : null}
                        </div>
                        <div className={Classes.RegandCart}>
                            <div>
                                <i class="fas fa-sign-in-alt" ></i>
                                <span>Log out </span>
                            </div>

                        </div>

                    </div>
                    <div className={Classes.SecondHeader}>
                        {
                            HeaderMembers.map((item, index) => {

                                return (
                                    <div >
                                        <Link to={item.url}>
                                            <div >{item.icon}</div>
                                        </Link>

                                    </div>
                                )
                            })}

                        <i class="fas fa-bell" onClick={() => this.clickBell()}></i>
                        {(showNotification) ?
                            NotificationMembers.map((item, index) => {
                                return < div className={Classes.Notifications}>
                                    <p>{item.sender} sends a friend request
                                        {!item.accept ? <span><button onClick={() => this.acceptReq(index)}>Accept</button></span> :
                                            <span style={{ "margin-left": "3px" }}> accepted</span>}
                                        {!item.accept ? <span> <button onClick={() => this.deleteRequest(index)}>Delete</button>
                                        </span> : null}
                                    </p>
                                </div>
                            }) : null}
                    </div>

                    < Switch >
                        <Route path="/Post">
                            <Post FirstName={this.props.FirstName}
                                LastName={this.props.LastName} />
                        </Route>
                        <Route path="/Profile">
                            <Profile FirstName={this.props.FirstName} LastName={this.props.LastName}
                                Email={this.props.Email}
                                phoneNumber={this.props.phoneNumber}
                                date={this.props.date} />
                        </Route>
                        <Route path="/ahmedProfile">
                            <Ahmed />
                        </Route>
                    </Switch>
                </main>
            </Router >
        )
    }
}

export default Header;