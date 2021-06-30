import React, { Component } from 'react'
import classes from './Profile.Module.css'

class Profile extends Component {
    Info =
        {
            imgUrl: 'profilePic.png',
            FirstName: 'Ahmed',
            LastName: 'Dyack',
            DateOfBearth: '23-4-1998',
            phoneNumber: '078613162',
            Email: 'ahmed@gmail.com'
        }


    constructor() {
        super()
        this.state = {
            showUserInformation: false,
            showAddFriend: true
        }
    }
    ClickAbout = () => {
        this.setState((prevState) => this.setState({ showUserInformation: !prevState.showUserInformation }))
    }
    render() {
        const { showUserInformation, showAddFriend } = this.state
        return (
            <main>
                <section>
                    <div className={classes.ProfilePictureAndName}>
                        <img src="profilePic.png" alt="" className={classes.ProfileImg} />
                        <div>{this.Info.FirstName} {this.Info.LastName}</div>
                    </div>
                    <div className={classes.navigationBar}>
                        {(showAddFriend) ?
                            <span onClick={() => this.setState({ showAddFriend: false })}><i class="fas fa-user-plus"></i> add friend</span> :
                            <span onClick={() => this.setState({ showAddFriend: true })}><i class="fas fa-user-minus"></i>remove friend</span>}
                        <span onClick={() => this.ClickAbout()}> <i class="fas fa-question"></i> About </span>
                    </div>
                    <div className={classes.About}>
                        {(showUserInformation) ?
                            <div className={classes.UserInfo} >
                                <div>
                                    <i class="fas fa-user"></i> : {this.Info.FirstName} {this.props.LastName}
                                </div>
                                <div>
                                    <i class="fas fa-envelope-square"></i> : {this.Info.Email}
                                </div>
                                <div>
                                    <i class="fas fa-phone"></i> : {this.Info.phoneNumber}
                                </div>
                                <div>
                                    <i class="fas fa-birthday-cake"></i> : {this.Info.DateOfBearth}
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