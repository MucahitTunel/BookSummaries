
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class Library extends Component{

  constructor(props){
    super(props);

  }
  render(){
    return(
        <View>
          <Text>Library</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default Library;
