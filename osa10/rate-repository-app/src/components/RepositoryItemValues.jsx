import { StyleSheet, View } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  lowerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  values: {
    alignSelf: 'center',
  },
});

const ThousandsToK = (value) => {
  if (value < 1000) {
    return value;
  } else {
    return `${(value / 1000).toFixed(1)}k`;
  }
};

const RepositoryItemValue = ({ value, text }) => {
  return (
    <View>
      <Text fontWeight="bold" style={styles.values}>
        {ThousandsToK(value)}
      </Text>
      <Text color="textSecondary">{text}</Text>
    </View>
  );
};

export const RepositoryItemValues = ({ repository }) => {
  return (
    <View style={styles.lowerContainer}>
      <RepositoryItemValue value={repository.stargazersCount} text="Stars" />
      <RepositoryItemValue value={repository.forksCount} text="Forks" />
      <RepositoryItemValue value={repository.reviewCount} text="Reviews" />
      <RepositoryItemValue value={repository.ratingAverage} text="Rating" />
    </View>
  );
};
