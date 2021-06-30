import React, { Component } from 'react';
import Class from './Post.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';
// import {Modal} from 'react-bootstrap'
// const postStructure=new RegExp(/^[a-zA-Z ]*[a-zA-Z0-9]+[a-zA-Z ]*[\n]*[a-zA-Z0-9]*/)
//[\u0600-\u06ff]+|[\u0750-\u077f]+|[\ufb50-\ufc3f]+|[\ufe70-\ufefc]
const postStructure = new RegExp(/(^([\W]*[\w])+|^([\W]*([\u0600-\u06ff]+|[\u0750-\u077f]+|[\ufb50-\ufc3f]+|[\ufe70-\ufefc]+))[\W]*)/)
// const commentStructure=new RegExp(/^[a-zA-Z ]*[a-zA-Z0-9]+[a-zA-Z ]*[\n]*[a-zA-Z0-9]*/)
const commentStructure = new RegExp(/(^([\W]*[\w])+|^([\W]*([\u0600-\u06ff]+|[\u0750-\u077f]+|[\ufb50-\ufc3f]+|[\ufe70-\ufefc]+))[\W]*)/)
class Post extends Component {
    constructor() {
        super()
        this.state = {
            mockPosts: [
                {
                    FirstName: 'Ahmed',
                    LastName: 'Dyack',
                    showLikeUnlike: true,
                    newComment: [],
                    numOfLikes: 0,
                    numOfComment: 0,
                    postContent: "I am Ahmed",
                    showShareBox: false,
                    showComments: false,
                    Like: "Like"
                },
                {
                    FirstName: 'Mohammed',
                    LastName: 'Nsour',
                    showLikeUnlike: true,
                    newComment: [],
                    numOfLikes: 0,
                    numOfComment: 0,
                    postContent: "I am Nsour",
                    showShareBox: false,
                    showComments: false,
                    Like: "Like"
                },
            ],
            newPost: [],
            postContent: null,
            commentContent: null,
            showEditDelete: false,
            showEditField: false,
            updatedPost: null,
            updatedComment: null,
            numOfLikes: 0,
            numOfComment: 0,
            showComments: false,
            commentMockContent: null,
            updatedMockComment: null
        }
    }
    onClickEditPostDots = (index) => {
        let p = Object.assign([], this.state.newPost)
        if (this.state.newPost[index].showEditDelete === false) {
            p[index].showEditDelete = true
            this.setState({ newPost: p })
            console.log("rrrrrrrr")
        }
        else {
            p[index].showEditDelete = false
            p[index].showEditField = false
            this.setState({ newPost: p })
        }
    }
    onClickEditPost = (index) => {

        let p = Object.assign([], this.state.newPost)
        if (this.state.newPost[index].showEditField === false && this.state.currentUser) {
            p[index].showEditField = true
            this.setState({ newPost: p })
            console.log("the edit ", this.state.newPost[index].showEditField)
        }
        else {
            p[index].showEditField = false
            this.setState({ newPost: p })
        }
    }
    onClickPost = () => {

        if (this.state.postContent !== '' && this.state.postContent !== null
            && postStructure.test(this.state.postContent)
        ) {
            this.setState({
                newPost: [({
                    newComment: [],
                    numOfLikes: 0,
                    numOfComment: 0,
                    postContent: this.state.postContent,
                    showEditDelete: this.state.showEditDelete,
                    showEditField: this.state.showEditField,
                    showComments: this.state.showComments,
                    Like: "Like",
                    showLikeUnlike: true
                }), ...this.state.newPost]
            })

        }

    }
    onClickSaveEdit = (index) => {
        if (this.state.updatedPost !== null && postStructure.test(this.state.updatedPost)) {
            let p = Object.assign([], this.state.newPost)
            p[index].postContent = this.state.updatedPost
            p[index].showEditField = false
            this.setState({ newPost: p })
        }
    }
    deletePost = (index) => {
        let p = Object.assign([], this.state.newPost)
        p.splice(index, 1)

        this.setState({ newPost: p })
        console.log(this.state.newPost)
    }
    onChangeComment = (e) => {
        let comment = e.target.value
        this.setState({ commentContent: comment })
    }
    onClickComment = (index) => {
        if (this.state.commentContent !== null && commentStructure.test(this.state.commentContent)) {

            let p = Object.assign([], this.state.newPost)
            p[index].newComment = ([...p[index].newComment,
            {
                comment: this.state.commentContent,
                showEditDeleteComment: false,
                showEditFeild: false,
            }])
            p[index].numOfComment += 1
            this.setState({ newPost: p })
            console.log(p[index].newComment)
        }
    }
    showComments = (index) => {
        let p = Object.assign([], this.state.newPost)
        if (this.state.newPost[index].showComments === false) {
            p[index].showComments = true
            this.setState({ newPost: p })
        }
        else {
            p[index].showComments = false
            this.setState({ newPost: p })
        }
    }
    increaseLikes = (index) => {
        let p = Object.assign([], this.state.newPost)
        if (p[index].showLikeUnlike) {
            p[index].numOfLikes += 1
            p[index].Like = "Unlike"
            p[index].showLikeUnlike = false
            this.setState({ newPost: p })
        }
    }
    decreaseLikes = (index) => {
        let p = Object.assign([], this.state.newPost)
        if (!p[index].showLikeUnlike) {
            p[index].numOfLikes -= 1
            p[index].Like = "like"
            p[index].showLikeUnlike = true
            this.setState({ newPost: p })
        }
    }
    onClickCommentDots = (index, pos) => {
        let p = Object.assign([], this.state.newPost)
        if (p[index].newComment[pos].showEditDeleteComment === false) {
            p[index].newComment[pos].showEditDeleteComment = true
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newPost: p })
        }
        else if (p[index].newComment[pos].showEditDeleteComment === true) {
            p[index].newComment[pos].showEditDeleteComment = false;
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newPost: p })
        }

    }
    onClickDeleteComment = (index, pos) => {
        let p = Object.assign([], this.state.newPost)
        p[index].newComment.splice(pos, 1)
        p[index].numOfComment -= 1
        this.setState({ newPost: p })
    }
    onClickEditComment = (index, pos) => {
        let p = Object.assign([], this.state.newPost)
        if (p[index].newComment[pos].showEditFeild === false) {
            p[index].newComment[pos].showEditFeild = true
            this.setState({ newPost: p })
        }
        else if (p[index].newComment[pos].showEditFeild === true) {
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newPost: p })
        }
    }
    onClickSaveEditComment = (index, pos) => {
        if (commentStructure.test(this.state.updatedComment) && this.state.commentContent !== null) {
            let p = Object.assign([], this.state.newPost)
            p[index].newComment[pos].comment = this.state.updatedComment
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newPost: p })
        }
    }
    increaseMockLikes = (index) => {
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].showLikeUnlike === true) {
            p[index].numOfLikes += 1
            p[index].Like = "Unlike"
            p[index].showLikeUnlike = false
            console.log(p[index].numOfLikes)
            this.setState({ mockPosts: p })
        }

    }
    decreaseMockLikes = (index) => {
        let p = Object.assign([], this.state.mockPosts)
        if (!p[index].showLikeUnlike) {
            p[index].numOfLikes -= 1
            p[index].Like = "like"
            p[index].showLikeUnlike = true
            console.log(p[index].numOfLikes)
            this.setState({ mockPosts: p })
        }
    }
    showMockComments = (index) => {
        let p = Object.assign([], this.state.mockPosts)
        if (this.state.mockPosts[index].showComments === false) {
            p[index].showComments = true
            this.setState({ mockPosts: p })
        }
        else {
            p[index].showComments = false
            this.setState({ mockPosts: p })
        }

    }
    onClickCommentMock = (index) => {
        if (this.state.commentMockContent !== null && commentStructure.test(this.state.commentMockContent)) {

            let p = Object.assign([], this.state.mockPosts)
            p[index].newComment = [...p[index].newComment,
            {
                comment: this.state.commentMockContent,
                showEditDeleteComment: false,
                showEditFeild: false,
                showShareBox: false
            }]
            p[index].numOfComment += 1
            this.setState({ mockPosts: p })
            console.log(p[index].newComment)
        }

    }
    onClickMockCommentDots = (index, pos) => {
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].newComment[pos].showEditDeleteComment === false) {
            p[index].newComment[pos].showEditDeleteComment = true
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newComment: p })
        }
        else if (p[index].newComment[pos].showEditDeleteComment === true) {
            p[index].newComment[pos].showEditDeleteComment = false;
            p[index].newComment[pos].showEditFeild = false
            this.setState({ newPost: p })
        }
    }
    onClickMockDeleteComment = (index, pos) => {
        let p = Object.assign([], this.state.mockPosts)
        p[index].newComment.splice(pos, 1)
        p[index].numOfComment -= 1
        this.setState({ mockPosts: p })
    }
    onClickMockEditComment = (index, pos) => {
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].newComment[pos].showEditFeild === false) {
            p[index].newComment[pos].showEditFeild = true
            this.setState({ mockPosts: p })
        }
        else if (p[index].newComment[pos].showEditFeild === true) {
            p[index].newComment[pos].showEditFeild = false
            this.setState({ mockPosts: p })
        }
    }
    onClickSaveMockEditComment = (index, pos) => {
        if (commentStructure.test(this.state.updatedMockComment) && this.state.commentMockContent !== null) {
            let p = Object.assign([], this.state.mockPosts)
            p[index].newComment[pos].comment = this.state.updatedMockComment
            p[index].newComment[pos].showEditFeild = false
            this.setState({ mockPosts: p })
        }
    }
    clickShare = (index) => {
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].showShareBox === false) {
            p[index].showShareBox = true
            this.setState({ mockPosts: p })
        }
    }
    closeShare = (index) => {
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].showShareBox === true) {
            p[index].showShareBox = false
            this.setState({ mockPosts: p })
        }
    }
    sharePost = (item, index) => {
        this.setState({
            newPost: [{
                newComment: item.newComment,
                numOfLikes: item.numOfLikes,
                numOfComment: item.numOfComment,
                postContent: item.FirstName + ' ' + item.LastName + '\'s post' + '\n' + item.postContent,
                showEditDelete: this.state.showEditDelete,
                showEditField: this.state.showEditField,
                showComments: this.state.showComments,
                Like: "Like",
                showLikeUnlike: true
            }, ...this.state.newPost]
        })
        let p = Object.assign([], this.state.mockPosts)
        if (p[index].showShareBox === true) {
            p[index].showShareBox = false
            this.setState({ mockPosts: p })
        }
    }

    render() {
        const { newPost, mockPosts } = this.state
        return (
            <main className={Class.Main} >
                <div className={Class.MiddleSection} >
                    <div className={Class.PostContainer} >
                        <div className={Class.PostBox}>
                            <img src="profilePic.png" alt="ProfilePicture" className={Class.Images} />
                            <textarea type="text" className={Class.Input} placeholder=" Write a Post"
                                onChange={(e) => this.setState({ postContent: e.target.value })}/*onFocus={this.FoucusPostField} */>
                            </textarea>
                        </div>
                        <div className={Class.Attach}>
                            <input type="submit" value="Post" className={Class.PostButton}
                                onClick={() => this.onClickPost()}/*onFocus={this.Foucus} */ />
                        </div>

                    </div>

                    <div className={Class.PostStructure}>
                        {
                            newPost.map((item, index) => {
                                return (
                                    <div className={Class.CreatedPost} >
                                        <div className={Class.HeaderOfPost}>
                                            <div className={Class.PostCreator}>
                                                <img src="profilePic.png" alt="ProfilePicture"
                                                    className={Class.Images} />
                                                <div>{this.props.FirstName} {this.props.LastName}</div>

                                            </div>
                                            <i class="fas fa-ellipsis-h" onClick={() => this.onClickEditPostDots(index)}></i>
                                        </div>
                                        <div className={Class.PostText}>
                                            <p>{item.postContent}</p>
                                        </div>
                                        <div className={Class.numberOfLikesAndComment}>
                                            <span>{item.numOfLikes} Likes</span>
                                            <span>{item.numOfComment} Comments</span>

                                        </div>
                                        <div className={Class.LikeAndComment}>
                                            {(item.showLikeUnlike) ?
                                                <i class="fas fa-thumbs-up" onClick={() => this.increaseLikes(index)}>{item.Like}</i> :
                                                <i class="fas fa-thumbs-up" onClick={() => this.decreaseLikes(index)}>{item.Like}</i>
                                            }

                                            <i class="fas fa-comments" onClick={() => this.showComments(index)}>  Comments</i>
                                        </div>
                                        {(item.showComments && item.commentContent !== "" && item.newComment !== []) ?
                                            <div className={Class.listOfComments} key={index}>
                                                {

                                                    item.newComment.map((value, pos) => {
                                                        return <div key={pos}>
                                                            <div className={Class.Comments}>
                                                                <div className={Class.headerOfcomment}>
                                                                    <div className={Class.commenter}>
                                                                        <img src="profilePic.png" alt="ProfilePicture" />
                                                                        <span > {this.props.FirstName} {this.props.LastName}</span>
                                                                    </div>
                                                                    <i class="fas fa-ellipsis-h" onClick={() => this.onClickCommentDots(index, pos)}></i>
                                                                </div>
                                                                <div>
                                                                    <div>{value.comment}</div>
                                                                    {(value.showEditDeleteComment) ?
                                                                        <div className={Class.EditDeleteComment}>
                                                                            <button onClick={() => this.onClickDeleteComment(index, pos)} className={Class.EditDeleteButtons}>Delete</button>
                                                                            <button className={Class.EditDeleteButtons} onClick={() => this.onClickEditComment(index, pos)}>Edit</button>
                                                                        </div> : null}
                                                                </div>
                                                            </div>
                                                            {(value.showEditFeild) ?
                                                                <div className={Class.EditCommentField}>
                                                                    <textarea className={Class.EditPostandCommentField}
                                                                        placeholder="Edit Your Comment"
                                                                        //onFocus={this.FoucusCommentField}
                                                                        onChange={(e) => this.setState({ updatedComment: e.target.value })}>
                                                                    </textarea>
                                                                    <input type="submit" value="save" className={Class.PostButton}
                                                                        onClick={() => this.onClickSaveEditComment(index, pos)} />
                                                                </div> : null}
                                                        </div>
                                                    })
                                                }
                                                <div className={Class.CommentSection}>
                                                    <img src="profilePic.png" alt="ProfilePicture"
                                                        className={Class.Images} />
                                                    <textarea className={Class.Input} placeholder=" Write a Comment"
                                                        onChange={(e) => this.setState({ commentContent: e.target.value })}
                                                    // onFocus={this.FoucusCommentField}
                                                    ></textarea>
                                                    <button className={Class.CommentButton}
                                                        onClick={() => this.onClickComment(index)} key={index}>Comment
                                                    </button>
                                                </div>
                                            </div> : null}
                                        <hr />

                                        {(item.showEditDelete) ?
                                            <div className={Class.EditDelete}>
                                                <button
                                                    onClick={() => this.deletePost(index)}
                                                    className={Class.EditDeleteButtons}>Delete
                                                </button>
                                                <button className={Class.EditDeleteButtons} onClick={() => this.onClickEditPost(index)}>
                                                    Edit
                                                </button>
                                            </div> : null}
                                        {(item.showEditField) ?
                                            <p>
                                                <textarea className={Class.EditPostandCommentField}
                                                    placeholder="Edit Your Post"
                                                    // onFocus={this.FoucusPostField}
                                                    onChange={(e) => this.setState({ updatedPost: e.target.value })} >
                                                </textarea>
                                                <input type="submit" value="save" className={Class.PostButton}
                                                    onClick={() => this.onClickSaveEdit(index)} />
                                            </p> : null}
                                    </div>
                                )
                            })

                        }
                        {/********* {Mock Posts} ***********/}
                        {
                            mockPosts.map((item, index) => {
                                return <div className={Class.CreatedPost} >
                                    <div className={Class.HeaderOfPost}>
                                        <div className={Class.PostCreator}>
                                            <img src="profilePic.png" alt="ProfilePicture"
                                                className={Class.Images} />
                                            <div>{item.FirstName} {item.LastName}</div>

                                        </div>
                                    </div>
                                    <div className={Class.PostText}>
                                        {item.postContent}
                                    </div>
                                    <div className={Class.numberOfLikesAndComment}>
                                        <span>{item.numOfLikes} Likes</span>
                                        <span>{item.numOfComment} Comments</span>

                                    </div>
                                    <div className={Class.LikeAndComment}>
                                        {(item.showLikeUnlike) ?
                                            <i class="fas fa-thumbs-up" onClick={() => this.increaseMockLikes(index)}>{item.Like}</i> :
                                            <i class="fas fa-thumbs-up" onClick={() => this.decreaseMockLikes(index)}>{item.Like}</i>
                                        }
                                        <i class="fas fa-comments" onClick={() => this.showMockComments(index)}>  Comments</i>
                                        <i class="fas fa-share" onClick={() => this.clickShare(index)}> share</i>
                                    </div>

                                    {(item.showComments) ?
                                        <div className={Class.listOfComments} key={index}>
                                            {

                                                item.newComment.map((value, pos) => {
                                                    return <div key={pos}>
                                                        <div className={Class.Comments}>
                                                            <div className={Class.headerOfcomment}>
                                                                <div className={Class.commenter}>
                                                                    <img src="profilePic.png" alt="ProfilePicture" />
                                                                    <span > {this.props.FirstName} {this.props.LastName}</span>
                                                                </div>
                                                                <i class="fas fa-ellipsis-h" onClick={() => this.onClickMockCommentDots(index, pos)}></i>
                                                            </div>
                                                            <div>
                                                                <div>{value.comment}</div>
                                                                {(value.showEditDeleteComment) ?
                                                                    <div className={Class.EditDeleteComment}>
                                                                        <button onClick={() => this.onClickMockDeleteComment(index, pos)} className={Class.EditDeleteButtons}>Delete</button>
                                                                        <button className={Class.EditDeleteButtons} onClick={() => this.onClickMockEditComment(index, pos)}>Edit</button>
                                                                    </div> : null}
                                                            </div>

                                                        </div>
                                                        {(value.showEditFeild) ?
                                                            <div className={Class.EditCommentField}>
                                                                <textarea className={Class.EditPostandCommentField}
                                                                    placeholder="Edit Your Comment"
                                                                    //onFocus={this.FoucusCommentField}
                                                                    onChange={(e) => this.setState({ updatedMockComment: e.target.value })}>
                                                                </textarea>
                                                                <input type="submit" value="save" className={Class.PostButton}
                                                                    onClick={() => this.onClickSaveMockEditComment(index, pos)} />
                                                            </div> : null}
                                                    </div>
                                                })
                                            }
                                            <div className={Class.CommentSection}>
                                                <img src="profilePic.png" alt="ProfilePicture"
                                                    className={Class.Images} />
                                                <textarea className={Class.Input} placeholder=" Write a Comment"
                                                    onChange={(e) => this.setState({ commentMockContent: e.target.value })}
                                                // onFocus={this.FoucusCommentField}
                                                ></textarea>
                                                <button className={Class.CommentButton}
                                                    onClick={() => this.onClickCommentMock(index)} key={index}>Comment
                                                </button>
                                            </div>
                                        </div> : null}
                                    {(item.showShareBox) ?
                                        <div className={Class.shareBox}>
                                            <p>
                                                <p>share {item.FirstName} {item.LastName}'s post</p>
                                            </p>
                                            <p className={Class.Buttons}>
                                                <button onClick={() => this.sharePost(item, index)}>Share</button>
                                                <button onClick={() => this.closeShare(index)}>Cancel</button>

                                            </p>
                                        </div>
                                        : null}
                                </div>
                            })
                        }
                    </div>


                </div>
            </main>
        )
    }
}
export default Post