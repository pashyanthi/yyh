import * as React from 'react';
import { StyleSheet, Text, View, Button, TextInput} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component{
  constructor(){
    super();
    this.state = {
      enteredText : '',
      isSearchPressed : '',
      word : '',
      lexicalCategory : '',
      definition : ''
    }
  }

  getWord = (word) => {
    var searchKeyword = word.toLowerCase();
    console.log(searchKeyword)
    var url = 'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyword + '.json'
    console.log(url)

    return fetch(url)

    .then((data) => {
      if(data.status === 200){
        return data.json();
      }
      else {
        return null;
      }
    })

    .then((response) => {
      var responseObject = response;

      if(responseObject){
        var wordData = responseObject.definition[0];
        var definition = wordData.description;
        var lexicalCategory = wordData.wordtype;

        this.setState({
          'word' : this.state.enteredText,
          'definition' : definition,
          'lexicalCategory' : lexicalCategory
        })
      }

      else {
        this.setState({
          'word' : this.state.enteredText,
          'definition' : 'Not Found'
        })
      }
    })
  }

  render(){
    return (
      <View>
        <Header
          centerComponent = {{text : 'Pocket Dictionary', style : {color : 'white'}}}
          backgroundColor = 'gold'>
        </Header>

        <TextInput
        value = {this.state.enteredText}
        onChangeText = {(text) => {
          this.setState({
            enteredText : text,
            isSearchPressed : 'false',
            word : 'Loading...',
            lexicalCategory : '',
            definition : ''
          })
        }}>
        </TextInput>

        <Button
        style = {styling.buttonStyle}
        title = 'Search'
        onPress = {() => {
          this.setState({
            isSearchPressed : 'true'
          })
          console.log(this.state.enteredText)
          this.getWord(this.state.enteredText)
        }}>  
        </Button>

        <View>
          <Text> Word : {''} </Text>
          <Text style = {{fontSize : '19px'}}> {this.state.enteredText} </Text>
        </View>

        <View>
          <Text> Type : {''} </Text>
          <Text style = {{fontSize : '19px'}}> {this.state.lexicalCategory} </Text>
        </View>

        <View>
          <Text> Definition : {''} </Text>
          <Text style = {{fontSize : '19px'}}> {this.state.definition} </Text>
        </View>
      </View> 
    );
  }
}

const styling = StyleSheet.create({
  buttonStyle: {
    marginTop: '100px',
    marginLeft: '35px',
    width: '250px',
    height: '75px',
    borderColor : 'black',
    alignItems: 'center',
  }
})