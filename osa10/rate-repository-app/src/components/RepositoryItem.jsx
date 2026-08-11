import { Linking, Pressable, StyleSheet, View } from 'react-native';
import { RepositoryItemValues } from './RepositoryItemValues';
import { RepositoryItemInfo } from './RepositoryItemInfo';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    gap: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    textAlign: 'center',
    borderRadius: 6,
    padding: 10,
  },
});

export const RepositoryItem = ({ repository, singleRepository = false }) => {
  return (
    <View testID="repositoryItem" style={styles.container}>
      <RepositoryItemInfo repository={repository} />
      <RepositoryItemValues repository={repository} />
      {singleRepository && (
        <Pressable onPress={() => Linking.openURL(repository.url)}>
          <Text style={styles.button}>Open in GitHub</Text>
        </Pressable>
      )}
    </View>
  );
};
