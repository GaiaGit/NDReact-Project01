import React, { Component } from 'react';

class Book extends Component {
  render() {
    const { bookData, changeCategory } = this.props;

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
                <option value="currentlyReading" className="category-option" disabled={bookData.shelf === 'currentlyReading'} onClick={ () => changeCategory(bookData, 'currentlyReading') }>Currently Reading</option>
                <option value="wantToRead" className="category-option" disabled={bookData.shelf === 'wantToRead'} onClick={ () => changeCategory(bookData, 'wantToRead') }>Want to Read</option>
                <option value="read" className="category-option" disabled={bookData.shelf === 'read'} onClick={ () => changeCategory(bookData, 'read') }>Read</option>
                <option value="none" className="category-option" disabled={bookData.shelf == null}>None</option>
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
