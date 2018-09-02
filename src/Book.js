import React, { Component } from 'react';

class Book extends Component {

  constructor(props) {
    super(props);

    const defaultValue = this.props.bookData.shelf;

    this.state= {
      bookShelf: defaultValue
    }
  }

  /**
  * @description Change Shelf state of a book
  * @param {event} event - Stores new shelf for the book
  * @param {object} bookData - Current book data
  * @return Callback changeCategory function
  */
  onChangeShelf = function(event, bookData) {
    this.setState({
      bookShelf: event.target.value
    }, () => {
      this.props.changeCategory(this.state.bookShelf, bookData);
    });

  }

  render() {
    const { bookData } = this.props;
    const { bookShelf } = this.state;

    // Default author/thumbnail for missing data
    const defaultThumbnail = (bookData.imageLinks) ? bookData.imageLinks.smallThumbnail : 'https://via.placeholder.com/128x192';
    const defaultAuthor = (bookData.imageLinks) ? bookData.authors : '-';

    return(
      <li>
        <div className="book" alt={bookData.title} title={bookData.title}>
          <div className="book-top">
            <div className="book-cover"
              style={{  width: 128,
                        height: 192,
                        backgroundImage: 'url('+ defaultThumbnail +')'
                    }}>
            </div>
            <div className="book-shelf-changer">
              <select onChange={ (event) => this.onChangeShelf(event, bookData) } value={bookShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading" className="category-option">Currently Reading</option>
                <option value="wantToRead" className="category-option">Want to Read</option>
                <option value="read" className="category-option">Read</option>
                <option value="none" className="category-option">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">
            {bookData.title}
          </div>
          <div className="book-authors">
            {defaultAuthor}
          </div>
        </div>
      </li>
    )
  }
}

export default Book;
