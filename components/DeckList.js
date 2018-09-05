import React, { Component } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions';
import DeckSummary from './DeckSummary';

class DeckList extends Component {
  componentDidMount () {
    this.props.dispatch(handleInitialData());
  }

  render() {
    const { decks, navigation, deckIds } = this.props;

    return (
      <ScrollView contentContainerStyle={styles.container}>
        {deckIds.map((key) =>
          <DeckSummary
            key={key}
            title={decks[key].title}
            deckSize={decks[key].questions.length}
            navigation={navigation}
          />
        )}
        <TouchableOpacity
          style={styles.newDeckBtn}
          onPress={() => navigation.navigate('NewDeck')}>
            <Text style={styles.newDeckBtnText}>Add Deck</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  newDeckBtn: {
    backgroundColor: '#00f',
    padding: 10,
    borderRadius: 7,
    height: 70,
    width: 240,
    margin: 20,
    justifyContent: 'center'
  },
  newDeckBtnText: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center'
  }
});

function mapStateToProps (decks) {
  return {
    decks,
    deckIds: Object.keys(decks).sort((a,b) => a > b) // sort in alphabetical order
  };
}

export default connect(mapStateToProps)(DeckList);