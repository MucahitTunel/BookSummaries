import React, {Component} from 'react';
import {View, Text, StyleSheet, StatusBar, TextInput, ScrollView, TouchableOpacity, Alert} from 'react-native';
import Constants from '../../Constants';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../fonts';

class Register extends Component{

  constructor(props){
    super(props);

    this.state = {
      email:"",
      password:"",
      passwordRetry:"",
      name:"",
      surname:"",
      tel:"",
    }

    this.onChangeEmailText = this.onChangeEmailText.bind(this);
    this.onChangePasswordText = this.onChangePasswordText.bind(this);
    this.onChangePasswordRetryText = this.onChangePasswordRetryText.bind(this);
    this.onChangeAdText = this.onChangeAdText.bind(this);
    this.onChangeSoyadText = this.onChangeSoyadText.bind(this);
    this.onChangeTelText = this.onChangeTelText.bind(this);
  }

  onChangeEmailText(value){
    this.setState({
      email:value,
    })
  }

  onChangePasswordText(value){
    this.setState({
      password:value,
    })
  }

  onChangePasswordRetryText(value){
    this.setState({
      passwordRetry:value,
    })
  }

  onChangeAdText(value){
    this.setState({
      name:value,
    })
  }

  onChangeSoyadText(value){
    this.setState({
      surname:value,
    })
  }

  onChangeTelText(value){
    this.setState({
      tel:value,
    })
  }


  register = () =>{
    var url = 'http://192.168.1.106:8080/Kullanicilar/kullanici_kayit/';
    //data.append('Sifre', this.state.Sifre)
    var email = this.state.email
    var password = this.state.password
    var passwordRetry = this.state.passwordRetry
    var name = this.state.name
    var surname = this.state.surname
    var tel = this.state.tel

    var uzunluk = email.length


    if(email !== '' && password !== '' && password.length > 7 && password.length<17 && password === passwordRetry && name !== '' && surname !== '' && email.substring(uzunluk-10, uzunluk) === '@gmail.com'){
      var values = new FormData()
      values.append("Email", this.state.email)
      values.append("Password", this.state.password)
      values.append("Name", this.state.name)
      values.append("Surname", this.state.surname)
      values.append("Tel", this.state.tel)

      fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(values), // data can be `string` or {object}!
        //body: data.toString(),
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .then(response => {

        const answer = response.valueOf('message')

        if (answer.message === "1") {
          Alert.alert("Kaydınız başarıyla gerçekleştirildi")
        }else {
          Alert.alert("Bu Mail Adresi Zaten Kayıtlı");
        }
      })
      .catch(error => console.error('Hata:', error));
    }else {
      Alert.alert("Bilgilerinizi Kontrol Ediniz")

    }
  }

  render(){
    return(

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <LinearGradient colors={['#192f6a','#3b5998','#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
            <Text style={styles.buttonText}>
              KİTAP ÖZETLERİ
            </Text>

            <Text style={styles.buttonText}>
              KAYIT OL
            </Text>
          </LinearGradient>
        </View>

        <View style={styles.body}>
          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangeEmailText}
            placeholder="Email"
            underlineColorAndroid="transparent"
            textContentType="emailAddress"
            value={this.state.email}
          />

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangePasswordText}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            textContentType="password"
            value={this.state.password}
          />

          <Text style={{fontSize:12, marginBottom:10}}><Text style={{color:'red', fontSize:12}}>Not:</Text> Şifreniz en az 8 en fazla 16 karakter içermelidir.</Text>

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangePasswordRetryText}
            placeholder="Retry Password"
            secureTextEntry={true}
            underlineColorAndroid="transparent"
            textContentType="password"
            value={this.state.passwordRetry}
          />

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangeAdText}
            underlineColorAndroid="transparent"
            placeholder= "Name"
            value={this.state.ad}
          />

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangeSoyadText}
            placeholder="Surname"
            underlineColorAndroid="transparent"
            value={this.state.soyad}
          />

          <TextInput
            style={styles.inputText}
            onChangeText = {this.onChangeTelText}
            placeholder="Telephone"
            textContentType="telephoneNumber"
            underlineColorAndroid="transparent"
            value={this.state.tel}
          />

          <View style={styles.buttonBox}>
            <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <TouchableOpacity
                style={styles.button}
                onPress={this.register}
              >
                <Text style={[styles.text,{fontWeight:'bold'}]}>KAYIT OL</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>


        <StatusBar hidden={true} />
      </ScrollView>

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
  container:{
    flex:1,
    backgroundColor:'#ffffff'
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
})

export default Register;
