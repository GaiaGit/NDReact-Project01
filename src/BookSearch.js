import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookSearch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      bookResults: [],
      query: '',
      dataLoading: false,
      error: false
    }
  }

  searchQuery(query) {
    const term = query.trim();
    this.setState({
      query: term,
      dataLoading: true
    });
    if(term !== "" && term.length > 0) {
      BooksAPI.search(query.trim(), 10).then( results => {

        if(results.error && results.error === "empty query") {
          this.setState({dataLoading: false, error: true, bookResults: []});
        }
        else {
          if(this.state.bookResults !== results && results !== []) {
            console.log(results)
            this.setState({bookResults: results, error: false, dataLoading: false});
          }
        }
      });
    }
  }

  render() {

    const { changeCategory } = this.props;
    let searchContent;

    if(this.state.dataLoading) {
      searchContent = (
        <div className="spinner">
        <div className="rect1"></div>
        <div className="rect2"></div>
        <div className="rect3"></div>
        <div className="rect4"></div>
        <div className="rect5"></div>
        </div>
      );
    } else if(  this.state.query.trim() &&
                typeof this.state.bookResults !== 'undefined' &&
                this.state.dataLoading === false &&
                this.state.bookResults !== [] &&
                this.state.bookResults.length > 0 &&
                this.state.bookResults !== "empty query" && !
                this.state.bookResults.error) {

      searchContent = (
        <ol className="books-grid">
          {
            this.state.bookResults.map(book => {
              return (
                <Book bookData={book} key={book.id} changeCategory={changeCategory} />
              )
            })
          }
        </ol>
      );
    } else {
      searchContent = ( <p>No results</p> );
    }

    return(
          <div className="search-books">
            <div className="search-books-bar">
              <Link to={'/'} className="close-search">Close</Link>
              <div className="search-books-input-wrapper">
                <input  type="text"
                        placeholder="Search by title or author"
                        value={ this.state.query }
                        onChange={ ev => this.searchQuery(ev.target.value) }/>
              </div>
            </div>
            <div className="search-books-results">
              { searchContent }
            </div>
          </div>
    )
  }
}

export default BookSearch;
