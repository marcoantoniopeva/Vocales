import React, { useEffect, useRef, useState } from "react";
<<<<<<< HEAD
import { View, StyleSheet, Image, TouchableOpacity, Animated ,Easing } from "react-native";
=======
import { View, StyleSheet, Image, TouchableOpacity, Animated, Easing } from "react-native";
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
import { scale, verticalScale } from "react-native-size-matters";
import Menu from './asset/componentes/menu';

const Inicio = ({ irAMenu }) => {
  const animacionA = useRef(new Animated.Value(0)).current;
  const animacionE = useRef(new Animated.Value(0)).current;
  const animacionI = useRef(new Animated.Value(0)).current;
  const animacionO = useRef(new Animated.Value(0)).current;
  const animacionU = useRef(new Animated.Value(0)).current;
  const latidoPlay = useRef(new Animated.Value(1)).current;

  const animacionAvion = useRef(new Animated.Value(0)).current;
  const animacionEstrella = useRef(new Animated.Value(0)).current;
  const animacionIglu = useRef(new Animated.Value(0)).current;
  const animacionCaraOso = useRef(new Animated.Value(-1)).current;
  const animacionUvas = useRef(new Animated.Value(1)).current;
 

  useEffect(() => {
    // Efecto cascada
    Animated.stagger(200, [
      Animated.timing(animacionA, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionE, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionI, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionO, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animacionU, { toValue: 1, duration: 1000, useNativeDriver: true }),
    ]).start();

    //*******efecto latido **********
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
<<<<<<< HEAD
     // ********animacion del Avion***********
=======

    // ********animacion del Avion***********
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacionAvion, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: true }),
        Animated.timing(animacionAvion, { toValue: -1, duration: 6000, easing: Easing.linear, useNativeDriver: true }), 
        Animated.timing(animacionAvion, { toValue: 0, duration: 3000, easing: Easing.linear, useNativeDriver: true }), 
      ])
    ).start();

    //**************animacion de estrella ****************
    Animated.loop(
      Animated.timing(animacionEstrella, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true }) 
    ).start();

//************** animacion iglu***********************
   Animated.loop(
      Animated.sequence([
        Animated.timing(animacionIglu, { toValue: 1, duration: 2500, useNativeDriver: true }),
        Animated.timing(animacionIglu, { toValue: -1, duration: 2500, useNativeDriver: true }), 
      ])
    ).start(); 

    //******************animacion cara oso **********************
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacionCaraOso, { toValue: 1, duration: 150, useNativeDriver: true }), 
        Animated.timing(animacionCaraOso, { toValue: -1, duration: 150, useNativeDriver: true }), 
      ])
    ).start();

    //****************animacion uvas **********************
    Animated.loop(
      Animated.sequence([
        Animated.timing(animacionUvas, { toValue: 1.05, duration: 1200, useNativeDriver: true }), // Crece sutilmente
        Animated.timing(animacionUvas, { toValue: 1, duration: 1200, useNativeDriver: true }), // Vuelve a su tamaño normal
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


  // Avion mueve horizontal
  const translateX_Avion = animacionAvion.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: [scale(-15), 0, scale(15)] 
  });

  //Estrella gira
  const rotate_Estrella = animacionEstrella.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'] 
  });

  // Iglu mueve vertical
  const translateY_Iglu = animacionIglu.interpolate({
    inputRange: [-1, 1],
    outputRange: [verticalScale(-5), verticalScale(5)]
  });

  // Cara oso mueve
  const rotate_CaraOso = animacionCaraOso.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg'] 
  });

  return (
     <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>
        
<<<<<<< HEAD
    <Animated.Image source={require('./frontend/image/A.png')} style={[ estilos.vocBase, estilos.posA, { opacity: opacity_A, transform: [{ translateY: translateY_A }, { rotate: rotate_A }] } ]} />
        <Animated.Image source={require('./frontend/image/E.png')} style={[ estilos.vocBase, estilos.posicionE, { opacity: opacity_E, transform: [{ translateY: translateY_E }, { rotate: rotate_E }] } ]} />
        <Animated.Image source={require('./frontend/image/I1.png')} style={[ estilos.vocBase, estilos.posicionI, { opacity: opacity_I, transform: [{ translateY: translateY_I }, { rotate: rotate_I }] } ]} />
=======
        <Animated.Image source={require('./frontend/image/A.png')} style={[ estilos.vocBase, estilos.posA, { opacity: opacity_A, transform: [{ translateY: translateY_A }, { rotate: rotate_A }] } ]} />
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
        <Animated.Image source={require('./frontend/image/Avion.png')} style={[ estilos.objBase, estilos.posAvion, { transform: [{ translateX: translateX_Avion }] } ]} />

        <Animated.Image source={require('./frontend/image/E.png')} style={[ estilos.vocBase, estilos.posicionE, { opacity: opacity_E, transform: [{ translateY: translateY_E }, { rotate: rotate_E }] } ]} />
        <Animated.Image source={require('./frontend/image/Estrella.png')} style={[ estilos.objBase, estilos.posEstrella, { transform: [{ rotate: rotate_Estrella }] } ]} />        
        
        <Animated.Image source={require('./frontend/image/I1.png')} style={[ estilos.vocBase, estilos.posicionI, { opacity: opacity_I, transform: [{ translateY: translateY_I }, { rotate: rotate_I }] } ]} />
        <Animated.Image source={require('./frontend/image/Iglu.png')} style={[ estilos.objBase, estilos.posicionIglu, { transform: [{ translateY: translateY_Iglu }] } ]} />

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
<<<<<<< HEAD

        <Animated.Image source={require('./frontend/image/U.png')} style={[ estilos.vocBase, estilos.posicionU, { opacity: opacity_U, transform: [{ translateY: translateY_U }, { rotate: rotate_U }] } ]} />
=======
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
        <Animated.Image source={require('./frontend/image/Cara_Oso1.png')} style={[ estilos.objBase, estilos.posicionCara_Oso, { transform: [{ rotate: rotate_CaraOso }] } ]} />

        <Animated.Image source={require('./frontend/image/U.png')} style={[ estilos.vocBase, estilos.posicionU, { opacity: opacity_U, transform: [{ translateY: translateY_U }, { rotate: rotate_U }] } ]} />
        <Animated.Image source={require('./frontend/image/Uvas.png')} style={[ estilos.objBase, estilos.posicionUvas, { transform: [{ scale: animacionUvas }] } ]} />
<<<<<<< HEAD
=======

>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
      </View>
    </View>
  );
};

export default function App() {
  const [pantallaActual, setPantallaActual] = useState('Inicio');

  if (pantallaActual === 'Menu') {
    return (
<<<<<<< HEAD
    <Menu irAInicio={() => setPantallaActual('Inicio')} />
=======
      <Menu irAInicio={() => setPantallaActual('Inicio')}/> 
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
    );
  }

  return (
    <Inicio irAMenu={() => setPantallaActual('Menu')} />
  );
}

const estilos = StyleSheet.create({
  contPrin: {
    flex: 1,
<<<<<<< HEAD
    backgroundColor: '#f1c9f5',
  },
  contVoc: {
    flex: 1,
    backgroundColor: '#f1c9f5',
=======
    backgroundColor: '#ee12d150',
  },
  contVoc: {
    flex: 1,
    backgroundColor: 'transparent',
>>>>>>> 919c98e55b5a78574fcd93a945b8f384b6af7add
    position: 'relative'
  },
  vocBase: {
    width: scale(65),
    height: verticalScale(65),
    resizeMode: 'contain',
    position: 'absolute'
  },
   objBase: {
    width: scale(60),
    height: verticalScale(60),
    resizeMode: 'contain',
    position: 'absolute'
  },
  posA: {
    top: '60%',
    left: '15%',
  },
    posAvion: {
    top: '70%',
    left: '25%',
  },
  posicionE: {
    top: '25%',
    left: '27%',
  },
    posEstrella: {
    top: '12%',
    left: '22%',
  },
  posicionI: {
    top: '8%',
    left: '45%',
    
  },
    posicionIglu: {
    top: '28%',
    left: '45%',
    
  },
  posicionO: {
    top: '25%',
    right: '27%',
  },
    posicionCara_Oso: {
    top: '9%',
    right: '24%',
  },
  posicionU: {
    top: '62%',
    right: '17%',
  },
    posicionUvas: {
    top: '68%',
    right: '27%',
  },
  contPlay: {
    width: scale(90),
    height: verticalScale(90),
    position: 'absolute'
  },
  Play: {
    top: '48%',
    left: '43%',
  },
});