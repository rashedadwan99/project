import React, { Component } from 'react'
import classes from './Profile.Module.css'
class Profile extends Component {
    constructor() {
        super()
        this.state = {
            showUserInformation: false,
        }
    }
    ClickAbout = () => {
        this.setState((prevState) => this.setState({ showUserInformation: !prevState.showUserInformation }))
    }
    render() {
        const { showUserInformation } = this.state
        return (
            <main>
                <section>
                    <div className={classes.ProfilePictureAndName}>
                        <img src="profilePic.png" alt="" className={classes.ProfileImg} />
                        <div>{this.props.FirstName} {this.props.LastName}</div>
                    </div>
                    <div className={classes.navigationBar}>
                        <span onClick={() => this.ClickAbout()}> <i class="fas fa-question"></i> About </span>
                    </div>
                    <div className={classes.About}>
                        {(showUserInformation) ?
                            <div className={classes.UserInfo} >
                                <div>
                                    <i class="fas fa-user"></i> : {this.props.FirstName} {this.props.LastName}
                                </div>
                                <div>
                                    <i class="fas fa-envelope-square"></i> : {this.props.Email}
                                </div>
                                <div>
                                    <i class="fas fa-phone"></i> : {this.props.phoneNumber}
                                </div>
                                <div>
                                    <i class="fas fa-birthday-cake"></i> : {this.props.date}
                                </div>
                            </div> : null}

                    </div>
                    <div>
                    </div>
                </section>
            </main >

        );
    }

}
export default Profile