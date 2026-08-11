import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';
import { AppBarTab } from './AppBarTab';
import { GET_USER_STATUS } from '../graphql/queries';
import { useApolloClient, useQuery } from '@apollo/client/react';
import useAuthStorage from '../hooks/useAuthStorage';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBarBackground,
    display: 'flex',
  },
  appBarContainer: {
    flexDirection: 'row',
  },
});

const AppBar = () => {
  const { data } = useQuery(GET_USER_STATUS);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const navigate = useNavigate();

  const loggedInCheck = () => {
    try {
      if (!data.me) {
        return false;
      } else {
        return true;
      }
    } catch {}
  };

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    navigate('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab name="Repositories" link="/" />
        {loggedInCheck() ? (
          <View style={styles.appBarContainer}>
            <AppBarTab name="Create a review" link="/review" />
            <AppBarTab name="My reviews" link="/my-reviews" />
            <AppBarTab name="Sign Out" onPress={() => signOut()} />
          </View>
        ) : (
          <View style={styles.appBarContainer}>
            <AppBarTab name="Sign In" link="/sign-in" />
            <AppBarTab name="Sign up" link="/sign-up" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
