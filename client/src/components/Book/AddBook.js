import React from 'react';
import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getAuthorsQuery = gql`
 {
     authors{
         name,
         id
     }
 }
`
const AddBook = (props) =>{
    const displayAuthors = () =>{
        if(props.data.loading)
            return (<option disabled>Loading Authors..</option>);
        else
            return props.data.authors.map(author =>  <option key={author.id}>{author.name}</option> )
    }
    return(
        <div>
            <form className="col-3">
                <div className="form-group">
                    <label for="exampleInputBook Name1">Book Name</label>
                    <input type="text" className="form-control" id="exampleInputBook Name1" aria-describedby="Book NameHelp"/>
                </div>
                <div className="form-group">
                    <label for="exampleInputGenre1">Genre</label>
                    <input type="text" className="form-control" id="exampleInputGenre1"/>
                </div>
                <div class="form-group">
                    <label for="exampleFormControlSelect1">Authors</label>
                    <select class="form-control" id="exampleFormControlSelect1">
                    {displayAuthors()}
                    </select>
                </div>
                <button type="submit" className="btn btn-success">Add Book</button>
            </form>
        </div>
    )
}

export default graphql(getAuthorsQuery)(AddBook);