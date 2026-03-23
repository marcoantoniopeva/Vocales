import React, { } from "react";
import {View, StyleSheet, Image} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const Inicio = () =>{

  return(
    <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>
        <Image
          source={require('./frontend/image/A.png')}
          style={[estilos.vocBase,estilos.posA]}
        />
        <Image
          source={require('./frontend/image/E.png')}
          style={[estilos.vocBase, estilos.posicionE]}
        />
        <Image
          source={require('./frontend/image/I1.png')}
          style={[estilos.vocBase, estilos.posicionI]}
        />
        <Image
          source={require('./frontend/image/Play.png')}
          style={[estilos.contPlay, estilos.Play]}
        />
        <Image
          source={require('./frontend/image/O.png')}
          style={[estilos.vocBase, estilos.posicionO]}
        />
        <Image
          source={require('./frontend/image/U.png')}
          style={[estilos.vocBase, estilos.posicionU]}
        />
      </View>
    </View>
  );
};

export default Inicio;
const estilos = StyleSheet.create({
  contPrin:{
    flex: 1,
    backgroundColor: '#386070',
  },
    contVoc:{
    flex: 1,
    backgroundColor: '#a8daee',
    position:'relative'
  },
  vocBase: {
    width: scale(55),
    height: verticalScale(55),
    resizeMode: 'contain',
    position: 'absolute'
  },
  posA: {
    top:'60%',
    left: '15%',
    transform: [{rotate: '-60deg'}]
  },
  posicionE: {
    top: '25%', 
    left: '27%',
    transform: [{ rotate: '-35deg' }]
  },
  posicionI: {
    top: '15%', 
    left: '45%', 
    transform: [{ rotate: '0deg' }]
  },
  posicionO: {
    top: '25%', 
    right: '27%', 
    transform: [{ rotate: '35deg' }]
  },
  posicionU: {
    top: '62%', 
    right: '17%',
    transform: [{ rotate: '60deg' }]
  },
  contPlay: {
    width: scale(80),
    height: verticalScale(80),
    resizeMode: 'contain',
    position: 'absolute'
  },
  Play: {
    top: '60%', 
    left: '44%', 
    transform: [{ rotate: '0deg' }]
  },
})
