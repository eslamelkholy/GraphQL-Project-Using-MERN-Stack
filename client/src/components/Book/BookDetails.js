import React from 'react';
import { graphql } from 'react-apollo'
import { getBookQuery } from '../../queries/BookQueries';

const BookDetails = (props) =>{
    const displayBookDetails = () => {
        const { book } = props.data;
        if(book){
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All Books Related to {book.author.name}</p>
                    <ul className="other-books">
                        { book.author.books.map( item => <li key={item.id}>{item.name}</li> )}
                    </ul>
                </div>
            )
        }
        else
            return <div>No Book Selected...</div>
    }
    return(
        <div id="book-details">
            { displayBookDetails() }
        </div>
    )
}
export default graphql(getBookQuery,{
    options:(props) =>{
        return{
            variables:{
                id:props.bookId
            }
        }
    }
})(BookDetails);