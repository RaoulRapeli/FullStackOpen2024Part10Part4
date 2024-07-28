import { useMutation } from '@apollo/client';
import { GET_ACCESSTOKEN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(GET_ACCESSTOKEN)

  const signIn = async ({ username, password }) => {
    return await mutate({ variables: {username,password}})
  };
  return [signIn, result];
};

export default useSignIn;