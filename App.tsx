import React, { } from "react";
import {View, StyleSheet, Image} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const Inicio = () =>{

  return(
    <View style={estilos.contPrin}>
      <View style={estilos.contA}>
        <Image
          source={require('./frontend/image/A.png')}
          style={estilos.imgA}
        />


      </View>
    </View>
  );
};

export default Inicio;
const estilos = StyleSheet.create({
  contPrin:{
    flex: 1,
    backgroundColor: '#87D1EE',
  },
    contA:{
    flex: 1,
    backgroundColor: '#87D1EE',
    justifyContent: 'center',
    alignItems: 'center'
  },
  imgA:{
    width: scale(60),
    height: verticalScale(60),
    resizeMode: 'contain',
    transform: [{rotate: '-50deg'}]
  }
})
