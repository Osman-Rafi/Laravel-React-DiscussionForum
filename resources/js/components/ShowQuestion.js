import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as axios from "axios";
import {Link} from "react-router-dom";

// including moment js

var moment = require('moment');
moment().format();

class ShowQuestion extends React.Component {

    state = {
        question: [],
        answers: []

    }

    componentDidMount() {
        /*console.log(this.props.match.params.id);*/
        axios.get(`http://localhost:8000/ajax/showData/${this.props.match.params.id}`).then(question => {
            console.log("Show Data Fetched ...");
            console.log(question.data);

            this.setState({
                question: question.data,
                answers: question.data.answers

            });
        }).catch(err => {
            console.log(err);
        });
    }

    // fetch all answers

    showAnswers = () => {
        return this.state.question.answers.map((question, index) => {
            console.log(question.user.name)
            return (
                <div className="card mt-4" key={question.id}>
                    <div className="card-header">
                        Answers
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{question.title}</h3>
                        <span>
                            <p className=" text-muted px-1">
                                Answered <span
                                className="font-weight-bold text-body">{moment(question.created_at).fromNow()}</span>
                            </p>
                        </span>
                        <p className="card-text">
                            {question.body}
                        </p>

                    </div>
                    <div className="d-flex justify-content-end">
                        <div className="d-flex flex-column ">
                            <div className="">
                                <span className="text-muted">Answered <span className="font-weight-bold text-dark">{moment(question.created_at).fromNow()}</span></span>
                            </div>
                            <div className="">
                                <img src="/images/avatar-icon" alt=""/>
                                <span className="text-muted"> Asked By
                                    <span className={"font-weight-bold text-dark ml-1"}>{question.user.name}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        })
    }

    render() {

        //console.log(this.state.answers[0]);
        //const { user } = this.state.answers[0];
        //console.log(user);
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
                                <p className="card-text">
                                    {this.state.question.body}
                                </p>


                            </div>
                        </div>
                    </div>

                    <div className="col-md-10 mb-5">

                        {/*Show all Answers*/}

                        {this.state.question.answers ?
                            this.showAnswers() : ""
                        }
                    </div>

                </div>
            </div>
        );
    }
}

export default ShowQuestion;

