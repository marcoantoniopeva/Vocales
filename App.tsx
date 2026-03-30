import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";
import Menu from './asset/componentes/menu';

const Inicio = ({ irAMenu }) => {
  const animacionA = useRef(new Animated.Value(0)).current;
  const animacionE = useRef(new Animated.Value(0)).current;
  const animacionI = useRef(new Animated.Value(0)).current;
  const animacionO = useRef(new Animated.Value(0)).current;
  const animacionU = useRef(new Animated.Value(0)).current;
  const latidoPlay = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Efecto cascada
    Animated.stagger(200, [
      Animated.timing(animacionA, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionE, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionI, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionO, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionU, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ]).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(latidoPlay,{
          toValue: 1.15,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(latidoPlay, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        })
      ])
    ).start();
  }, []);

  // LETRA A 
  const translateY_A = animacionA.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const rotate_A = animacionA.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-60deg'] });
  const opacity_A = animacionA.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  // LETRA E 
  const translateY_E = animacionE.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const rotate_E = animacionE.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-35deg'] });
  const opacity_E = animacionE.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  // LETRA I 
  const translateY_I = animacionI.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const rotate_I = animacionI.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '0deg'] });
  const opacity_I = animacionI.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  // LETRA O 
  const translateY_O = animacionO.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const rotate_O = animacionO.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '35deg'] });
  const opacity_O = animacionO.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  // LETRA U 
  const translateY_U = animacionU.interpolate({ inputRange: [0, 1], outputRange: [200, 0] });
  const rotate_U = animacionU.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '60deg'] });
  const opacity_U = animacionU.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  return (
    <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>
        
        <Animated.Image source={require('./frontend/image/A.png')} style={[ estilos.vocBase, estilos.posA, { opacity: opacity_A, transform: [{ translateY: translateY_A }, { rotate: rotate_A }] } ]} />
        <Animated.Image source={require('./frontend/image/E.png')} style={[ estilos.vocBase, estilos.posicionE, { opacity: opacity_E, transform: [{ translateY: translateY_E }, { rotate: rotate_E }] } ]} />
        <Animated.Image source={require('./frontend/image/I1.png')} style={[ estilos.vocBase, estilos.posicionI, { opacity: opacity_I, transform: [{ translateY: translateY_I }, { rotate: rotate_I }] } ]} />
      
        <Animated.View style={[estilos.contPlay, estilos.Play, { transform: [{ scale: latidoPlay }] }]}>
          <TouchableOpacity
            style={{ width: '100%', height: '100%' }}
            onPress={irAMenu}> 
            <Image
              source={require('./frontend/image/Play.png')}
              style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.Image source={require('./frontend/image/O.png')} style={[ estilos.vocBase, estilos.posicionO, { opacity: opacity_O, transform: [{ translateY: translateY_O }, { rotate: rotate_O }] } ]} />
        <Animated.Image source={require('./frontend/image/U.png')} style={[ estilos.vocBase, estilos.posicionU, { opacity: opacity_U, transform: [{ translateY: translateY_U }, { rotate: rotate_U }] } ]} />

      </View>
    </View>
  );
};

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('Inicio');

  if (pantallaActual === 'Menu') {
    return (
      <Menu /> 
    );
  }

  return (
    <Inicio irAMenu={() => setPantallaActual('Menu')} />
  );
}

const estilos = StyleSheet.create({
  contPrin: {
    flex: 1,
    backgroundColor: '#f1c9f5',
  },
  contVoc: {
    flex: 1,
    backgroundColor: '#f1c9f5',
    position: 'relative'
  },
  vocBase: {
    width: scale(65),
    height: verticalScale(65),
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
  },
  posicionI: {
    top: '15%',
    left: '45%',
    
  },
  posicionO: {
    top: '25%',
    right: '27%',
  },
  posicionU: {
    top: '62%',
    right: '17%',
  },
  contPlay: {
    width: scale(90),
    height: verticalScale(90),
    position: 'absolute'
  },
  Play: {
    top: '54%',
    left: '43%',
  },
});