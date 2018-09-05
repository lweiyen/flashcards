import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeckSummary = (props) => (
  <TouchableOpacity onPress={() => props.navigation.navigate('Deck', {title: props.title})}>
    <View style={styles.deck}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.deckSize}>Deck Size: {props.deckSize}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    textAlign: 'center'
  },
  deckSize: {
    fontSize: 20,
    textAlign: 'center'
  },
  deck: {
    backgroundColor: '#d0d0d0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
    marginTop: 18,
    height: 100,
    width: 240
  }
});

export default DeckSummary;