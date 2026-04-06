import React, { useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";

const TrazoIComponent = ({ regresar, siguiente }) => {
  
  //******** Animaciones de Brillo y Giro **********
  const animBrilloRef = useRef(new Animated.Value(0));
  const animBrillo = animBrilloRef.current;
  
  const animLapizGiroRef = useRef(new Animated.Value(0));
  const animLapizGiro = animLapizGiroRef.current;
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
  const moverX = animProgresoTrazo.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 0]  
  });

  const moverY = animProgresoTrazo.interpolate({
    inputRange: [0, 100],
    outputRange: [-60, 140] 
  });

  useEffect(() => {
    // Reiniciar animaciones al montar el componente
    animProgresoTrazo.setValue(0);
    animBrillo.setValue(0);
    animLapizGiro.setValue(0);

    //******** Animación de Brillo **********
    const animacionBrillo = Animated.loop(
      Animated.sequence([
        Animated.timing(animBrillo, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(animBrillo, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );

    //******** Animación del Lápiz (Giro) **********
    const animacionLapiz = Animated.loop(
      Animated.sequence([
        Animated.timing(animLapizGiro, { toValue: 1, duration: 300, useNativeDriver: true }),
        Animated.timing(animLapizGiro, { toValue: 0, duration: 300, useNativeDriver: true }),
      ])
    );

    //******** Animación del Trazo (Movimiento vertical) **********
    const animacionDibujo = Animated.loop(
      Animated.sequence([
        Animated.timing(animProgresoTrazo, { 
          toValue: 100, 
          duration: 3000,  // 3 segundos para el trazo vertical
          useNativeDriver: true 
        }),
        Animated.delay(500), // Pausa antes de reiniciar
        Animated.timing(animProgresoTrazo, { 
          toValue: 0, 
          duration: 0,  
          useNativeDriver: true 
        })
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
      
      {/* Botón Izquierda (Regresar) */}
      <TouchableOpacity 
        style={estilos.botonFlecha}
        onPress={regresar}
      >
        <Image 
          source={require('../../frontend/image/Izquierda.png')} 
          style={estilos.flecha} 
        />
      </TouchableOpacity>

      <View style={estilos.contenedorLetra}>
        
        {/* Cambiar la imagen a I_guia.png */}
        <Image
          source={require('../../frontend/image/I_guia.png')}
          style={estilos.letraGuia}
        />

        <Animated.Image
          source={require('../../frontend/image/lapiz.png')}
          style={[
            estilos.lapiz,
            { 
              transform: [
                { translateX: moverX }, 
                { translateY: moverY }, 
                { rotate: rotacionLapiz } 
              ] 
            }
          ]}
        />
      </View>

      {/* Destellos decorativos */}
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

      {/* Botón Derecha (Siguiente) */}
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
    width: 70,  
    height: 70,
    top: 30,    
    left: 60,   
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

export default TrazoIComponent;