import { View, Text, Button, StyleSheet } from 'react-native';
import React from 'react';

export default function Home({ navigation }) {
  return (
    <View style={styles.titulo}>
      <Text>Home</Text>
      <View style={styles.container}>
        <Button
          title="INGRESOS"
          onPress={() => navigation.navigate('Ingresos')}
        />
        <Button title="GASTOS" onPress={() => navigation.navigate('Gastos')} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1, // Ocupa toda la pantalla
    flexDirection: 'row',
    justifyContent: 'center', // Centra verticalmente
    alignItems: 'center', // Centra horizontalmente
    gap: 20, // Espacio entre los botones (RN 0.71+), si no funciona usa margin
  },
  titulo: {
    alignItems: 'center', // Centra horizontalmente
    marginTop: 50,
    paddingBottom: 20,
  },
});
