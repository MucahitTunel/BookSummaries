import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import { Container, Button, Header, Body, Title, Right, Left, Footer, FooterTab, Content} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/AntDesign';
import Material from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

import HomePage from './footer/HomePage';
import Profile from './footer/Profile';
import Library from './footer/Library';

class Home extends Component{

  constructor(props){
    super(props);

    this.state={
      activeFoot: 1,
    }

  }

  render(){

    var {navigation} = this.props;

    return(

        <Container>

            <Header
              style={styles.header}
              androidStatusBarColor="#192f6a">

              <Body style={{marginLeft:20, }}>
                <Text style={styles.headerBodyText}>Kitap Özetleri</Text>
              </Body>

              <Right>
                <TouchableOpacity>
                  <Icon name="md-search" size={30} style={styles.icons}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="md-add-circle-outline" size={30} style={styles.icons}></Icon>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Icon name="md-options" size={30} style={styles.icons}></Icon>
                </TouchableOpacity>
              </Right>

            </Header>

            <Content>
              {this.state.activeFoot === 1 && <HomePage navigation={navigation}/>}
              {this.state.activeFoot === 2 && <Library navigation={navigation}/>}
              {this.state.activeFoot === 3 && <Profile navigation={navigation}/>}
            </Content>

          <Footer>

            <FooterTab style={{backgroundColor:'#192f6a'}}>
              <Button vertical active={this.state.activeFoot===1} onPress={() => this.setState({activeFoot:1})}>
                <Icons name="home" size={20} style={styles.footerIcons}/>
                <Text style={styles.footerText}>Ana Sayfa</Text>
              </Button>
              <Button vertical active={this.state.activeFoot===2} onPress={() => this.setState({activeFoot:2})}>
                <Material name="library" size={20} style={styles.footerIcons}/>
                <Text style={styles.footerText}>Kütüphanem</Text>
              </Button>
              <Button vertical active={this.state.activeFoot===3} onPress={() => this.setState({activeFoot:3})}>
                <Fontisto name="person" size={20} style={styles.footerIcons}/>
                <Text style={styles.footerText}>Profil</Text>
              </Button>
            </FooterTab>
          </Footer>

        </Container>

    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  footerIcons:{
    color:'#ffffff',
  },
  footerText:{
    color:'#ffffff',
  },
  header:{
    backgroundColor:'#192f6a',
  },
  headerBodyText:{
    fontSize:25,
    fontWeight:"bold",
    fontFamily:'FFF_Tusj',
    color:'#ffffff',
  },
  icons:{
    marginLeft:15,
    color:'#ffffff'
  },

})


export default Home;
