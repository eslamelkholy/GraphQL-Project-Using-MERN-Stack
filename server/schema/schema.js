const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType,
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
    } = graphql;

let books = [
    {name: "Design Patterns1", genere: "Computer Science", id:"1", authorId: "1"},
    {name: "Design Patterns2", genere: "Computer Science", id:"2", authorId: "3"},
    {name: "Design Patterns3", genere: "Computer Science", id:"3", authorId: "2"}
];

let authors = [
    {name: "Eslam Elkholy1", age: "23", id: "1"},
    {name: "Eslam Elkholy2", age: "24", id: "2"},
    {name: "Eslam Elkholy3", age: "25", id: "3"},
]

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        genere: {type: GraphQLString},
        author: {
            type: AuthorType,
            resolve(parent, args){
                return _.find(authors, {id: parent.authorId});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() => ({
        id: {type: GraphQLID },
        name: {type: GraphQLString },
        age: {type: GraphQLInt}
    })
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                // Code to get Data from DB / Other Source
               return _.find(books, {id: args.id});
            }
            
        },
        author: {
            type: AuthorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args){
                return _.find(authors, {id: args.id});
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})