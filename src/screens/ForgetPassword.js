import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class ForgetPassword extends Component{

  constructor(props){
    super(props);

    this.state = {
      email: '',
    }

    this.onChangeEmailText = this.onChangeEmailText.bind(this);
  }

  Forget = () =>{
    var url = 'http://192.168.1.106:8080/Kullanicilar/sifremi_unuttum/';
    //data.append('Sifre', this.state.Sifre)
    var email = this.state.email
    var uzunluk = email.length


    if(email !== '' && email.substring(uzunluk-10, uzunluk) === '@gmail.com'){
      var value = {Mail: this.state.email};


      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(value), // data can be `string` or {object}!
        //body: data.toString(),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {

        const answer = response.valueOf('message')

        if (answer.message === "1") {
          Alert.alert("Şifreniz yenilendi. Mail adresinizi kontrol ediniz.")
        }else if(answer.message === "-1"){
          Alert.alert("Mail adresi sistemde bulunmamaktadır.")
        }else {
          Alert.alert("Şifreniz değiştirilemedi");
        }
      })
      .catch(error => console.error('Hata:', error));
    }else {
      Alert.alert("Bilgilerinizi Kontrol Ediniz")
    }
  }


  onChangeEmailText(value){
    this.setState({
      email:value,
    })
  }

  render(){
    return(

      <View style={styles.container}>
        <View style={styles.header}>
          <LinearGradient colors={['#192f6a','#3b5998','#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              KİTAP ÖZETLERİ
            </Text>

            <Text style={styles.buttonText}>
              ŞİFREMİ UNUTTUM
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.body}>

          <View style={{alignItems:'center'}}>
            <Text style={{fontWeight:'bold'}}>Yeni şifreniz mail adresinize gönderilecektir.</Text>
          </View>

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangeEmailText}
            placeholder="Email"
            underlineColorAndroid="transparent"
            textContentType="emailAddress"
            value={this.state.email}
          />

          <View style={styles.buttonBox}>
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.Forget}
              >
                <Text style={[styles.text,{fontWeight:'bold'}]}>GÖNDER</Text>
              </TouchableOpacity>
            </View>
          </View>


        </View>

        <StatusBar hidden={true}/>
      </View>

    );
  }
}

const styles = StyleSheet.create({

  body:{
    margin:10,
    flex:1,
  },
  button:{
    width:150,
    height:50,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#60c0f6'
  },
  buttonBox:{
    alignItems:'flex-end',
    justifyContent:'center',
    height:50,
    width:Constants.MAX_WIDTH-20,
    marginTop:20,
  },
  buttonText: {
    fontSize: 30,
    fontFamily: "FFF_Tusj",
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  checkBox:{
    height:30,
    flexDirection:'row',
    marginTop:10
  },
  container:{
    flex:1,
    backgroundColor:"#ffffff"
  },
  header:{
    width: Constants.MAX_WIDTH,
    height: Constants.MAX_HEIGHT/4,
  },
  inputText:{
    height:50,
    borderColor:'gray',
    borderWidth:1,
    marginTop: 5
  },
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent:'center',
    alignItems:'center',
  },
  register:{
    marginTop:30,
    alignItems:'center',
    justifyContent:'center',
  },
  text:{
    fontSize:16,
  }
})


export default ForgetPassword;
