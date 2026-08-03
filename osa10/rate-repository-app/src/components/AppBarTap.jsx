import { Pressable, View, StyleSheet } from 'react-native';
import Text from './Text';
import { Link } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignSelf: 'flex-start',
  },
});

export const AppBarTap = ({ name, link }) => {
  return (
    <View style={styles.container}>
      <Pressable>
        <Link to={link}>
          <Text style={{ color: 'white' }}>{name}</Text>
        </Link>
      </Pressable>
    </View>
  );
};
