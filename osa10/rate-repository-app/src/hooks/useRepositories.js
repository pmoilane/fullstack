import { useQuery } from '@apollo/client/react';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (variables) => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    variables: variables,
  });

  if (loading) {
    console.log('loading repositories');
    return { loading };
  }

  return { repositories: data.repositories, loading, error };
};

export default useRepositories;
