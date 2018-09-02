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
        category: "currentlyReading",
        icon: "fa-book-open"
      },{
        id: 1,
        text: "Want to Read",
        category: "wantToRead",
        icon: "fa-bookmark"
      },{
        id: 2,
        text: "Read",
        category: "read",
        icon: "fa-book"
      }
    ];
  }

  componentDidMount() {
    this.setState({dataLoading: true});
    BooksAPI.getAll().then( books => {
      this.setState({
        bookList: books,
        dataLoading: false
      })
    });
  }

  changeCategory = (event, bookData) => {
    const index = this.state.bookList.findIndex(book => book.id === bookData.id);
    const newBookList = this.state.bookList.slice()
    newBookList[index].shelf = event.target.value

    BooksAPI.update(bookData, event.target.value).then( books => {
      this.setState({
        bookList: newBookList
      })
    });
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
            <BookCollection bookShelves={this.bookShelves} bookList={this.state.bookList} dataLoading={this.state.dataLoading} changeCategory={this.changeCategory} />
          )} />
          <Route path="/search" render={() => (
            <BookSearch bookList={this.state.bookList} changeCategory={this.changeCategory} />
          )} />
        </div>
      )
    }
  }
}

export default BooksApp
