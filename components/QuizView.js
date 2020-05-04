import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Animated,
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class QuizView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      position: 0,
      correct: 0,
      incorrect: 0,
      bounceValue: new Animated.Value(1),
      shownItem: 'question',
    };
  };

  finishQuestion = (action) => {
    const { position, shownItem } = this.state;
    this.setState({
      [action]: this.state[action] + 1,
      position: position + 1,
      shownItem: 'question',
    });
  };

  toggleAnswer = () => {
    const { bounceValue, shownItem } = this.state;
    Animated.sequence([
      Animated.timing(bounceValue, { duration: 200, toValue: 1.1 }),
      Animated.spring(bounceValue, { toValue: 1, friction: 4 }),
    ]).start();
    this.setState({
      shownItem: shownItem === 'question' ? 'answer' : 'question',
    });
  };

  restartQuiz = () => {
    this.setState({
      position: 0,
      correct: 0,
      incorrect: 0,
      shownItem: 'question',
    });
  };

  locateToIndividualDeck = () => {
    const navigateAction = NavigationActions.back({
      key: null,
    });
    this.props.navigation.dispatch(navigateAction);
  };

  renderScore() {
    const { questions } = this.props;
    const { correct } = this.state;
    const questionsCount = questions.length;

    return (
      <View style={styles.center}>
        <Text style={styles.score}>Correct Answers</Text>
        <Text style={styles.score}>{correct} of {questionsCount}</Text>

        <TouchableOpacity
          style={[platformStyleButton, { backgroundColor: 'white', borderRadius: 1, borderColor: 'purple' }]}
          onPress={() => this.restartQuiz()}
        >
          <Text style={[styles.submitBtnText, { color: 'purple' }]}>Restart Quiz</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={platformStyleButton}
          onPress={() => this.locateToIndividualDeck()}
        >
          <Text style={styles.submitBtnText}>Back to Deck</Text>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const { questions } = this.props;
    const { position, bounceValue, shownItem } = this.state;
    const questionsCount = questions.length;

    if (position > questionsCount - 1) {
      return this.renderScore();
    }

    const item = questions[position];
    const buttonText = shownItem === 'question' ? 'Answer' : 'Question';

    return (
      <View style={styles.container}>
        <Text>{position + 1}/{questionsCount}</Text>

        <View style={styles.center}>

          <Animated.Text
            style={[styles.header, { transform: [{ scale: bounceValue }] }]}
          >
            {item[shownItem]}
          </Animated.Text>

          <TouchableOpacity
            onPress={() => this.toggleAnswer()}
          >
            <Text style={styles.toggleBtnText}>{buttonText}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[platformStyleButton, { backgroundColor: 'green' }]}
            onPress={() => this.finishQuestion('correct')}
          >
            <Text style={styles.submitBtnText}>Correct</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[platformStyleButton, { backgroundColor: 'red' }]}
            onPress={() => this.finishQuestion('incorrect')}
          >
            <Text style={styles.submitBtnText}>Incorrect</Text>
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
    fontSize: 50,
    textAlign: 'center',
  },
  score: {
    fontSize: 40,
    textAlign: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
    marginRight: 30,
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
  toggleBtnText: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
  },
});

const platformStyleButton = Platform.OS === 'ios'
  ? styles.iosSubmitBtn
  : styles.AndroidSubmitBtn;

function mapStateToProps(state, options) {
  const { questions } = options.navigation.state.params;
  return { state, questions };
};

export default connect(
  mapStateToProps,
)(QuizView);
