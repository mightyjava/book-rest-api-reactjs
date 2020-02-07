import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Book extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.bookChange = this.bookChange.bind(this);
        this.submitBook = this.submitBook.bind(this);
    }

    initialState = {
        title:'', author:'', coverPhotoURL:'', isbnNumber:'', price:'', language:''
    }

    resetBook = () => {
        this.setState(() => this.initialState);
    }

    submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language
        };

        axios.post("http://localhost:8081/rest/books", book)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    }

    bookChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        const {title, author, coverPhotoURL, isbnNumber, price, language} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast children = {{show:this.state.show, message:"Book Saved Successfully.", type:"success"}}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faPlusSquare} /> Add New Book
                    </Card.Header>
                    <Form onReset={this.resetBook} onSubmit={this.submitBook} id="bookFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="title"
                                        value={title} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book Title" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridAuthor">
                                    <Form.Label>Author</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="author"
                                        value={author} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book Author" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCoverPhotoURL">
                                    <Form.Label>Cover Photo URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="coverPhotoURL"
                                        value={coverPhotoURL} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book Cover Photo URL" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridISBNNumber">
                                    <Form.Label>ISBN Number</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="isbnNumber"
                                        value={isbnNumber} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book ISBN Number" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="price"
                                        value={price} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book Price" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridLanguage">
                                    <Form.Label>Language</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="language"
                                        value={language} onChange={this.bookChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Book Language" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} /> Submit
                            </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
    }
}