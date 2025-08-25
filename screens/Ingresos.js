import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Ingresos({ navigation }) {
  const [nuevo, setNuevo] = useState({
    id: '',
    fecha: new Date().toLocaleDateString(),
    nombre: '',
    descripcion: '',
    monto: '',
  });
  const [ingresos, setingresos] = useState([]);

  const guardarIngresos = async (lista) => {
    await AsyncStorage.setItem('ingresos', JSON.stringify(lista));
  };
  const guardardato = () => {
    const dato = { ...nuevo, id: Date.now().toString() };
    const list = [...ingresos, dato];
    setingresos(list);
    guardarIngresos(list);
    setNuevo({
      id: '',
      fecha: new Date().toLocaleDateString(),
      nombre: '',
      descripcion: '',
      monto: '',
    });
  };
  const frender = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.titulo}>{item.nombre}</Text>
        <Text>{item.descripcion}</Text>
        <Text>{item.monto}</Text>
        <Text>{item.fecha}</Text>
      </View>
    );
  };

  useEffect(() => {
    cargarLocalStorage();
  }, []);
  const cargarLocalStorage = async () => {
    const datos = await AsyncStorage.getItem('ingresos');
    if (datos) {
      setingresos(JSON.parse(datos));
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Ingresos</Text>
      <TextInput
        style={styles.input}
        placeholder="NOMBRE"
        value={nuevo.nombre}
        onChangeText={(valor) => setNuevo({ ...nuevo, nombre: valor })}
      />
      <TextInput
        style={styles.input}
        placeholder="DESCRIPCION"
        value={nuevo.descripcion}
        onChangeText={(valor) => setNuevo({ ...nuevo, descripcion: valor })}
      />
      <TextInput
        style={styles.input}
        placeholder="MONTO"
        value={nuevo.monto}
        keyboardType="numeric"
        onChangeText={(valor) => setNuevo({ ...nuevo, monto: valor })}
      />
      <Button title="Guardar" onPress={guardardato} />

      <FlatList
        data={ingresos}
        keyExtractor={(item) => item.id}
        renderItem={frender}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 30 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, marginVertical: 5, padding: 8, borderRadius: 5 },
  item: { backgroundColor: '#bc400b', padding: 20, marginVertical: 8 },
});
