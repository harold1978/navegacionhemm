import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../storage/fire';

export default function Ingresos({ navigation }) {
  const [nuevo, setNuevo] = useState({
    fecha: new Date().toLocaleDateString(),
    nombre: '',
    descripcion: '',
    monto: '',
  });
  const [ingresos, setingresos] = useState([]);

  const guardarIngresos = async (registro) => {
    try {
      if (registro.id) {
        await updateDoc(doc(db, 'tbl_ingresos', registro.id), registro);
        cargarLocalStorage();
        return;
      }
      await addDoc(collection(db, 'tbl_ingresos'), registro);
      cargarLocalStorage();
    } catch (error) {}
  };
  const guardardato = () => {
    guardarIngresos(nuevo);
    setNuevo({
      fecha: new Date().toLocaleDateString(),
      nombre: '',
      descripcion: '',
      monto: '',
    });
  };
  const subeliminar = async ({ item }) => {
    try {
      await deleteDoc(doc(db, 'tbl_ingresos', item.id));
      cargarLocalStorage();
    } catch (error) {
      console.error('Error removing document: ', error);
    }
  };
  const subactualizar = ({ item }) => {
    console.log({ item });
    setNuevo(item);
  };
  const frender = ({ item }) => {
    return (
      <View style={styles.item}>
        <Text style={styles.titulo}>
          {item.nombre} - {item.id}
        </Text>
        <Text>{item.descripcion}</Text>
        <Text>{item.monto}</Text>
        <Text>{item.fecha}</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={styles.btnD}
            onPress={() => subeliminar({ item })}
          >
            <Text>ELIMINAR</Text>
          </TouchableOpacity>
          <Button title="Editar" onPress={() => subactualizar({ item })} />
        </View>
      </View>
    );
  };

  useEffect(() => {
    cargarLocalStorage();
  }, []);
  const cargarLocalStorage = async () => {
    const datosaux = await getDocs(collection(db, 'tbl_ingresos'));
    const datos = datosaux.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    console.log(datos);
    setingresos(datos);
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
  item: { backgroundColor: '#bbd0f7', padding: 20, marginVertical: 8 },
  btnContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  btnD: { backgroundColor: 'red', padding: 10, color: 'white' },
});
