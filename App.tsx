import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const Inicio = ({ navigation }) => {
  const animacionA = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animacionA, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const translateY_A = animacionA.interpolate({
    inputRange: [0, 1],
    outputRange: [200, 0],
  });

  const rotate_A = animacionA.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '-60deg'],
  });

  const opacity_A = animacionA.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>
        <Animated.Image
          source={require('./frontend/image/A.png')}
          style={[
            estilos.vocBase,
            estilos.posA,
            {
              opacity: opacity_A,
              transform: [
                { translateY: translateY_A },
                { rotate: rotate_A },
              ]
            }
          ]}
        />

        <Image
          source={require('./frontend/image/E.png')}
          style={[estilos.vocBase, estilos.posicionE]}
        />
        
        <Image
          source={require('./frontend/image/I1.png')}
          style={[estilos.vocBase, estilos.posicionI]}
        />

        <TouchableOpacity
          style={[estilos.contPlay, estilos.Play]}
          onPress={() => navigation.navigate('Menu')}> 
          <Image
            source={require('./frontend/image/Play.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
          />
        </TouchableOpacity>

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
  contPrin: {
    flex: 1,
    backgroundColor: '#ae56b6',
  },
  contVoc: {
    flex: 1,
    backgroundColor: '#ae56b6',
    position: 'relative'
  },
  vocBase: {
    width: scale(55),
    height: verticalScale(55),
    resizeMode: 'contain',
    position: 'absolute'
  },
  posA: {
    top: '60%',
    left: '15%',
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
    position: 'absolute'
  },
  Play: {
    top: '60%',
    left: '44%',
  },
});