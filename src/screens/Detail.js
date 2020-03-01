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
  Animated,
  TouchableOpacity,
  BackHandler,
} from 'react-native';
import Constants from '../../Constants';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';

const MAX_HEIGHT = 200;
const MIN_HEIGHT = 55;
const MAX_IMAGE_HEIGHT = 190;
const MIN_IMAGE_HEIGHT = 50;

class Detail extends Component{

  constructor(props){
    super(props);
    this.id = this.props.navigation.getParam("id");
    //this.id=1;
    this.array=[];
    this.createBookId=null;
    this.kontrol = 0;

    this.state = {
      data:[],
      favorite:null,
      createBookId:null,
      createBook:[],
      createName:"",
      createSurname:'',
      email:'',
      bookName:'',
    }
    this.getData();


  }

  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.bookDetail();
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  handleBackPress = () => {
    this.props.navigation.goBack(); // works best when the goBack is async
    return true;
  }

  getData = async () => {
    try {
      const mail = await AsyncStorage.getItem('@eMail')
      this.setState({
        email: mail,
      })

    } catch(e) {
      // error reading value
    }
  }

  //VERİTABANI İŞLEMLERİ

  bookDetail(){
    var id = this.id.toString();
    var value = {id:id}
    var url = 'http://192.168.1.106:8080/Kitaplar/kitap_detay/';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(value), // data can be `string` or {object}!
      //body: data.toStringurl(r'^sifremi_unuttum/$', views.ForgetPassword.as_view()),(),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      console.log(response);
      this.setState({
        data:response,
      })

      response.map((value) =>{
        this.setState({
          createBookId: value.Kitap_Olusturan_Id,
          bookName: value.Kitap_Adi,
        })
      })
    })
    .catch(error => console.error('Hata:', error));
  }

  //KİTAP OLUŞTURAN KİŞİNİN BİLGİLERİ
  createBook(){
    var creativeId = this.state.createBookId;
    var value = {id:creativeId}
    var url = 'http://192.168.1.106:8080/Kullanicilar/kitap_olusturan/';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(value), // data can be `string` or {object}!
      //body: data.toStringurl(r'^sifremi_unuttum/$', views.ForgetPassword.as_view()),(),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {
      console.log(response);
      this.setState({
        createBook:response,
      })

      response.map((value) =>{
        this.setState({
          createName: value.Ad,
          createSurname: value.Soyad,
        })
      })
    })
    .catch(error => console.error('Hata:', error));
  }

  //FAVORİLER
  favorites(){
    var mail = this.state.email;
    var id = this.id;

    var values = new FormData()
    values.append("id", id)
    values.append("mail", this.state.email)
    var url = 'http://192.168.1.106:8080/Kutuphanem/kutuphane_kontrol/';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(values), // data can be `string` or {object}!
      //body: data.toStringurl(r'^sifremi_unuttum/$', views.ForgetPassword.as_view()),(),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {

      const answer = response.valueOf('message')
      if(answer.message === "0"){
        this.setState({
          favorite: 0,
        })
      }else {
        this.setState({
          favorite: 1,
        })
      }

    })
    .catch(error => console.error('Hata:', error));
  }

  favoriteChangeState = () =>{
    var mail = this.state.email;
    var id = this.id;

    var values = new FormData()
    values.append("id", id)
    values.append("mail", this.state.email)
    var url = 'http://192.168.1.106:8080/Kutuphanem/kutuphane_ekle/';
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(values), // data can be `string` or {object}!
      //body: data.toStringurl(r'^sifremi_unuttum/$', views.ForgetPassword.as_view()),(),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(response => {

      const answer = response.valueOf('message')
      if(answer.message === "0"){
        this.setState({
          favorite: 0,
        })
      }else {
        this.setState({
          favorite: 1,
        })
      }

    })
    .catch(error => console.error('Hata:', error));
  }

  //VERİTABANI İŞLEMLERİ


  render(){

    if(this.state.data.length > 0 && this.state.createBookId !== null && this.kontrol === 0 && this.state.email !== ""){
      this.createBook();
      this.favorites();
      this.kontrol = 1;

    }

    if(this.state.createName !== "" && this.state.favorite !== null){
      return(
          <View>

            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {this.props.navigation.goBack()}}
                style={{marginLeft:10, flex:1, justifyContent:'center'}}
              >
                <Icon name="md-arrow-back" color="#ffffff" size={30}/>
              </TouchableOpacity>

              <View style={{justifyContent:'center', alignItems:'flex-end', flex:1, marginRight:5}}>
                <Text style={{fontSize:16, color:'#ffffff'}}>{this.state.bookName}</Text>
              </View>

            </View>

            <ScrollView>
            {this.state.data.map((value, key) => {
              return(
                <View key={key}>
                  <View style={[styles.imageBox]}>
                    <TouchableOpacity
                      style={{flex:1,margin:5, alignItems:'center'}}
                    >
                      <View style={styles.readListenView}>
                        <Text style={styles.imageBoxText}>LISTEN</Text>
                        <FontAwesome name="headphones" size={40} color='red' />
                      </View>
                    </TouchableOpacity>
                    <View>
                      <Image
                        style={{width:150, height:190}}
                        source={require("../img/solaris.jpg")}
                        resizeMode="stretch"
                      />
                    </View>
                    <View style={{flex:1, margin:5, alignItems:'center', flexDirection:'column'}}>

                      {this.state.favorite === 0 ?
                        <TouchableOpacity
                          onPress={this.favoriteChangeState}
                          style={{flex:1}}
                        >
                          <Fontisto name="favorite" size={50} color='red' />
                        </TouchableOpacity>

                        :

                        <TouchableOpacity
                          onPress={this.favoriteChangeState}
                          style={{flex:1}}
                        >
                          <Fontisto name="favorite" size={50} color='yellow' />
                        </TouchableOpacity>
                      }

                      <TouchableOpacity
                        style={styles.readListenView}
                      >
                        <Text style={styles.imageBoxText}>READ</Text>
                        <FontAwesome name="readme" size={40} color='red' />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={{margin:10}}>
                    <View style={styles.informationView}>
                      <Text style={styles.informationHeader}>Kitap Adı</Text>
                      <Text style={styles.information}>{value.Kitap_Adi}</Text>
                    </View>

                    <View style={styles.informationView}>
                      <Text style={styles.informationHeader}>Kitap Yazarı</Text>
                      <Text style={styles.information}>{value.Kitap_Yazari}</Text>
                    </View>

                    <View style={styles.informationView}>
                      <Text style={styles.informationHeader}>Kitap Türü</Text>
                      <Text style={styles.information}>{value.Kitap_Türü}</Text>
                    </View>

                    <View style={styles.informationView}>
                      <Text style={styles.informationHeader}>Özeti Hazırlayan</Text>
                      <Text style={styles.information}>{this.state.createName} {this.state.createSurname}</Text>
                    </View>

                  </View>
                </View>
              );
            })}


           </ScrollView>

            <StatusBar backgroundColor="#192f6a"/>
          </View>
      );
    }else {
      return(
        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={{marginLeft:10, flex:1, justifyContent:'center'}}
            >
              <Icon name="md-arrow-back" color="#ffffff" size={30}/>
            </TouchableOpacity>

            <StatusBar backgroundColor="#192f6a"/>
          </View>
        </View>
      )
    }


  }
}



const styles = StyleSheet.create({
  container:{
    flex:1,
  },
  header:{
    height:55,
    backgroundColor:'#192f6a',
    justifyContent:'center',
    flexDirection:'row',
  },
  imageBox:{
    height:200,
    backgroundColor:'#d8faf5',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'row',

  },
  item: {
    backgroundColor: '#ff9e80',
    margin: 8,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center'
  },
  imageBoxText:{
    textDecorationLine:"underline",
    fontSize:20,
    fontWeight:'bold',
    marginBottom:5,
    alignItems:'center'
  },
  information:{
    fontSize:20,
    color:'#000000',
  },
  informationHeader:{
    fontSize:16,
    fontWeight:'bold',
    color:'#000000',
  },
  informationView:{
    marginTop:10,
    borderWidth:1,
    borderColor:'#192f6a',
  },
  itemText: {
    color: 'black',
    fontSize: 16
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent:'center',
    alignItems:'center',

  },
  readListenView:{
    flex:1,
    justifyContent:'flex-end',
    alignItems:'center'
  },
});

export default Detail;
