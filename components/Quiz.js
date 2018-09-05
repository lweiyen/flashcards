import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { AppLoading } from 'expo';
import { clearLocalNotification, setLocalNotification } from '../utils/api';

class Quiz extends Component {
  state = {
    score: 0,
    availableQns: this.props.questions,
    showQuestion: true,
    currQuestion: null,
    showResult: false
  };

  componentDidMount () {
    this.getNextQuestion();
  }

  getNextQuestion = () => {
    const { availableQns } = this.state;
    const qnsCount = availableQns.length;

    if (qnsCount === 0) {
      this.setState(() => ({
        showResult: true,
        currQuestion: null,
      }));
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      // quiz cards in random order
      const currQnIndex = Math.floor(Math.random() * qnsCount);
      const remainingQns = availableQns.slice(); //copy array before splice
      const currQuestion = remainingQns.splice(currQnIndex,1)[0];

      this.setState(() => ({
        currQuestion,
        availableQns: remainingQns,
        showQuestion: true
      }));
    }
  };

  toggleShowQuestion = () => {
    this.setState((state) => ({
      showQuestion: !state.showQuestion
    }));
  };

  handleScore = (thisScore) => () => {
    this.setState((state) => ({
      score: state.score + thisScore
    }));
    this.getNextQuestion();
  };

  handleReset = () => {
    const availableQns = this.props.questions
    const qnsCount = availableQns.length;
    const currQnIndex = Math.floor(Math.random() * qnsCount);
    const remainingQns = availableQns.slice();
    const currQuestion = remainingQns.splice(currQnIndex,1)[0];

    this.setState(() => ({
      score: 0,
      availableQns: remainingQns,
      showQuestion: true,
      currQuestion,
      showResult: false
    }));
  };

  render() {
    const { deckSize, navigation } = this.props;
    const { score, currQuestion, availableQns, showQuestion, showResult } = this.state;
    const ansCount = deckSize - availableQns.length;

    if (showResult === true) {
      return (
        <View style={styles.container}>
          <View style={styles.result}>
            <Text style={styles.resultText}>Thank you for finishing the quiz</Text>
            <Text style={styles.resultText}>You have obtained a score of:</Text>
            <Text style={styles.resultText}>{score}/{deckSize}</Text>
          </View>
          <TouchableOpacity
            style={[styles.btn, styles.backBtn]}
            onPress={() => navigation.goBack()}>
              <Text style={styles.backBtnText}>Back to Deck</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btn, styles.retryBtn]}
            onPress={this.handleReset}>
              <Text style={styles.btnText}>Retry Quiz</Text>
          </TouchableOpacity>
        </View>
      );
    }

    if (currQuestion === null) {
      return <AppLoading />;
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.counts}>Card: {ansCount} / {deckSize}</Text>
        <View style={styles.card}>
          {showQuestion?
            <Text style={styles.cardText}>{currQuestion.question}</Text>
           :<Text style={styles.cardText}>{currQuestion.answer}</Text>}
        </View>
        <TouchableOpacity
          style={styles.toggleBtn}
          onPress={this.toggleShowQuestion}>
            <Text style={styles.toggleText}>
              {showQuestion?'Show Answer':'Show Question'}
            </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.correctBtn]}
          onPress={this.handleScore(1)}>
            <Text style={styles.btnText}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, styles.incorrectBtn]}
          onPress={this.handleScore(0)}>
            <Text style={styles.btnText}>Incorrect</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  cardText: {
    fontSize: 30,
    textAlign: 'center'
  },
  resultText: {
    fontSize: 18,
    textAlign: 'center'
  },
  counts: {
    fontSize: 20,
    textAlign: 'center'
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 18,
    height: 140
  },
  result: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 30,
    height: 120
  },
  btn: {
    padding: 10,
    borderRadius: 7,
    height: 50,
    width: 240,
    margin: 10,
    justifyContent: 'center'
  },
  toggleBtn: {
    paddingBottom: 20
  },
  correctBtn: {
    backgroundColor: '#080'
  },
  incorrectBtn: {
    backgroundColor: '#f00'
  },
  backBtn: {
    backgroundColor: '#fff'
  },
  retryBtn: {
    backgroundColor: '#000'
  },
  btnText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center'
  },
  backBtnText: {
    color: '#000',
    fontSize: 20,
    textAlign: 'center'
  },
  toggleText: {
    color: '#f00',
    fontSize: 16,
    textAlign: 'center'
  },
});

function mapStateToProps (decks, props) {
  const title = props.navigation.state.params.title;

  return {
    questions: decks[title].questions,
    deckSize: decks[title].questions.length
  };
}

export default connect(mapStateToProps)(Quiz);