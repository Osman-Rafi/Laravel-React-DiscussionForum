import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as axios from "axios";
import {Link} from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";

// including moment js

var moment = require('moment');
moment().format();

class ShowQuestion extends React.Component {

    state = {
        question: [],
        question_id: '',
        answers: [],
        answer: '',
        redirect: false

    }

    componentDidMount() {
        /*console.log(this.props.match.params.id);*/
        axios.get(`http://localhost:8000/ajax/showData/${this.props.match.params.id}`).then(question => {
            /*console.log("Show Data Fetched ...");
            console.log(question.data);*/

            this.setState({
                question: question.data,
                question_id: question.data.id,
                answers: question.data.answers

            });
            /*console.log(this.state);*/
        }).catch(err => {
            console.log(err);
        });
    }

    // fetch all answers

    showAnswers = () => {
        return this.state.question.answers.map((question, index) => {
            /* console.log(question.user.name)*/
            return (
                <div className="card mt-4" key={question.id}>
                    <div className="card-header">
                        Answers
                    </div>


                    <div className="media px-3">

                        <div className="d-flex flex-column answer-vote align-self-start pr-4">
                            <Link className={"upvote"} to={""}>
                                <i className={"fas fa-caret-up fa-3x"} style={{textDecoration: 'none'}}></i>
                            </Link>

                            <span className="votes-count">1230</span>

                            <Link className={"downvote downvoted"} to={""}>
                                <i className={"fas fa-caret-down fa-3x"}></i>
                            </Link>

                            <Link className={"favourite favourited accepted-ans py-2"} to={""}>
                                <i className={"far fa-check-circle fa-2x"}></i>
                            </Link>

                        </div>

                        <div className="media-body">
                            <div className="">
                                <h3 className="card-title">{question.title}</h3>

                                <p className="card-text">
                                    {question.body}
                                </p>

                            </div>
                        </div>
                    </div>


                    <div className="d-flex justify-content-end">
                        <div className="d-flex flex-column ">
                            <div className="">
                                <span className="text-muted">Answered <span
                                    className="font-weight-bold text-dark px-2">{moment(question.created_at).fromNow()}</span></span>
                            </div>
                            <div className="">
                                <img src="/images/avatar-icon" alt=""/>
                                <span className="text-muted"> Answered By
                                    <span className={"font-weight-bold text-dark ml-1 px-2"}>{question.user.name}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    handleChange = (e) => {
        this.setState({
            answer: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let ans = {
            answer: this.state.answer,
            question_id: this.state.question_id
        }

        console.log(ans);
        axios.post('http://localhost:8000/ajax/storeAnswer', ans, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        }).then(response => {
            console.log(response.data);
            axios.get(`http://localhost:8000/ajax/showData/${this.props.match.params.id}`).then(question => {
                console.log("Show Data Fetched ...");
                console.log(question.data);

                this.setState({
                    question: question.data,
                    answers: question.data.answers,
                    answer: ''

                })
                ;
            }).catch(err => {
                console.log(err);
            });


        }).catch(error => {
            console.log(error);
        })

    };

    render() {
        const redirectToReferrer = this.state.redirect;


        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex">
                                    <h2>Question By Jhon Doe</h2>
                                    <div className="ml-auto">
                                        <Link to="/" className={"btn btn-outline-secondary"}>
                                            Back to All Questions
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">

                            </div>
                        </div>

                        <div className="card mt-4">
                            <div className="card-header">
                                Question
                            </div>
                            <div className="card-body">

                                <h3 className="card-title">{this.state.question.title}</h3>
                                <span>
                                    <p className=" text-muted px-1">
                                        Asked <span
                                        className="font-weight-bold text-body">{moment(this.state.question.created_at).fromNow()}</span>
                                        <span className="pl-3">View <span
                                            className={"font-weight-bold"}>{this.state.question.views}</span> times</span>
                                    </p>
                                </span>
                                <hr/>

                                <div className="media">

                                    <div className="d-flex flex-column vote-controls align-self-start pr-4">
                                        <Link className={"upvote"} to={""}>
                                            <i className={"fas fa-caret-up fa-3x"} style={{textDecoration: 'none'}}></i>
                                        </Link>

                                        <span className="votes-count">1230</span>

                                        <Link className={"downvote downvoted"} to={""}>
                                            <i className={"fas fa-caret-down fa-3x"}></i>
                                        </Link>

                                        <Link className={"favourite favourited"} to={""}>
                                            <i className={"fas fa-star fa-2x"}></i>
                                        </Link>

                                        <span className="favourites-count pl-2 pt-1">89</span>
                                    </div>

                                    <div className="media-body">
                                        <p className="">
                                            {this.state.question.body}
                                        </p>
                                    </div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className="col-md-10 mb-5">

                        {/*Show all Answers*/}

                        {this.state.question.answers ?
                            this.showAnswers() : ""
                        }
                    </div>

                    <div className="col-md-10 mb-5">

                        {/*give answer*/}

                        <div className="card">

                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h2>Answer This Question</h2>

                                </div>
                            </div>

                            <div className="card-body">

                                <form onSubmit={this.handleSubmit}>
                                    <input type="hidden" name={"_token"} value={csrf_token}/>


                                    <div className="form-group">
                                        <label htmlFor="question-body">Explain Your Question :</label>
                                        <textarea name={"body"} id={"answer-body"} cols={40} rows={10}
                                                  className={"form-control"} onChange={this.handleChange}
                                                  value={this.state.answer}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <button type={"submit"} className={"btn btn-outline-primary btn-lg"}>
                                            Update Question
                                        </button>
                                    </div>

                                </form>

                            </div>
                        </div>

                    </div>

                </div>
            </div>
        );
    }
}

export default ShowQuestion;

