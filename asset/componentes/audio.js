import React, { useState, useEffect, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Image, Animated } from "react-native";
import Sound from 'react-native-sound';

const Audio = ({ regresar }) => {

  const [sonidoActual, setSonidoActual] = useState(null);
  const [sonando, setSonando] = useState(null);

  const animOnda = useRef(new Animated.Value(0)).current;

  const reproducirAudio = (nombre, letra) => {

    if (sonidoActual) {
      sonidoActual.stop(() => sonidoActual.release());
    }

    const sonido = new Sound(nombre, Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log("Error:", error);
        return;
      }

      sonido.setVolume(1.0); // 🔊 volumen máximo

      setSonando(letra);

      animOnda.setValue(0);
      Animated.loop(
        Animated.timing(animOnda, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        })
      ).start();

      sonido.play(() => {
        sonido.release();
        setSonidoActual(null);
        setSonando(null);
      });
    });

    setSonidoActual(sonido);
  };

  useEffect(() => {
    return () => {
      if (sonidoActual) {
        sonidoActual.stop(() => sonidoActual.release());
      }
    };
  }, [sonidoActual]);

  return (
    <View style={estilos.contPrin}>

      <TouchableOpacity style={estilos.botonFlecha} onPress={regresar}>
        <Image source={require('../../frontend/image/Izquierda.png')} style={estilos.flecha} />
      </TouchableOpacity>

      <View style={estilos.contenedorVocales}>

        {/* A */}
        <View style={estilos.recuadro}>
          <Image source={require('../../frontend/image/A.png')} style={estilos.vocal} />
          {sonando === 'A' && <Onda animOnda={animOnda} />}
          <TouchableOpacity onPress={() => reproducirAudio('aud_a.mp3','A')}>
            <Image source={require('../../frontend/image/Play.png')} style={estilos.play} />
          </TouchableOpacity>
        </View>

        {/* E */}
        <View style={estilos.recuadro}>
          <Image source={require('../../frontend/image/E.png')} style={estilos.vocal} />
          {sonando === 'E' && <Onda animOnda={animOnda} />}
          <TouchableOpacity onPress={() => reproducirAudio('aud_e.mp3','E')}>
            <Image source={require('../../frontend/image/Play.png')} style={estilos.play} />
          </TouchableOpacity>
        </View>

        {/* I */}
        <View style={estilos.recuadro}>
          <Image source={require('../../frontend/image/I1.png')} style={estilos.vocal} />
          {sonando === 'I' && <Onda animOnda={animOnda} />}
          <TouchableOpacity onPress={() => reproducirAudio('aud_i.mp3','I')}>
            <Image source={require('../../frontend/image/Play.png')} style={estilos.play} />
          </TouchableOpacity>
        </View>

        {/* O */}
        <View style={estilos.recuadro}>
          <Image source={require('../../frontend/image/O.png')} style={estilos.vocal} />
          {sonando === 'O' && <Onda animOnda={animOnda} />}
          <TouchableOpacity onPress={() => reproducirAudio('aud_o.mp3','O')}>
            <Image source={require('../../frontend/image/Play.png')} style={estilos.play} />
          </TouchableOpacity>
        </View>

        {/* U */}
        <View style={estilos.recuadro}>
          <Image source={require('../../frontend/image/U.png')} style={estilos.vocal} />
          {sonando === 'U' && <Onda animOnda={animOnda} />}
          <TouchableOpacity onPress={() => reproducirAudio('aud_u.mp3','U')}>
            <Image source={require('../../frontend/image/Play.png')} style={estilos.play} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
};

const Onda = ({ animOnda }) => (
  <Animated.View
    style={[
      estilos.onda,
      {
        transform: [{
          scale: animOnda.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 2],
          }),
        }],
        opacity: animOnda.interpolate({
          inputRange: [0, 1],
          outputRange: [0.6, 0],
        }),
      },
    ]}
  />
);

const estilos = StyleSheet.create({
  contPrin: { 
    flex: 1, 
    backgroundColor: '#f1c9f5', 
    justifyContent: 'center', 
    alignItems: 'center', 
}, 
botonFlecha: { 
    position: 'absolute',
     left: 10, top: '50%',
      transform: [{ translateY: -25 }], 
    }, 
    flecha: { 
     width: 60, 
    height: 60,
    resizeMode: 'contain',
         }, 
    contenedorVocales: { 
    flexDirection: 'row',
    alignItems: 'center', 
    position: 'absolute', left: 80, 
    }, 
    recuadro: { 
    width: 142, 
    height: 320, 
    borderWidth: 4,
    borderColor: '#3151A5',
    borderRadius: 3, 
    backgroundColor: '#fff', 
    justifyContent: 'flex-start', 
    paddingTop: 30, alignItems: 'center', 
    marginHorizontal: 10, }, 
    
    vocal: { 
    width: '80',
    height: '80', 
    resizeMode: 'contain', 
    marginTop: -10, },
    
    play: { 
    width: 80, 
    height: 80, 
    resizeMode: 'contain', 
    marginTop: 100, 
}, 
  onda: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#ee6aff',
    top: 10,
  },
});

export default Audio;