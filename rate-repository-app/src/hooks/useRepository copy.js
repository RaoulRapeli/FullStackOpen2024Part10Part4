import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (id, currentRepository) => {
  const [repository, setRepository] = useState();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id:id??"" }
  })

  const fetchRepository = async () => {
    setRepository(data?.repository)
  };
 
  useEffect(() => {
    if(id){
      fetchRepository()
    }
    else{
      fetchRepository()
      setRepository(currentRepository)
    }
  }, [data,error,loading]);

  return { repository, loading, error };
};

export default useRepository;