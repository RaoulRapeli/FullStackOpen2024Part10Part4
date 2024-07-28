import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';

const useMyReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW)

  const deleteReview = async ({ id }) => {
    return await mutate({ variables: {id}})
  };
  return [deleteReview, result];
};

export default useMyReview;