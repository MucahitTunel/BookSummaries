
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class Profile extends Component{

  constructor(props){
    super(props);

  }
  render(){
    return(
        <View>
          <Text>Profile</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  }
});

export default Profile;
