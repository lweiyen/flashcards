import React, { Component } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { handleNewCard } from '../actions';

class NewCard extends Component {
  state = {
    qnInput: '',
    ansInput: '',
    emptyInputError: false
  };

  handleQnChange = (qnInput) => {
    this.setState(() => ({
      qnInput,
      emptyInputError: false,
    }));
  };

  handleAnsChange = (ansInput) => {
    this.setState(() => ({
      ansInput,
      emptyInputError: false,
    }));
  };

  handleSubmit = () => {
    const { navigation, dispatch } = this.props;
    const { qnInput, ansInput } = this.state;

    if (qnInput === '' || ansInput === '') {
      this.setState(() => ({ emptyInputError: true }));
    } else {
      const newCard = {
        question: qnInput,
        answer: ansInput
      };

      dispatch(handleNewCard(newCard, navigation.state.params.title))
        .then(() => navigation.goBack());
    }
  };

  render() {
    return (
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.prompt}>Enter Question:</Text>
        <TextInput
          value={this.state.qnInput}
          style={styles.input}
          onSubmitEditing={() => this.refs.Ans.focus()}
          autoFocus={true}
          onChangeText={this.handleQnChange}
        />
        <Text style={styles.prompt}>Enter Answer:</Text>
        <TextInput
          ref='Ans'
          value={this.state.ansInput}
          style={styles.input}
          onSubmitEditing={this.handleSubmit}
          onChangeText={this.handleAnsChange}
        />
        <TouchableOpacity
          style={styles.submitBtn}
          onPress={this.handleSubmit}>
            <Text style={styles.submitBtnText}>Submit</Text>
        </TouchableOpacity>
        {this.state.emptyInputError?
          (<Text style={styles.errorText}>
            Queston and Answer cannot be empty
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

export default connect()(NewCard);