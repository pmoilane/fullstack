import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: 'flex-start',
  },
});

export const AppBarTab = ({ name, link, onPress }) => {
  if (onPress) {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <Text style={{ color: 'white' }}>{name}</Text>
        </Pressable>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Pressable onPress={onPress}>
          <Link to={link}>
            <Text style={{ color: 'white' }}>{name}</Text>
          </Link>
        </Pressable>
      </View>
    );
  }
};
