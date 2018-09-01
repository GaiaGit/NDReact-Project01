import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookCollection from './BookCollection'
import BookSearch from './BookSearch'

class BooksApp extends Component {

  constructor(props){
    super(props);

    this.state = {
      dataLoading: false,
      bookList: []
    };

    this.bookShelves = [
      {
        id: 0,
        text: "Currently Reading",
        category: "currentlyReading"
      },{
        id: 1,
        text: "Want to Read",
        category: "wantToRead"
      },{
        id: 2,
        text: "Read",
        category: "read"
      }
    ];
  }

  componentDidMount() {
    this.setState({dataLoading: true});
    BooksAPI.getAll().then( books =>
      this.setState({
        books,
        dataLoading: false
      })
    );
  }

  render() {

    if(this.state.dataLoading) {
      return(
        <div className="list-books">
          <div className="list-books-title">
            <h1>Loading...</h1>
          </div>
          <div className="spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div>
          <Route exact path="/" render={() => (
            <BookCollection bookShelves={this.bookShelves} bookList={this.state.bookList} dataLoading={this.state.dataLoading} />
          )} />
          <Route path="/search" render={() => (
            <BookSearch bookList={this.state.bookList} />
          )} />
        </div>
      )
    }
  }
}

export default BooksApp
