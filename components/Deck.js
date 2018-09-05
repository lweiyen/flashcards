import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';

class Deck extends Component {
  handleStartQuiz = () => {
    const { title, deckSize, navigation} = this.props;

    if (deckSize > 0) {
      navigation.navigate('Quiz', { title });
    }
  }

  render() {
    const { title, deckSize, navigation } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.deck}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.deckSize}>Deck Size: {deckSize}</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('NewCard', { title })}>
            <Text style={styles.btnText}>Add Card</Text>
        </TouchableOpacity>
        {deckSize > 0 ?
          <TouchableOpacity
            style={[ styles.btn, styles.quizBtn ]}
            onPress={() => navigation.navigate('Quiz', { title })}>
              <Text style={styles.btnText}>Start Quiz</Text>
          </TouchableOpacity>
         : <Text style={styles.errorText}>Add more cards to enable quiz</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  deckSize: {
    fontSize: 20,
    textAlign: 'center'
  },
  deck: {
    backgroundColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    margin: 18,
    height: 100,
    width: 240
  },
  btn: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 7,
    height: 70,
    width: 240,
    margin: 10,
    justifyContent: 'center'
  },
  quizBtn: {
    backgroundColor: '#000'
  },
  btnText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  },
  errorText: {
    color: '#f00',
    fontSize: 18,
    textAlign: 'center'
  }
});

function mapStateToProps (decks, props) {
  const title = props.navigation.state.params.title;

  return {
    title,
    deckSize: decks[title].questions.length
  };
}

export default connect(mapStateToProps)(Deck);