import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW)

  const createReview = async ({ ownerName, repositoryName, rating, review}) => {
    return await mutate({ variables: {ownerName, repositoryName, rating, text:review}})
  };
  return [createReview, result];
};

export default useReview;