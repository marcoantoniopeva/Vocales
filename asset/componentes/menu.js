<<<<<<< HEAD
import React, { useRef, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";
import AudioComponent from './audio';
import TrazosComponent from './trazos';
import UnirComponent from './unir';

const Menu = ({ navigation }) => {
  const latidoPlay = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(latidoPlay, { toValue: 1.1, duration: 500, useNativeDriver: true }),
        Animated.timing(latidoPlay, { toValue: 1, duration: 500, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  return (
    <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>
  
        <Animated.View style={[estilos.contPlay,estilos.circulo ,{ transform: [{ scale: latidoPlay }] }]}>
          <TouchableOpacity
            style={estilos.touchable}
            onPress={() => console.log("Audio Click")}> 
            <Image
              source={require('../../frontend/image/Oreja.png')}
              style={estilos.img}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[estilos.contPlay, estilos.circulo,{ transform: [{ scale: latidoPlay }] }]}>
          <TouchableOpacity
            style={estilos.touchable}
            onPress={() => console.log("Trazos Click")}> 
            <Image
              source={require('../../frontend/image/Ojo.png')}
              style={estilos.img}
            />
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={[estilos.contPlay,estilos.circulo, { transform: [{ scale: latidoPlay }] }]}>
          <TouchableOpacity
            style={estilos.touchable}
            onPress={() => console.log("Unir Click")}> 
            <Image
              source={require('../../frontend/image/Mano.png')}
              style={estilos.img}
            />
          </TouchableOpacity>
        </Animated.View>

      </View>
    </View>
  );
};

const estilos = StyleSheet.create({
  contPrin: { 
    flex: 1, 
    backgroundColor: '#f1c9f5',
  justifyContent: 'center',
    alignItems: 'center' },
 contVoc: { 
    flexDirection: 'row',  
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  contPlay: {
    width: scale(90),
    height: verticalScale(90),
  },
 circulo: {
    width: moderateScale(110),
    height: moderateScale(110),
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
});
export default Menu;
=======
import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Image, TouchableOpacity, Animated } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

const Menu = () => {
const DIAMETRO_CIRCULO = moderateScale(110);
const COLOR_BORDE = '#3151A5';
 return (
    <View style={estilos.contPrin}>
      <View style={estilos.contVoc}>

      </View>
      </View>
   );
};
export default Menu;

const estilos = StyleSheet.create({
  contPrin: {
    flex: 1,
    backgroundColor: '#ae56b6',
  },
  contVoc: {
    flex: 1,
    backgroundColor: '#ae56b6',
    position: 'relative'
  }
  });
>>>>>>> d2f58b231f4207b54143c1e48582a61e949139d8
