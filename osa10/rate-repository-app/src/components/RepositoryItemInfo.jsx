import { Image, StyleSheet, View } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  upperContainer: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
  },
  upperSubContainer: {
    flexDirection: 'column',
    flexShrink: 1,
    gap: 5,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  description: {
    alignSelf: 'flex-start',
  },
});

export const RepositoryItemInfo = ({ repository }) => {
  return (
    <View style={styles.upperContainer}>
      <View>
        <Image
          style={styles.logo}
          source={{ uri: repository.ownerAvatarUrl }}
        />
      </View>
      <View style={styles.upperSubContainer}>
        <Text fontWeight="bold">{repository.fullName}</Text>
        <Text color="textSecondary" style={styles.description}>
          {repository.description}
        </Text>
        <Text style={styles.language}>{repository.language}</Text>
      </View>
    </View>
  );
};
