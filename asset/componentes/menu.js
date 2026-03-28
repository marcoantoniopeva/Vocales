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