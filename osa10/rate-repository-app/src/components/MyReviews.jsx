import { Alert, FlatList, Pressable, StyleSheet, View } from 'react-native';
import Text from './Text';
import { useMutation, useQuery } from '@apollo/client/react';
import { GET_USER_STATUS } from '../graphql/queries';
import theme from '../theme';
import { ItemSeparator } from './RepositoryList';
import { ReviewItem } from './SingleRepository';
import { useNavigate } from 'react-router-native';
import { DELETE_REVIEW } from '../graphql/mutations';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    borderRadius: 6,
    padding: 15,
  },
  deleteButton: {
    backgroundColor: theme.colors.errorColor,
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

const ButtonContainer = ({ repositoryId, reviewId, refetch }) => {
  const navigate = useNavigate();
  const [mutate] = useMutation(DELETE_REVIEW);

  const onPress = () => {
    navigate(`/${repositoryId}`);
  };

  const deleteAlert = () =>
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'CANCEL',
          onPress: () => console.log('delete cancelled'),
          style: 'cancel',
        },
        {
          text: 'DELETE',
          onPress: async () => {
            const { data } = await mutate({
              variables: { deleteReviewId: reviewId },
            });
            console.log(data);
            refetch();
          },
        },
      ],
    );

  return (
    <View style={styles.container}>
      <Pressable onPress={() => onPress()}>
        <Text style={styles.button}>View repository</Text>
      </Pressable>
      <Pressable onPress={deleteAlert}>
        <Text style={[styles.button, styles.deleteButton]}>Delete review</Text>
      </Pressable>
    </View>
  );
};

const MyReviews = () => {
  const { data, loading, refetch } = useQuery(GET_USER_STATUS, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return <Text>Loading</Text>;
  }

  const reviews = data.me ? data.me.reviews.edges.map((edge) => edge.node) : [];

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <View>
          <ReviewItem review={item} repositoryName={true} />
          <ButtonContainer
            reviewId={item.id}
            refetch={refetch}
            repositoryId={item.repositoryId}
          />
        </View>
      )}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
