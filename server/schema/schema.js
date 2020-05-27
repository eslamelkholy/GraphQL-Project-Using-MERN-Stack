const graphql = require("graphql");
const _ = require("lodash");
const Book = require("../Models/book");
const Author = require("../Models/author");

const { GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList,
        GraphQLNonNull,
    } = graphql;

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        genre: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return Author.findById(parent.authorId)
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        age: {type: GraphQLInt},
        books: {
            type: new GraphQLList(BookType),
            resolve: (parent, args) => Book.find({authorId: parent.id})
        }
    })
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args) => Book.findById(args.id)
        },
        books:{
            type: new GraphQLList(BookType),
            resolve:() => Book.find({})
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve: (parent, args)=> Author.findById(args.id)
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve: () => Author.find({})
        }
    }
})

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addAuthor: {
            type: AuthorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString) },
                age: {type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author(args);
                return author.save();
            }
        },
        addBook: {
            type: BookType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                genre: {type: new GraphQLNonNull(GraphQLString)},
                authorId: {type: GraphQLID}
            },
            resolve: (parent, args) =>{
                let book = new Book(args);
                return book.save();
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})