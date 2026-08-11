import { useMutation } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations';

const useReviewForm = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({
    ownerName,
    repositoryName,
    rating,
    text = null,
  }) => {
    const { data } = await mutate({
      variables: {
        review: {
          ownerName,
          repositoryName,
          rating,
          text,
        },
      },
    });
    return data;
  };

  return [createReview, result];
};

export default useReviewForm;
