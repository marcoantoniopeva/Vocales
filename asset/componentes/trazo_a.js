import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";

const TrazoA = ({ regresar, siguiente }) => {

  //******** Animaciones de Brillo y Giro **********
  const animBrilloRef = useRef(new Animated.Value(0));
  const animBrillo = animBrilloRef.current;
  
  const animLapizGiroRef = useRef(new Animated.Value(0));
  const animLapizGiro = animLapizGiroRef.current;

  // ✨ NUEVA ANIMACIÓN: El progreso del trazo (de 0 a 100) ✨
  const animProgresoTrazo = useRef(new Animated.Value(0)).current;

  const escalaBrillo = animBrillo.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.2],
  });

  const opacidadBrillo = animBrillo.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 1],
  });

  const rotacionLapiz = animLapizGiro.interpolate({
    inputRange: [0, 1],
    outputRange: ['-15deg', '15deg'],
  });

  //******** RUTA DEL LÁPIZ PARA LA LETRA "A" **********
  // Piensa en esto como un mapa. El lápiz viaja del paso 0 al 100.
  const moverX = animProgresoTrazo.interpolate({
    inputRange:  [0,  15,  30,  45, 60,  70,  75,  80, 100], 
    //            Inicio |  Círculo izquierdo  | Salto | Línea vertical abajo
    outputRange: [0, -30, -80, -20,  0,   0,  15,  15,  15] 
  });

  const moverY = animProgresoTrazo.interpolate({
    inputRange:  [0,  15,  30,  45, 60,  70,  75,  80, 100],
    outputRange: [0,  15,  50,  90, 85,   0, -10, -10,  95] 
  });

  useEffect(() => {

animProgresoTrazo.setValue(0);
animBrillo.setValue(0);
animLapizGiro.setValue(0);
    //******** Animacion de Brillo **********
    const animacionBrillo = Animated.loop(
      Animated.sequence([
        Animated.timing(animBrillo, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(animBrillo, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );

    //******** Animacion del Lápiz (Giro) **********
    const animacionLapiz = Animated.loop(
      Animated.sequence([
        Animated.timing(animLapizGiro, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(animLapizGiro, { toValue: 0, duration: 300, useNativeDriver: true }),
      ])
    );

    //******** Animacion del Trazo (Movimiento en la ruta) **********
    const animacionDibujo = Animated.loop(
      Animated.sequence([
        Animated.timing(animProgresoTrazo, { toValue: 100, duration: 3500, useNativeDriver: true }), // Tarda 3.5 segundos en dibujar
        Animated.delay(500), // Pausa medio segundo al terminar
        Animated.timing(animProgresoTrazo, { toValue: 0, duration: 0, useNativeDriver: true }) // Regresa al inicio al instante (invisible)
      ])
    );

    animacionBrillo.start();
    animacionLapiz.start();
    animacionDibujo.start();

    return () => {
      animacionBrillo.stop();
      animacionLapiz.stop();
      animacionDibujo.stop();
    };
  }, []);

  return (
    <View style={estilos.container}>
      
      {/********* Boton Izquierda (Regresar) **********/}
      <TouchableOpacity 
        style={estilos.botonFlecha}
        onPress={regresar}
      >
        <Image 
          source={require('../../frontend/image/Izquierda.png')} 
          style={estilos.flecha} 
        />
      </TouchableOpacity>

      {/********* Contenedor Central (Letra y Lápiz) **********/}
      {/* Metemos la letra y el lápiz aquí para que las coordenadas funcionen perfecto */}
      <View style={estilos.contenedorLetra}>
        
        <Image
          source={require('../../frontend/image/trazo_a.png')}
          style={estilos.letraGuia}
        />

        <Animated.Image
          source={require('../../frontend/image/lapiz.png')}
          style={[
            estilos.lapiz,
            { 
              transform: [
                { translateX: moverX }, // Sigue el mapa en X
                { translateY: moverY }, // Sigue el mapa en Y
                { rotate: rotacionLapiz } // Sigue girando
              ] 
            }
          ]}
        />
      </View>

      {/********* Destellos **********/}
      <Animated.Image
        source={require('../../frontend/image/Destello.png')}
        style={[
          estilos.destello,
          {
            top: 300,
            left: 200,
            opacity: opacidadBrillo,
            transform: [{ scale: escalaBrillo }],
          },
        ]}
      />

      <Animated.Image
        source={require('../../frontend/image/Destello.png')}
        style={[
          estilos.destello,
          {
            top: 300,
            right: 180,
            opacity: opacidadBrillo,
            transform: [{ scale: escalaBrillo }],
          },
        ]}
      />

      <Animated.Image
        source={require('../../frontend/image/Destello.png')}
        style={[
          estilos.destello,
          {
            top: 80,
            right: 180,
            opacity: opacidadBrillo,
            transform: [{ scale: escalaBrillo }],
          },
        ]}
      />

      {/********* Boton Derecha (Siguiente) **********/}
      <TouchableOpacity 
        style={estilos.botonDerecha}
        onPress={siguiente}
      >
        <Image 
          source={require('../../frontend/image/Derecha.png')} 
          style={estilos.flecha} 
        />
      </TouchableOpacity>

    </View>
  );
};

//******** ESTILOS **********
const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1c9f5', 
    justifyContent: 'center',
    alignItems: 'center',
  },
  botonFlecha: {
    position: 'absolute',
    left: 10,
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
  botonDerecha: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -25 }],
    zIndex: 10,
  },
  flecha: {
    width: 60,
    height: 60,
    resizeMode: 'contain'
  },
  contenedorLetra: {
    width: 250,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative' 
  },
  letraGuia: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  lapiz: {
    position: 'absolute',
    width: 90,  
    height: 90,
    top: 10,   
    left: 75,  
    resizeMode: 'contain',
    zIndex: 5,
  },
  destello: {
    position: 'absolute',
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});

export default TrazoA;