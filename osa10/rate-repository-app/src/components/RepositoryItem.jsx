import { StyleSheet, View } from 'react-native';
import { RepositoryItemValues } from './RepositoryItemValues';
import { RepositoryItemInfo } from './RepositoryItemInfo';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
  },
});

export const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryItemInfo repository={repository} />
      <RepositoryItemValues repository={repository} />
    </View>
  );
};
