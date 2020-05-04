import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import { connect } from 'react-redux';
import { getDeck } from '../actions';
import { fetchDeck } from '../utils/api';
import { AppLoading } from 'expo';
import { StackNavigator } from 'react-navigation';
import { NavigationActions } from 'react-navigation';
import {
  clearLocalNotification,
  setLocalNotification,
} from '../utils/notifications';

class IndividualDeckView extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.deck,
  });

  state = {
    ready: false,
  };
  componentDidMount() {
    const { dispatch, deck } = this.props;
    fetchDeck(deck)
      .then((entries) => dispatch(getDeck(deck, entries)))
      .then((entries) => this.setState(() => ({
        deck: entries.data,
        ready: true,
      })));
  };

  addCard = () => {
    const { deck } = this.props;
    const navigateAction = NavigationActions.navigate({
      routeName: 'NewQuestionView',
      params: { deck },
    });
    this.props.navigation.dispatch(navigateAction);
  };

  startQuiz = () => {
    clearLocalNotification().then(setLocalNotification);
    const questions = this.state.deck.questions;
    const navigateAction = NavigationActions.navigate({
      routeName: 'QuizView',
      params: { questions },
    });
    this.props.navigation.dispatch(navigateAction);
  };

  render() {
    const { ready } = this.state;

    if (ready === false) {
      return (<AppLoading />);
    }

    const { deck } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.header}>{deck.title}</Text>
          <Text style={styles.counter}>
            {deck.questions.length} cards
          </Text>

          <TouchableOpacity
            style={ Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
            }
            onPress={() => this.addCard()}
          >
            <Text style={styles.submitBtnText}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={ Platform.OS === 'ios'
              ? styles.iosSubmitBtn
              : styles.AndroidSubmitBtn
            }
            onPress={() =>this.startQuiz()}
          >
            <Text style={styles.submitBtnText}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    fontSize: 40,
    textAlign: 'center',
  },
  counter: {
    fontSize: 30,
    color: 'grey',
    textAlign: 'center',
  },
  iosSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 7,
    height: 45,
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
  },
  AndroidSubmitBtn: {
    backgroundColor: 'purple',
    padding: 10,
    marginTop: 10,
    paddingLeft: 30,
    paddingRight: 30,
    height: 45,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontSize: 22,
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

function mapStateToProps(state, options) {
  const { deck } = options.navigation.state.params;
  return { deck, state };
};

export default connect(
  mapStateToProps,
)(IndividualDeckView);
