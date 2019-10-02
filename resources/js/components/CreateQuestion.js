import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Link} from "react-router-dom";
import * as axios from "axios";
import { Redirect } from 'react-router';

class CreateQuestion extends React.Component {

    state = {
        title: '',
        body: '',
        redirect: false
    }

    handleNameChange = (e) => {
        this.setState({
            title: e.target.value
        });

    }

    handleBodyChange = (e) => {
        this.setState({
            body: e.target.value
        });
    }
    renderRedirect = () => {
        // if (this.state.redirect) {
        //     return <Redirect to='/' />
        // }
        console.log("works !")
    }

    handleSubmit = (e) => {
        e.preventDefault();

        let newObj = {

            title: this.state.title,
            body: this.state.body

        };

        axios.post('http://localhost:8000/ajax/storeData', newObj, {
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                }
            }
        ).then(response => {
            console.log(response);
            this.setState({redirect: true});
            this.renderRedirect();
        }).then(error => {
            console.log(error);
        });


    }


    render() {

        const redirectToReferrer = this.state.redirect;
        if (redirectToReferrer === true) {
            return <Redirect to="/"/>
        }

        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex align-items-center">
                                    <h2>Ask Question</h2>
                                    <div className="ml-auto">
                                        <Link to="/" className={"btn btn-outline-secondary"}>
                                            Back to All Questions
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body">

                                <form onSubmit={this.handleSubmit}>
                                    <input type="hidden" name={"_token"} value={csrf_token}/>

                                    <div className="form-group">
                                        <label htmlFor="question-title">Question Title :</label>
                                        <input type="text" name={"title"} id={"question-title"}
                                               className={"form-control"} onChange={this.handleNameChange}
                                               value={this.state.title}/>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="question-body">Explain Your Question :</label>
                                        <textarea name={"body"} id={"question-body"} cols={40} rows={10}
                                                  className={"form-control"} onChange={this.handleBodyChange}
                                                  value={this.state.body}></textarea>
                                    </div>

                                    <div className="form-group">
                                        <button type={"submit"} className={"btn btn-outline-primary btn-lg"}>Ask
                                            This Question
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

export default CreateQuestion;
