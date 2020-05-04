import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableHighlight } from 'react-native';
import { getDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class DeckListView extends Component {
  state = {
    ready: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    fetchDecks()
      .then((entries) => {
        return dispatch(getDecks(entries));
      })
      .then(() => this.setState(() => ({ ready: true })));
  };

  locateToDeck = (deck) => {
    const navigateAction = NavigationActions.navigate({
      routeName: 'IndividualDeckNavigator',

      action: NavigationActions.navigate({
        routeName: 'IndividualDeckView',
        params: { deck },
      }),
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return (<AppLoading />);
    }

    const { decks, state } = this.props;

    if (decks && decks.length === 0) {
      return (
        <View style={styles.center}>
          <Text>There is no any deck</Text>
        </View>
      );
    }

    const stateStringify = JSON.stringify(this.state);
    const propsStringify = JSON.stringify(this.props);
    return (
      <View style={styles.container}>
        {decks.map((item) => (
          <TouchableHighlight
            key={item}
            style={styles.deck}
            onPress={() => this.locateToDeck(item)}
          >
            <View>
              <Text style={styles.header}>{item}</Text>
              <Text style={styles.counter}>
                {state[item].questions.length} cards
              </Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  deck: {
    marginBottom: 5,
    borderWidth: 2,
    borderColor: 'purple',
    padding: 20,
  },
  header: {
    fontSize: 30,
    textAlign: 'center',
  },
  counter: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
  },
});

function mapStateToProps(state) {
  const decks = Object.keys(state) || [];
  return { decks, state };
};

export default connect(
  mapStateToProps,
)(DeckListView);
