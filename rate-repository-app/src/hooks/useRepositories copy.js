import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (orderBy, orderDirection, searchKeyword) => {

  const [repositories, setRepositories] = useState();

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: { language: 'english', orderBy:orderBy, orderDirection:orderDirection, searchKeyword:searchKeyword }
  })

  const fetchRepositories = async () => {
    setRepositories(data?.repositories)
  };

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
    });
  };
 
  useEffect(() => {
    fetchRepositories();
  }, [data]);

  return { repositories, loading, error };
};

export default useRepositories;