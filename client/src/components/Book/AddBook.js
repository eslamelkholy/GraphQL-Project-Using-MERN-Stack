import React, { useState } from "react";
import { graphql } from "react-apollo";
import { getAuthorsQuery } from "../../queries/AuthorQueries";
import { addBookMutation, getBooksQuery} from '../../queries/BookQueries';
import { useMutation } from '@apollo/react-hooks';
import { compose } from 'recompose'
const AddBook = (props) => {
  const [book, setBook] = useState({ name: "", genre: "", authorId: "" });
  const [addBookMut, { dataMutation }] = useMutation(addBookMutation);
  const onChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };
  const displayAuthors = () => {
    let data = props.getAuthorsQuery;
    if (data.loading) return <option disabled>Loading Authors..</option>;
    else
      return data.authors.map((author) => (
        <option value={author.id} key={author.id}>{author.name}</option>
      ));
  };
  const formSubmit = (e) =>{
    e.preventDefault();
    addBookMut({
        variables: {
            name:book.name,
            genre: book.genre,
            authorId: book.authorId
        },
        refetchQueries:[{query: getBooksQuery}],
    })
  }
  return (
    <div>
      <form className="col-3">
        <div className="form-group">
          <label for="exampleInputBook Name1">Book Name</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputBook Name1"
            aria-describedby="Book NameHelp"
            onChange={onChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label for="exampleInputGenre1">Genre</label>
          <input
            type="text"
            className="form-control"
            id="exampleInputGenre1"
            onChange={onChange}
            name="genre"
          />
        </div>
        <div className="form-group">
          <label for="exampleFormControlSelect1">Authors</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={onChange}
            name="authorId"
          >
          <option>Select Author</option>
            {displayAuthors()}
          </select>
        </div>
        <button type="submit" className="btn btn-success" onClick={formSubmit}>
          Add Book
        </button>
      </form>
    </div>
  );
};

export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"})
)(AddBook);
