import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { bookData, changeCategory } = this.props;
    
    if(!bookData.shelf) {
      bookData.shelf = "none";
    }

    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover"
              style={{  width: 128,
                        height: 192,
                        backgroundImage: 'url('+ bookData.imageLinks.smallThumbnail +')'
                    }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={ (event) => changeCategory(event, bookData) } value={bookData.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" className="category-option" disabled={bookData.shelf === 'currentlyReading'}>Currently Reading</option>
                <option value="wantToRead" className="category-option" disabled={bookData.shelf === 'wantToRead'}>Want to Read</option>
                <option value="read" className="category-option" disabled={bookData.shelf === 'read'}>Read</option>
                <option value="none" className="category-option" disabled={bookData.shelf === 'none'}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookData.title}</div>
          <div className="book-authors">
            <ul className="author-list">{ bookData.authors.map( author => {
              return(
                <li key={author}>{author}</li>
              )
            } ) }</ul>
          </div>
        </div>
      </li>
    )
  }
}

export default Book;
