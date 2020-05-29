import React, {useState} from 'react';
import { graphql } from 'react-apollo'
import { getBooksQuery } from '../../queries/BookQueries';
import BookDetails  from './BookDetails';
const BookList = (props) =>{
    const [selectedBook, setSelectedBook] = useState(null)
    const displyBooks = () =>{
        const data = props.data;
        if(data.loading)
            return(<div>Loading Books...</div>);
        else
            return data.books.map(book =>{
                return(
                    <li key={book.id}
                        onClick = { e => setSelectedBook(book.id)}
                    >{book.name}</li>
                )
            });
    }
    return(
        <div>
            <ul id="book-list">
                {displyBooks()}
            </ul>
            <BookDetails bookId = {selectedBook} />
        </div>
    )
}

export default graphql(getBooksQuery)(BookList);