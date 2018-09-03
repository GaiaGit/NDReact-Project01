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

  /**
  * @description Control input search
  * @param {boolean} dataLoading - Search in progress
  * @return Autofocus the input element after every search
  * TODO: Improve by adding Autosuggest function
  */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.dataLoading !== this.state.dataLoading) {
      document.querySelector('#inputSearch').focus();
    }
  }

  /**
  * @description API connection to get results based on query text
  * @param {string} query - Input text to search
  * @return Update bookResults state if valid data returned by API
  */
  searchQuery(query) {
    this.setState({
      query: query,
      dataLoading: true
    });

    if(query !== "") {
      // New variable with query.trim is necessary in API REQUESTS
      // to solve problems with extra white spaces (ie "  Biography " = No results)
      // Allows multiple words (ie "Artificial Intelligence")
      const cleanQuery = query.trim();
      if(cleanQuery === ""){
        this.setState({dataLoading: false});
      }
      else {
        BooksAPI.search(cleanQuery, 20).then( results => {

          if(results.error && results.error === "empty query") {
            this.setState({dataLoading: false, error: true, bookResults: []});
          }
          else {
            if(this.state.bookResults !== results && results !== []) {
              results.map(res => res.shelf = this.props.checkShelf(res.id));
              this.setState({bookResults: results, error: false, dataLoading: false});
            }
          }
        });
      }
    }
  }

  render() {

    const { changeCategory } = this.props;

    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={'/'} className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input  type="text"
                    placeholder="Search by title or author"
                    value={ this.state.query }
                    onChange={ ev => this.searchQuery(ev.target.value) }
                    disabled={this.state.dataLoading === true && this.state.query !== ""}
                    autoFocus
                    id="inputSearch" />
          </div>
        </div>
        <div className="search-books-results">
        <ol className="books-grid">
          {
            // Ensure valid search results
            // Checking up 'knowledge.udacity.com' was necessary to get
            // support to solve a problem with 'unhandled rejection error'
            // and some issues with the response terms
            ( this.state.query.trim() &&
              typeof this.state.bookResults !== 'undefined' &&
              this.state.dataLoading === false &&
              this.state.bookResults !== [] &&
              this.state.bookResults.length > 0 &&
              this.state.bookResults !== "empty query" &&
              !this.state.bookResults.error)
            ?
              this.state.bookResults.map(book => {
                return (
                  <Book bookData={book} key={book.id} changeCategory={changeCategory} />
                )
              })
            : "No results"
          }
        </ol>
      </div>
    </div>
    )
  }
}

export default BookSearch;
