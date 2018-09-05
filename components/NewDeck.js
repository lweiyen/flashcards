import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { handleNewDeck } from '../actions';

class NewDeck extends Component {
  state = {
    input: '',
    emptyInputError: false,
    titleExistError: false
  };

  handleTextChange = (input) => {
    this.setState(() => ({
      input,
      emptyInputError: false,
      titleExistError: false
    }));
  };

  handleSubmit = () => {
    const { navigation, titles, dispatch } = this.props;
    const newTitle = this.state.input;

    if (newTitle === '') {
      this.setState(() => ({ emptyInputError: true }));
    } else if (titles.indexOf(newTitle) !== -1) {
      this.setState(() => ({ titleExistError: true }));
    } else {
      dispatch(handleNewDeck(newTitle))
        .then(() => {
          navigation.goBack();
          navigation.navigate('Deck', {title: newTitle});
        });
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.prompt}>Enter Title:</Text>
        <TextInput
          value={this.state.input}
          style={styles.input}
          onSubmitEditing={this.handleSubmit}
          autoFocus={true}
          onChangeText={this.handleTextChange}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
        {this.state.emptyInputError?
          (<Text style={styles.errorText}>
            Deck Title cannot be empty
           </Text>)
         :null}
        {this.state.titleExistError?
          (<Text style={styles.errorText}>
            A Deck with this title already exists
           </Text>)
          :null}
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 20
  },
  submitBtn: {
    backgroundColor: '#000',
    padding: 10,
    borderRadius: 7,
    height: 50,
    width: 120,
    margin: 10,
    justifyContent: 'center'
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'center'
  },
  prompt: {
    fontSize: 25,
    textAlign: 'center'
  },
  errorText: {
    color: '#f00',
    fontSize: 18,
    textAlign: 'center'
  },
  input: {
    width: 240,
    height: 40,
    padding: 8,
    borderWidth: 1,
    borderColor: '#757575',
    borderRadius: 7,
    margin: 30
  }
});

function mapStateToProps (decks) {
  return {
    titles: Object.keys(decks)
  };
}

export default connect(mapStateToProps)(NewDeck);