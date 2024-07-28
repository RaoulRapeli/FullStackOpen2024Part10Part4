import React from 'react';
import { FlatList, View, StyleSheet, Pressable, Text } from 'react-native';
import { Button, Menu, PaperProvider, IconButton, Searchbar } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import RepositoryItem from '../RepositoryItem/RepositoryItem';
import useRepositories from '../../hooks/useRepositories'
import { useState } from 'react';
import theme from '../Text';
import { useDebounce } from 'use-debounce'

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  anchor: {
    display: 'flex',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexGrow: 2,
  },
  container: {
    margin: 20,
    backgroundColor: theme.colors.white,
  },
  menuItems: {
    backgroundColor: theme.colors.white,
  },
  dimmedBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: "100%",
    height: "100%",
    opacity: 0.25,
    backgroundColor: 'gray'
  }
});

const Sorter = ({ setOrderBy, setOrderDirection }) => {

  const menuOptions = [
    {
      title: 'Select an item...',
      use: false,
    },
    {
      title: 'Latest repository',
      use: true,
      orderBy: "CREATED_AT",
      orderDirection: "DESC"
    },
    {
      title: 'Highest rated repositories',
      use: true,
      orderBy: "RATING_AVERAGE",
      orderDirection: "DESC"
    },
    {
      title: 'Lowest rated repositories',
      use: true,
      orderBy: "RATING_AVERAGE",
      orderDirection: "ASC"
    }
  ]
  const [selectedOption, setSelectedOption] = useState('Latest repository')
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View>
      <Menu
        style={styles.container}
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <View style={styles.anchor}>
            <Text>{selectedOption}</Text>
            <IconButton
              icon="menu-down"
              iconColor='gray'
              size={30}
              onPress={openMenu}
            />
          </View>
        }>
        {menuOptions.map((option) => {
          return !option.use ?
            <Menu.Item key={option.title} title={option.title} disabled />
            :
            <Menu.Item key={option.title} onPress={() => { setSelectedOption(option.title); setOrderBy(option.orderBy); setOrderDirection(option.orderDirection); }} title={option.title} />
        })}
      </Menu>
    </View>
  )
}

const Filter = ({ searchValue, setSearchValue }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchValue}
        value={searchValue}
      />
    </View>
  )
}

const ItemSeparator = () => <View style={styles.separator} />

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    return (
      <>
        <Filter searchValue={props.searchValue} setSearchValue={props.setSearchValue} />
        <Sorter setOrderBy={props.setOrderBy} setOrderDirection={props.setOrderDirection} />
      </>
    );
  };

  render() {
    return (
      <PaperProvider>
        <FlatList
          data={this.props.repositories
            ? this.props.repositories.edges.map(edge => edge.node)
            : []}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <Pressable onPress={() => { this.props.navigate(`/repositoryList/${item.id}`) }}><RepositoryItem repository={item} /></Pressable>}
          ListHeaderComponent={this.renderHeader}
          keyExtractor={item => item.id}
          onEndReached={this.props.onEndReach}
          onEndReachedThreshold={0.5}
        />
      </PaperProvider>
    );
  }
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState("CREATED_AT")
  const [orderDirection, setOrderDirection] = useState("DESC")
  const [searchValue, setSearchValue] = useState("")
  const [searchKeyword] = useDebounce(searchValue, 500);
  const navigate = useNavigate()

  const { repositories, fetchMore, loading } = useRepositories({
    first: 8,
    orderBy, 
    orderDirection, 
    searchKeyword
  });
  if(loading){
    return false
  }

  const onEndReach = () => {
    fetchMore();
  };

  return <RepositoryListContainer repositories={repositories} {...{ setOrderBy, setOrderDirection, searchValue, setSearchValue, navigate, onEndReach }} />;
};

export default RepositoryList;