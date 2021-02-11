import {CheckBox, Divider, List, Text} from '@ui-kitten/components';
import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {StoreContext} from '../context/storeContext';

const styles = StyleSheet.create({
  chip: {width: 30, height: 10, borderRadius: 10},
  list: {backgroundColor: 'transparent', marginTop: 10},
  item: {paddingVertical: 20},
});

export default SeleccionarComprador = ({producto}) => {
  const {
    compradores,
    obtenerCompradoresDelProducto,
    agregarCompradorAProducto,
    quitarCompradorDeProducto,
  } = useContext(StoreContext);
  const compradoresDelProducto = obtenerCompradoresDelProducto(producto);

  const renderItem = ({item}) => {
    const comprador = item;

    const compradorAsignado = compradoresDelProducto
      .map((c) => c.id)
      .includes(comprador.id);

    return (
      <View style={styles.item}>
        <CheckBox
          status="primary"
          checked={compradorAsignado}
          onChange={() => {
            if (!compradorAsignado) {
              agregarCompradorAProducto(comprador, producto);
            } else {
              quitarCompradorDeProducto(comprador, producto);
            }
          }}>
          <Text category="s1">
            {comprador.nombre}
          </Text>
        </CheckBox>
      </View>
    );
  };

  return (
    <List
      style={styles.list}
      data={compradores}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};
