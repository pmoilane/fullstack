import { FlatList, StyleSheet, View } from 'react-native';
import Text from './Text';
import { useParams } from 'react-router-native';
import { useQuery, skipToken } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries';
import theme from '../theme';
import { RepositoryItem } from './RepositoryItem';
import { format } from 'date-fns';
import { ItemSeparator } from './RepositoryList';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
  },
  subContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    gap: 5,
  },
  rating: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ratingNumber: {
    color: theme.colors.primary,
    fontSize: 20,
  },
  reviewText: {
    alignSelf: 'flex-start',
  },
});

export const ReviewItem = ({ review, repositoryName = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.rating}>
        <Text fontWeight="bold" style={styles.ratingNumber}>
          {review.rating}
        </Text>
      </View>
      <View style={styles.subContainer}>
        <Text fontWeight="bold">
          {repositoryName ? review.repository.name : review.user.username}
        </Text>
        <Text>{format(review.createdAt, 'dd MMM yyyy')}</Text>
        <Text style={styles.reviewText}>{review.text}</Text>
      </View>
    </View>
  );
};

const SingleRepository = () => {
  const { id } = useParams();
  const { data, loading } = useQuery(
    GET_REPOSITORY,
    id
      ? { variables: { repositoryId: id }, fetchPolicy: 'cache-and-network' }
      : skipToken,
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  const repository = data.repository;

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <View>
          <RepositoryItem repository={repository} singleRepository={true} />
          <View style={styles.separator} />
        </View>
      )}
    />
  );
};

export default SingleRepository;
