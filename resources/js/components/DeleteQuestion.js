import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as axios from "axios";


class DeleteQuestion extends React.Component {


    state = {
        redirect: false
    }

    handleDelete = (e) => {

        /*e.preventDefault();*/
        console.log("success noy");

        axios.delete(
            `http://localhost:8000/ajax/deleteData/${this.props.match.params.id}`,
            {
                headers: {
                    'X-CSRF-TOKEN': csrf_token
                },
                data: {
                    data: data
                }
            }
        ).then(response => {
            console.log(response);
            this.setState({redirect: true});
        }).then(error => {
            console.log(error);
        });
    }

    render() {

        const redirectToReferrer = this.state.redirect;
        if (redirectToReferrer === true) {
            return <Redirect to="/"/>
        }


    }
}

export default DeleteQuestion;
