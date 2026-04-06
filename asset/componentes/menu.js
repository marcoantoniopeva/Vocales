import React, { useRef, useEffect, useState  } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import AudioComponent from './audio';
import TrazosComponent from './trazos';
import UnirComponent from './unir';

const Menu = ({ irAInicio }) => {

  const [pantalla, setPantalla] = useState('menu');
  const animVibrar = useRef(new Animated.Value(0)).current;
  const animNota1 = useRef(new Animated.Value(0)).current;
  const animNota2 = useRef(new Animated.Value(0)).current;
  const moveNota1 = animNota1.interpolate({
  inputRange: [0, 1],
  outputRange: [0, -10],
});
  const moveNota2 = animNota2.interpolate({inputRange: [0, 1],outputRange: [0, -15],});
const animBrillo = useRef(new Animated.Value(0)).current;

const escalaBrillo = animBrillo.interpolate({
  inputRange: [0, 1],
  outputRange: [0.5, 1.2],
});

const opacidadBrillo = animBrillo.interpolate({
  inputRange: [0, 1],
  outputRange: [0.3, 1],
});

const animGiro = useRef(new Animated.Value(0)).current;
const rotacion = animGiro.interpolate({
  inputRange: [0, 1],
  outputRange: ['0deg', '360deg'],
});

const animMano = useRef(new Animated.Value(0)).current;
const moverMano = animMano.interpolate({
  inputRange: [0, 1, 2],
  outputRange: [-300, 0, 300], 
});

  useEffect(() => {
   animVibrar.setValue(0);
  animNota1.setValue(0);
  animNota2.setValue(0);
  animBrillo.setValue(0);
  animGiro.setValue(0);
  animMano.setValue(0);

  Animated.sequence([
    Animated.timing(animVibrar, { toValue: 5, duration: 100, useNativeDriver: true }),
    Animated.timing(animVibrar, { toValue: -5, duration: 100, useNativeDriver: true }),
    Animated.timing(animVibrar, { toValue: 5, duration: 100, useNativeDriver: true }),
    Animated.timing(animVibrar, { toValue: 0, duration: 100, useNativeDriver: true }),
  ]).start();

     Animated.loop(
    Animated.sequence([
      Animated.timing(animNota1, { toValue: 1, duration: 800, useNativeDriver: true }),
      Animated.timing(animNota1, { toValue: 0, duration: 800, useNativeDriver: true }),
    ])
  ).start();

  Animated.loop(
    Animated.sequence([
      Animated.timing(animNota2, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(animNota2, { toValue: 0, duration: 1000, useNativeDriver: true }),
    ])
  ).start();
Animated.loop(
  Animated.sequence([
    Animated.timing(animBrillo, { toValue: 1, duration: 1000, useNativeDriver: true }),
    Animated.timing(animBrillo, { toValue: 0, duration: 1000, useNativeDriver: true }),
  ])
).start();
 animGiro.setValue(0);
Animated.loop(
  Animated.timing(animGiro, {
    toValue: 1,
    duration: 4000,
    useNativeDriver: true,
  })
).start();
animMano.setValue(0);

Animated.loop(
  Animated.sequence([
    Animated.timing(animMano, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }),
    Animated.delay(800), 

    Animated.timing(animMano, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.delay(800), 

    Animated.timing(animMano, {
      toValue: 2,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.delay(800), 

     Animated.timing(animMano, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.delay(800),

    Animated.timing(animMano, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }),
    Animated.delay(800),
  ])
).start();
  }, [pantalla]);

   if (pantalla === 'audio') {
    return <AudioComponent regresar={() => setPantalla('menu')} />;
  }

  if (pantalla === 'trazos') {
    return <TrazosComponent regresar={() => setPantalla('menu')} />;
  }

  if (pantalla === 'unir') {
    return <UnirComponent regresar={() => setPantalla('menu')} />;
  }

  return (
    <View style={estilos.contPrin}>
       <TouchableOpacity 
        style={estilos.botonFlecha}
        onPress={irAInicio} >
        <Image source={require('../../frontend/image/Izquierda.png')}style={estilos.flecha} />
      </TouchableOpacity>

      <View style={estilos.contVoc}>
        <Animated.Image
  source={require('../../frontend/image/Mano1.png')}
  style={[
    estilos.manoGuia,
    {
      transform: [{ translateX: moverMano }],
    },
  ]}
/>
         <View style={estilos.contenedorNota}>
        <Animated.View style={[estilos.contPlay,estilos.circulo ,{ transform: [{ translateX: animVibrar}] }]}>
          <TouchableOpacity
            style={estilos.touchable}
            onPress={() => setPantalla('audio')}>
            <Image
              source={require('../../frontend/image/Oreja.png')}
              style={estilos.img} />
          </TouchableOpacity>
        </Animated.View>

         <Animated.Image
    source={require('../../frontend/image/Musica.png')}
    style={[estilos.nota,{ left: -20,top:-50,transform: [{ translateY: moveNota1 }],},
    ]} />

  <Animated.Image
    source={require('../../frontend/image/Musica.png')}
    style={[ estilos.nota,{right: 1,top:140,transform: [{ translateY: moveNota2 }],}, ]}/>
    <Animated.Image
    source={require('../../frontend/image/Musica.png')}
    style={[ estilos.nota,{right:-60,top:10,transform: [{ translateY: moveNota2 }],}, ]}/>
     </View>

<View style={estilos.contenedorNota}>
        <Animated.View style={[estilos.contPlay, estilos.circulo,{ transform: [{ translateX: animVibrar}] }]}>
          <TouchableOpacity
            style={estilos.touchable}
             onPress={() => setPantalla('unir')}> 
            <Image
              source={require('../../frontend/image/Ojo.png')}
              style={estilos.img} 
            />
          </TouchableOpacity>
        </Animated.View>
  <Animated.Image
    source={require('../../frontend/image/Destello.png')}
    style={[
      estilos.destello,
      {
        top: -40,
        left: 2,
        opacity: opacidadBrillo,
        transform: [{ scale: escalaBrillo }],
      },
    ]}
  />
  <Animated.Image
    source={require('../../frontend/image/Destello.png')}
    style={[estilos.destello,{
        bottom: -50,
        right: 40,
        opacity: opacidadBrillo,
        transform: [{ scale: escalaBrillo }],
      },
    ]}
  />
  <Animated.Image
    source={require('../../frontend/image/Destello.png')}
    style={[estilos.destello,{
        bottom: 30,
        right: -40,
        opacity: opacidadBrillo,
        transform: [{ scale: escalaBrillo }],
      },
    ]}
  />

</View>

<View style={estilos.contenedorNota}>
        <Animated.View style={[estilos.contPlay,estilos.circulo, { transform: [{ translateX: animVibrar }] }]}>
          <TouchableOpacity
            style={estilos.touchable}
           onPress={() => setPantalla('trazos')}> 
            <Image
              source={require('../../frontend/image/Mano.png')}
              style={estilos.img}
            />
          </TouchableOpacity>
        </Animated.View>
<Animated.View
    style={{
      position: 'absolute',
      width: 250,
      height: 250,
       justifyContent: 'center', 
      alignItems: 'center',   
      transform: [{ rotate: rotacion }],
      pointerEvents: 'none'
    }}
  >
    <Image
      source={require('../../frontend/image/Estrella.png')}
      style={[estilos.estrella, { top: 0, left: 95 }]}
    />

    <Image
      source={require('../../frontend/image/Estrella.png')}
      style={[estilos.estrella, { bottom: 95, left: 0 }]}
    />

    <Image
      source={require('../../frontend/image/Estrella.png')}
      style={[estilos.estrella, { top: 180, left: 95 }]}
    />
  </Animated.View>

</View>
      </View>
       </View>
  )
};

const estilos = StyleSheet.create({
  contPrin: { 
    flex: 1, 
    backgroundColor: '#f1c9f5',
  justifyContent: 'center',
    alignItems: 'center' 
  },

 contVoc: { 
  flexDirection: 'row',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  width: '120%',
  paddingHorizontal:5,
  marginLeft: 60, 
},

  contPlay: {
    width: scale(90),
    height: verticalScale(90),
  },
 circulo: {
    width: moderateScale(120),
    height: moderateScale(120),
    borderRadius: 100,        
    borderWidth: 4,
    borderColor: '#3151A5',   
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    overflow: 'hidden'
  },

  img: { 
    width: '90%', 
    height: '90%', 
    resizeMode: 'contain' 
  },
  touchable: { 
  width: '100%', 
  height: '100%',
  justifyContent: 'center',   
  alignItems: 'center'      
},
botonFlecha: {
  position: 'absolute',
  left: 10,          
  top: '50%',        
  transform: [{ translateY: -25 }], 
},
 flecha: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  nota: {
  position: 'absolute',
  width:60,
  height: 60,
  resizeMode: 'contain',
},
contenedorNota: {
  position: 'relative', 
  justifyContent: 'center',
  alignItems: 'center',
},
destello: {
  position: 'absolute',
  width:50,
  height: 50,
  resizeMode: 'contain',
},
estrella: {
  position: 'absolute',
  width: 60,
  height: 60,
  resizeMode: 'contain',
},
manoGuia: {
  position: 'absolute',
  top: -90,
  width: 80,
  height: 80,
},
});
export default Menu;
