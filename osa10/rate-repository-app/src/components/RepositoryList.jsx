import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { RepositoryItem } from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const ItemSeparator = () => <View style={styles.separator} />;

const constructRepositoriesVariables = (order, searchKeyword) => {
  if (order === 'latest') {
    return {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
      searchKeyword: searchKeyword,
    };
  } else if (order === 'highest-rated') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
      searchKeyword: searchKeyword,
    };
  } else if (order === 'lowest-rated') {
    return {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
      searchKeyword: searchKeyword,
    };
  }
};

export const RepositoryListContainer = ({
  repositories,
  orderRepositoryBy,
  setOrderRepositoryBy,
  searchKeyword,
  setSearchKeyword,
  onPress,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={(repository) => (
        <Pressable onPress={() => onPress(repository.item.id)}>
          <RepositoryItem
            key={repository.item.id}
            repository={repository.item}
          />
        </Pressable>
      )}
      ListHeaderComponent={
        <View>
          <Searchbar
            placeholder="search repositories"
            onChangeText={setSearchKeyword}
            value={searchKeyword}
          />
          <Picker
            selectedValue={orderRepositoryBy}
            onValueChange={(value) => {
              setOrderRepositoryBy(value);
            }}>
            <Picker.Item label="Latest repositories" value="latest" />
            <Picker.Item
              label="Highest rated repositories"
              value="highest-rated"
            />
            <Picker.Item
              label="Lowest rated repositories"
              value="lowest-rated"
            />
          </Picker>
        </View>
      }
    />
  );
};

const RepositoryList = () => {
  const [orderRepositoryBy, setOrderRepositoryBy] = useState('latest');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);
  const { repositories } = useRepositories(
    constructRepositoriesVariables(orderRepositoryBy, debouncedSearchKeyword),
  );
  const navigate = useNavigate();

  const onPress = (id) => {
    navigate(`/${id}`);
  };

  return (
    <RepositoryListContainer
      repositories={repositories}
      orderRepositoryBy={orderRepositoryBy}
      setOrderRepositoryBy={setOrderRepositoryBy}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onPress={onPress}
    />
  );
};

export default RepositoryList;
