import { useMutation } from '@apollo/client';
import { CREATE_USER } from '../graphql/mutations';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER)

  const createUser = async ({ username, password }) => {
    return await mutate({ variables: {username,password}})
  };
  return [createUser, result];
};

export default useSignUp;