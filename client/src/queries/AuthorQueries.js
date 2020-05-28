import { gql } from 'apollo-boost';

const getAuthorsQuery = gql`
{
    authors{
        name,
        id
    }
}
`

export { getAuthorsQuery };