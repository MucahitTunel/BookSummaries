
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import Constants from '../../../Constants';
import {get} from '../../components/fetch';

class HomePage extends Component{

  constructor(props){
    super(props);


    this.state = {
      data:[],
      dataNew:[],
    }

  }

  componentDidMount(){
    let url = 'http://192.168.1.106:8080/Kitaplar/kitaplar/';
    let data = get(url);
    data.then(response => {
      this.setState({
        data:response,
      })
    })

    let data2 = get(url);
    data2.then(response => {
      this.setState({
        dataNew:response,
      })
    })
  }

  renderItem = ({item}) =>{
    var navigation = this.props.navigation;
    return(
      <TouchableOpacity
        onPress={()=>{navigation.navigate("Detail",{id:item.id})}}
      >
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={require('../../img/bird2.png')}
              resizeMode="stretch"
            />
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.contentText}>YAZAR</Text>
            <Text style={{marginLeft:5}}>{item.Kitap_Yazari}</Text>

            <Text style={styles.contentText}>TÜR</Text>
            <Text style={{marginLeft:5}}>{item.Kitap_Türü}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  renderItemTwo = ({item}) =>{
    var navigation = this.props.navigation;
    return(
      <TouchableOpacity
        onPress={()=>{navigation.navigate("Detail",{id:item.id})}}
      >
        <View style={styles.content}>
          <View style={styles.imageView}>
            <Image
              style={styles.image}
              source={require('../../img/bird2.png')}
              resizeMode="stretch"
            />
          </View>
          <View style={{marginTop:10}}>
            <Text style={styles.contentText}>YAZAR</Text>
            <Text style={{marginLeft:5}}>{item.Kitap_Yazari}</Text>

            <Text style={styles.contentText}>TÜR</Text>
            <Text style={{marginLeft:5}}>{item.Kitap_Türü}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }


  render(){
    return(
        <View style={styles.container}>
          <View style={styles.contentBox}>
            <View style={styles.contentHeader}>
              <View style={{flexDirection:'row'}}>
                <View style={{alignItems:'flex-start', marginLeft:10, flex:1}}>
                  <Text style={styles.contentHeaderText}>Yeni</Text>
                </View>
                <View style={{alignItems:'flex-end', marginRight:10, flex:1}}>
                  <Text style={{color:'#4998c5', fontSize:14, fontWeight:'bold'}}>Daha fazla</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop:10}}>
              <FlatList
                data={this.state.data}
                renderItem={this.renderItem}
                keyExtractor={item=>item.id.toString()}
                numColumns={5}
              />
            </View>
          </View>

          <View style={styles.contentBox}>
            <View style={styles.contentHeader}>
              <View style={{flexDirection:'row'}}>
                <View style={{alignItems:'flex-start', marginLeft:10, flex:1}}>
                  <Text style={styles.contentHeaderText}>En çok okunanlar</Text>
                </View>
                <View style={{alignItems:'flex-end', marginRight:10, flex:1}}>
                  <Text style={{color:'#4998c5', fontSize:14, fontWeight:'bold'}}>Daha fazla</Text>
                </View>
              </View>
            </View>
            <View style={{marginTop:10}}>
              <FlatList
                data={this.state.dataNew}
                renderItem={this.renderItemTwo}
                keyExtractor={item=>item.id.toString()}
                numColumns={5}
              />
            </View>
          </View>

        </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  content:{
    height:250,
    backgroundColor:'#f2eeee',
    width:175,
    marginLeft:10,
    marginTop:5,
    borderRadius:10,
    borderWidth:1
  },
  contentBox:{
    height:300,

    backgroundColor:'#f2eeee',
    marginTop: 10,
    marginBottom:10
  },
  contentHeader:{
    height: 30,

    borderBottomWidth:1,
    justifyContent:'center',
  },
  contentHeaderText:{
    fontSize:18,
    fontWeight:'bold',
  },
  image:{
    width:100,
    height:100,
  },
  imageView:{
    alignItems:'center',
    height:100,
    justifyContent:'center',
    marginTop:10
  },
  contentText:{
    textDecorationLine:'underline',
    fontWeight:"bold",
    marginLeft:5,
    marginTop:10,
  }
});

export default HomePage;
