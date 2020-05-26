const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema} = graphql;

const BookType = new GraphQLObjectType({
    name:"Book",
    fields:() => ({
        id: {type: GraphQLString },
        name: {type: GraphQLString },
        genere: {type: GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields: {
        book:{
            type: BookType,
            args: {id: {type: GraphQLString}},
            resolve(parent, args){
                // Code to Get Data From DB Or other Source
            }
            
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})