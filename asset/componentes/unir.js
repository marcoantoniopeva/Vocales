import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, Image, Animated, Easing, PanResponder, Dimensions, TouchableOpacity, Text } from "react-native";
import { scale } from "react-native-size-matters";
import Svg, { Line } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

//******** DATOS Y CONFIGURACIÓN **********
const OBJETOS = [
    { id: 'Iman', match: 'I', img: require('../../frontend/image/Iman.png') },
    { id: 'Escoba', match: 'E', img: require('../../frontend/image/Escoba.png') },
    { id: 'Oso', match: 'O', img: require('../../frontend/image/Oso.png') },
    { id: 'Uvas', match: 'U', img: require('../../frontend/image/Uvas.png') },
    { id: 'Arbol', match: 'A', img: require('../../frontend/image/ARBOL.png') },
];

const LETRAS = [
    { id: 'A', img: require('../../frontend/image/A.png') },
    { id: 'O', img: require('../../frontend/image/O.png') },
    { id: 'U', img: require('../../frontend/image/U.png') },
    { id: 'E', img: require('../../frontend/image/E.png') },
    { id: 'I', img: require('../../frontend/image/I1.png') },
];

const UnirComponent = ({ regresar }) => {

    //******** ESTADOS DEL JUEGO **********
    const [paresCorrectos, setParesCorrectos] = useState([]);
    const [lineaActiva, setLineaActiva] = useState(null);
    const [puntaje, setPuntaje] = useState(10); 
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const [idError, setIdError] = useState(null); 

    const refsVocales = useRef({});
    const refsObjetos = useRef({});

    //******** ANIMACIONES **********
    const animNubes = useRef(new Animated.Value(0)).current;
    const animExito = useRef(new Animated.Value(1)).current;
    const animErrorX = useRef(new Animated.Value(0)).current; 
    const animVictoria = useRef(new Animated.Value(0)).current; 
    
    // Animación de Opacidad del Tutorial (Inicia visible en 1)
    const animOpacidadTutorial = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Animación continua de nubes
        Animated.loop(
            Animated.timing(animNubes, {
                toValue: 1,
                duration: 20000,
                easing: Easing.linear,
                useNativeDriver: true,
            })
        ).start();
        // Se quitó la animación automática del lápiz, ahora es estático
    }, []);

    // Vigilar si ya ganaron
    useEffect(() => {
        if (paresCorrectos.length === 5) {
            setTimeout(() => {
                setJuegoTerminado(true);
                Animated.spring(animVictoria, { toValue: 1, friction: 4, tension: 40, useNativeDriver: true }).start();
            }, 500);
        }
    }, [paresCorrectos]);

    const dispararAnimacionExito = () => {
        Animated.sequence([
            Animated.timing(animExito, { toValue: 1.2, duration: 200, useNativeDriver: true }),
            Animated.timing(animExito, { toValue: 1, duration: 200, useNativeDriver: true })
        ]).start();
    };

    const dispararAnimacionError = (idTarget) => {
        setIdError(idTarget); 
        setPuntaje(prev => Math.max(0, prev - 2)); 

        Animated.sequence([
            Animated.timing(animErrorX, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(animErrorX, { toValue: -10, duration: 50, useNativeDriver: true }),
            Animated.timing(animErrorX, { toValue: 10, duration: 50, useNativeDriver: true }),
            Animated.timing(animErrorX, { toValue: 0, duration: 50, useNativeDriver: true })
        ]).start(() => setIdError(null)); 
    };

    const moverNubes = animNubes.interpolate({
        inputRange: [0, 1],
        outputRange: [-SCREEN_WIDTH * 0.2, SCREEN_WIDTH * 0.2],
    });

    const rotarVictoria = animVictoria.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    //******** LÓGICA DE UNIR (PanResponder) **********
    const getLayoutCoords = (refDict, id) => {
        const layout = refDict.current[id];
        if (!layout) return { x: 0, y: 0 };
        return {
            x: layout.x + layout.width / 2,
            y: layout.y + layout.height / 2,
        };
    };

    const checkDropCollision = (dropX, dropY, targetId, refDict) => {
        const layout = refDict.current[targetId];
        if (!layout) return false;

        const padding = 30; 
        return (
            dropX >= layout.x - padding &&
            dropX <= layout.x + layout.width + padding &&
            dropY >= layout.y - padding &&
            dropY <= layout.y + layout.height + padding
        );
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,

            onPanResponderGrant: (evt) => {
                // ✨ Al primer toque en la pantalla, el tutorial desaparece suavemente
                Animated.timing(animOpacidadTutorial, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true
                }).start();

                const { locationX, locationY } = evt.nativeEvent;

                let idTocado = null;
                let tipoTocado = null;

                for (const id in refsVocales.current) {
                    if (checkDropCollision(locationX, locationY, id, refsVocales)) {
                        idTocado = id;
                        tipoTocado = 'vocal';
                        break;
                    }
                }

                if (!idTocado) {
                    for (const id in refsObjetos.current) {
                        if (checkDropCollision(locationX, locationY, id, refsObjetos)) {
                            idTocado = id;
                            tipoTocado = 'objeto';
                            break;
                        }
                    }
                }

                const yaUnido = paresCorrectos.some(p => p.id.includes(idTocado));

                if (idTocado && !yaUnido) {
                    const coords = tipoTocado === 'vocal' ? getLayoutCoords(refsVocales, idTocado) : getLayoutCoords(refsObjetos, idTocado);
                    
                    setLineaActiva({
                        startX: coords.x,
                        startY: coords.y,
                        endX: coords.x,
                        endY: coords.y,
                        origenId: idTocado,
                        tipoOrigen: tipoTocado, 
                    });
                }
            },

            onPanResponderMove: (evt) => {
                if (lineaActiva) {
                    const { locationX, locationY } = evt.nativeEvent;
                    setLineaActiva({ ...lineaActiva, endX: locationX, endY: locationY });
                }
            },

            onPanResponderRelease: (evt) => {
                if (lineaActiva) {
                    const { locationX, locationY } = evt.nativeEvent;
                    
                    let destinoId = null;
                    let esMatch = false;

                    if (lineaActiva.tipoOrigen === 'vocal') {
                         for (const obj of OBJETOS) {
                             if (checkDropCollision(locationX, locationY, obj.id, refsObjetos)) {
                                 destinoId = obj.id;
                                 if (obj.match === lineaActiva.origenId) esMatch = true;
                                 break;
                             }
                         }
                    } 
                    else if (lineaActiva.tipoOrigen === 'objeto') {
                         for (const vocal of LETRAS) {
                             if (checkDropCollision(locationX, locationY, vocal.id, refsVocales)) {
                                 destinoId = vocal.id;
                                 const objOrigen = OBJETOS.find(o => o.id === lineaActiva.origenId);
                                 if (objOrigen && objOrigen.match === vocal.id) esMatch = true;
                                 break;
                             }
                         }
                    }

                    if (destinoId) {
                        if (esMatch) {
                            // ✨ BIEN HECHO ✨
                            const coordsDestino = lineaActiva.tipoOrigen === 'vocal' 
                                ? getLayoutCoords(refsObjetos, destinoId)
                                : getLayoutCoords(refsVocales, destinoId);
                                
                            const nuevaLinea = {
                                startX: lineaActiva.startX,
                                startY: lineaActiva.startY,
                                endX: coordsDestino.x,
                                endY: coordsDestino.y,
                                id: `${lineaActiva.origenId}_${destinoId}`
                            };
                            
                            setParesCorrectos([...paresCorrectos, nuevaLinea]);
                            dispararAnimacionExito();
                        } else {
                            // ❌ EQUIVOCADO ❌
                            dispararAnimacionError(destinoId);
                        }
                    }

                    setLineaActiva(null);
                }
            },
        })
    ).current;

    //******** RENDERIZADO **********
    return (
        <View style={estilos.contPrin}>

            {/********** Fondo 60% Moradito Suave ********** */}
            <View style={estilos.fondoMorado} />

            <Image
                source={require('../../frontend/image/nube_izquierda.png')} 
                style={estilos.nubesIzquierda}
                resizeMode="contain" 
            />
            <Image
                source={require('../../frontend/image/nube_arriba.png')} 
                style={estilos.nubesarriba}
                resizeMode="contain" 
            />
            <Image
                source={require('../../frontend/image/nube_medio_arriba.png')} 
                style={estilos.nubesArribaMedio}
                resizeMode="contain" 
            />
            <Image
                source={require('../../frontend/image/nube_derecha.png')} 
                style={estilos.nubesDerecha}
                resizeMode="contain" 
            />

            {/********** Botón de Regresar ********** */}
            <TouchableOpacity style={estilos.botonFlecha} onPress={regresar}>
                <Image source={require('../../frontend/image/Izquierda.png')} style={estilos.flecha} />
            </TouchableOpacity>

            {/********** ÁREA DE JUEGO ********** */}
            <View style={estilos.areaJuego} {...panResponder.panHandlers}>

                {/********** CAPA SVG: DIBUJO DE LÍNEAS ********** */}
                <Svg style={StyleSheet.absoluteFill}>
                    
                    {/* Línea del Tutorial Mágica Estática (Azul claro con transparencia) */}
                    <AnimatedLine 
                        x1="20%" y1="30%" 
                        x2="79%" y2="80%" 
                        stroke="rgba(135, 206, 235, 0.6)" // Azul claro transparente
                        strokeWidth="8" strokeDasharray="15, 10" strokeLinecap="round"
                        opacity={animOpacidadTutorial}
                    />

                    {paresCorrectos.map(linea => (
                        <Line
                            key={linea.id}
                            x1={linea.startX} y1={linea.startY}
                            x2={linea.endX} y2={linea.endY}
                            stroke="#3151A5" // Azul de botones
                            strokeWidth="6" strokeLinecap="round"
                        />
                    ))}

                    {lineaActiva && (
                        <Line
                            x1={lineaActiva.startX} y1={lineaActiva.startY}
                            x2={lineaActiva.endX} y2={lineaActiva.endY}
                            stroke="#8e6abf" // Lila activo
                            strokeWidth="6" strokeLinecap="round" strokeDasharray="10, 10"
                        />
                    )}
                </Svg>

                {/********** LÁPIZ DEL TUTORIAL ESTÁTICO ********** */}
                <Animated.Image 
                    source={require('../../frontend/image/lapiz.png')} 
                    style={[estilos.lapizTutorial, { 
                        opacity: animOpacidadTutorial,
                    }]} 
                />

                {/********** FILA SUPERIOR: VOCALES ********** */}
                <View style={estilos.filaSuperior}>
                    {LETRAS.map((vocal) => {
                        const yaUnida = paresCorrectos.some(p => p.id.includes(vocal.id));
                        const esError = idError === vocal.id; 
                        return (
                            <Animated.View
                                key={vocal.id}
                                style={[
                                    estilos.itemContainer,
                                    { opacity: yaUnida ? 0.4 : 1 },
                                    yaUnida && { transform: [{ scale: animExito }] },
                                    esError && { transform: [{ translateX: animErrorX }] } 
                                ]}
                                onLayout={(event) => { refsVocales.current[vocal.id] = event.nativeEvent.layout; }}
                            >
                                <Image source={vocal.img} style={estilos.imgItem} />
                            </Animated.View>
                        );
                    })}
                </View>

                {/********** FILA INFERIOR: OBJETOS ********** */}
                <View style={estilos.filaInferior}>
                    {OBJETOS.map((obj) => {
                        const yaUnida = paresCorrectos.some(p => p.id.includes(obj.id));
                        const esError = idError === obj.id; 
                        return (
                            <Animated.View
                                key={obj.id}
                                style={[
                                    estilos.itemContainer,
                                    { opacity: yaUnida ? 0.4 : 1 },
                                    yaUnida && { transform: [{ scale: animExito }] },
                                    esError && { transform: [{ translateX: animErrorX }] } 
                                ]}
                                onLayout={(event) => { refsObjetos.current[obj.id] = event.nativeEvent.layout; }}
                            >
                                <Image source={obj.img} style={estilos.imgItem} />
                            </Animated.View>
                        );
                    })}
                </View>

            </View>

            {/********** ALERTA DE VICTORIA ********** */}
            {juegoTerminado && (
                <View style={StyleSheet.absoluteFill}>
                    <View style={estilos.fondoOscuro} />
                    <Animated.View style={[estilos.modalVictoria, { transform: [{ scale: animVictoria }] }]}>
                        
                        <View style={estilos.estrellasContainer}>
                            <Animated.Image source={require('../../frontend/image/Estrella.png')} style={[estilos.estrellaWin, { transform: [{ rotate: rotarVictoria }] }]} />
                            <Animated.Image source={require('../../frontend/image/Estrella.png')} style={[estilos.estrellaWin, estilos.estrellaCentro, { transform: [{ rotate: rotarVictoria }] }]} />
                            <Animated.Image source={require('../../frontend/image/Estrella.png')} style={[estilos.estrellaWin, { transform: [{ rotate: rotarVictoria }] }]} />
                        </View>
                        
                        <Text style={estilos.textoExcelente}>¡Excelente!</Text>
                        <Text style={estilos.textoPuntaje}>Puntaje: {puntaje} / 10</Text>
                        
                        <TouchableOpacity style={estilos.btnReintentar} onPress={regresar}>
                            <Image source={require('../../frontend/image/Play.png')} style={estilos.imgPlay} />
                        </TouchableOpacity>

                    </Animated.View>
                </View>
            )}

        </View>
    );
};

// Necesario para animar opacidad directo en componente SVG
const AnimatedLine = Animated.createAnimatedComponent(Line);

//******** ESTILOS **********
const estilos = StyleSheet.create({
    contPrin: {
        flex: 1,
        backgroundColor: '#f1c9f5',
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
    },
    fondoMorado: {
        position: 'absolute',
        width: '85%',
        height: '80%',
        backgroundColor: '#f1c9f5',
        borderRadius: 30,
        borderWidth: 3,
        borderColor: '#f1c9f5'
    },
nubesarriba: {
        position: 'absolute',
        top: scale(-5), 
        left: '30%', // En medio, un poco a la izquierda
        height: scale(80), 
        width: scale(140), // Tamaño fijo para que no se estire
        opacity: 0.7, 
    },
    nubesIzquierda: {
        position: 'absolute',
        top: scale(-5), 
        left: scale(-39), // Hasta la izquierda de la pantalla
        height: scale(80), 
        width: scale(140), 
        opacity: 0.7, 
    },
    nubesArribaMedio: {
        position: 'absolute',
        top: scale(-27), 
        left: '55%', // En medio, un poco a la derecha para equilibrar
        height: scale(80), 
        width: scale(140), 
        opacity: 0.7, 
    },
    nubesDerecha: {
        position: 'absolute',
        top: scale(-24), 
        right: scale(-34), // Hasta la derecha (usamos 'right' en vez de 'left')
        height: scale(80), 
        width: scale(140), 
        opacity: 0.7, 
    },

    botonFlecha: {
        position: 'absolute',
        left: 10,
        top: '50%',
        transform: [{ translateY: -25 }],
        zIndex: 10,
    },
    flecha: { width: 60, height: 60, resizeMode: 'contain' },
    areaJuego: {
        width: '85%',
        height: '80%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    filaSuperior: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
        marginTop: 10,
    },
    filaInferior: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    itemContainer: {
        width: scale(55), 
        height: scale(55),
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgItem: { width: '100%', height: '100%', resizeMode: 'contain' },
    lapizTutorial: {
        position: 'absolute',
        width: scale(50),
        height: scale(50),
        top: '25%', // Estático aproximadamente a la mitad de la pantalla
        left: '27%', // Estático aproximadamente a la mitad de la pantalla
        resizeMode: 'contain',
        zIndex: 5,
    },
    fondoOscuro: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalVictoria: {
        position: 'absolute',
        top: '15%', left: '25%', right: '25%', bottom: '15%',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderWidth: 5,
        borderColor: '#8e6abf',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 10,
    },
    estrellasContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    estrellaWin: { width: scale(40), height: scale(40), resizeMode: 'contain', marginHorizontal: 5 },
    estrellaCentro: { width: scale(50), height: scale(50), top: -10 },
    textoExcelente: { fontSize: scale(28), fontWeight: 'bold', color: '#8e6abf', marginBottom: 5 },
    textoPuntaje: { fontSize: scale(20), fontWeight: '600', color: '#3151A5', marginBottom: 20 },
    btnReintentar: { width: scale(60), height: scale(60) },
    imgPlay: { width: '100%', height: '100%', resizeMode: 'contain' }
});

export default UnirComponent;