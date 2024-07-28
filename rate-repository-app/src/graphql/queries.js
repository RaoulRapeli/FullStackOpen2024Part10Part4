import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query repositories($orderBy:AllRepositoriesOrderBy!, $orderDirection:OrderDirection!, $searchKeyword:String, $first:Int!, $after:String ){
    repositories (first:$first,after:$after, orderBy:$orderBy, orderDirection:$orderDirection, searchKeyword:$searchKeyword){
      edges {
        node {
          id,
          fullName,
          description,
          language,
          stargazersCount,
          forksCount,
          reviewCount,
          ratingAverage,
          ownerAvatarUrl,
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query repository($id: ID!, $first:Int!, $after:String){
    repository(id: $id) {
      id
      fullName
      url,
      fullName,
      description,
      language,
      stargazersCount,
      forksCount,
      reviewCount,
      ratingAverage,
      ownerAvatarUrl,
      reviews (first: $first, after:$after){
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_ME = gql`
query getCurrentUser($includeReviews: Boolean!) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          userId
          repositoryId
          rating
          createdAt
          text
        }
      }
    }
  }
}
`;