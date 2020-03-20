import React, {Component} from 'react';

import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class BookList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books : [],
            currentPage : 1,
            booksPerPage : 5
        };
    }

    componentDidMount() {
        this.findAllBooks(this.state.currentPage);
    }

    /*findAllBooks() {
        fetch("http://localhost:8081/rest/books")
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            });
    };*/

    findAllBooks(currentPage) {
        currentPage -= 1;
        axios.get("http://localhost:8081/rest/books?page="+currentPage+"&size="+this.state.booksPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    books: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    /*deleteBook = (bookId) => {
        fetch("http://localhost:8081/rest/books/"+bookId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                });
            } else {
                this.setState({"show":false});
            }
        });
    };*/

    deleteBook = (bookId) => {
        axios.delete("http://localhost:8081/rest/books/"+bookId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        books: this.state.books.filter(book => book.id !== bookId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        this.findAllBooks(targetPage);
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            this.findAllBooks(firstPage);
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            this.findAllBooks(this.state.currentPage - prevPage);
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.booksPerPage);
        if(this.state.currentPage < condition) {
            this.findAllBooks(condition);
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.booksPerPage)) {
            this.findAllBooks(this.state.currentPage + 1);
        }
    };

    render() {
        const {books, currentPage, totalPages} = this.state;

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"Book Deleted Successfully."} type = {"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={faList} /> Book List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                  <th>Title</th>
                                  <th>Author</th>
                                  <th>ISBN Number</th>
                                  <th>Price</th>
                                  <th>Language</th>
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    books.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="6">No Books Available.</td>
                                    </tr> :
                                    books.map((book) => (
                                    <tr key={book.id}>
                                        <td>
                                            <Image src={book.coverPhotoURL} roundedCircle width="25" height="25"/> {book.title}
                                        </td>
                                        <td>{book.author}</td>
                                        <td>{book.isbnNumber}</td>
                                        <td>{book.price}</td>
                                        <td>{book.language}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+book.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteBook.bind(this, book.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {books.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}