import React from 'react';
import ReactDom from 'react-dom';
import {withRouter, Link} from 'react-router-dom';
import * as axios from "axios";


// including moment js

var moment = require('moment');
moment().format();


class Index extends React.Component {

    state = {
        questions: [],
        answers: []
    };

    componentDidMount() {
        axios.get("http://localhost:8000/ajax/getData").then(question => {
            /*console.log("Data Fetched ...");
            console.log(question.data);*/

            this.setState({
                questions: question.data,
                answers: question.data
            });
            /*console.log(this.state);*/
        }).catch(err => {
            console.log(err);
        });
    }

    /*delete quetion*/

    handleDelete = (e) => {

        /*e.preventDefault();*/
        /*console.log(e);*/

        axios.delete(`http://localhost:8000/ajax/deleteData/${e}`, {
            headers: {
                'X-CSRF-TOKEN': csrf_token
            }
        }).then(question => {
            /*console.log("Edit Data Fetched ...");

            console.log(question.data);*/
            axios.get("http://localhost:8000/ajax/getData").then(question => {
                /*console.log("Data Fetched ...");*/
                /*console.log(question.data);*/

                this.setState({questions: question.data});
            }).catch(err => {
                console.log(err);
            });

        }).catch(err => {
            console.log(err);
        });
    }


    /*catch all questions*/

    showQuestions = () => {
        return this.state.questions.map(question => {
            return (
                <div className="media" key={question.id}>
                    <div className="d-flex flex-column counters">

                        <div className="vote">
                            <strong>{question.votes} votes</strong>
                        </div>


                        <div
                            className={"status " + (question.answers > 0 ? question.best_answer ? "answered-accepted" : "answered" : "unanswered")}>
                            {question.answers}
                            <span className="answer pl-1">answers</span>
                        </div>


                        <div className="view font-weight-bold">
                            {question.views} <span className="view">views</span>
                        </div>
                    </div>
                    <div className="media-body">
                        <div className="d-flex align-items-center">
                            <Link to={`/show-question/${question.id}`} className={"mt-0"}>
                                <h3>{question.title}</h3>
                            </Link>
                            <div className="ml-auto">
                                <div className="d-flex flex-column">
                                    <Link to={`/edit-question/${question.id}`}
                                          className={"btn btn-sm btn-outline-info my-3"}>
                                        Edit
                                    </Link>

                                    <button onClick={() => this.handleDelete(question.id)}
                                            className={"btn btn-sm btn-outline-danger"}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                        <p className="lead">
                            Asked By
                            <a href="{question.user.url}" className={"px-2"}>{question.user.name}</a>
                            <small className="text-muted px-1">{moment(question.created_at).fromNow()}</small>
                        </p>
                        <p className="small">{question.body.substring(0, 250) + '...'}</p>
                        <hr/>
                    </div>
                </div>
            );
        });
    }

    /*show all answers*/


    render() {

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h2>All Question</h2>
                                    <div className="ml-auto">
                                        <Link to="/create-question" className={"btn btn-outline-secondary"}>Ask
                                            Question
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                {this.showQuestions()}

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}


export default Index;
