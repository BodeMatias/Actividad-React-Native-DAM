import React, {useState, useContext} from 'react';
import {Button, Layout, Icon, Modal, Card, Input, List, ListItem, Text} from '@ui-kitten/components';
import { View, StyleSheet  } from 'react-native';
import {StoreContext} from '../context/storeContext';


export const Compradores = () => {
	const [visible, setVisible] = useState(false);
	const [compradorSeleccionado, setCompradorSeleccionado] = useState({id: '', nombre: '', email: ''});
	const [nameInputValue, setNameInputValue] = useState('');
	const [emailInputValue, setEmailInputValue] = useState('');
	const [operacion, setOperacion] = useState('');
	const {compradores, setCompradores} = useContext(StoreContext);
  const {agregarComprador} = useContext(StoreContext);
  const {modificarComprador} = useContext(StoreContext);
  const {eliminarComprador} = useContext(StoreContext);

	const styles = StyleSheet.create({
		button_plus: {
			width: 60,
			height: 60,
			borderRadius: 30,
			alignSelf: 'center',
			marginBottom: 20,
			marginTop: 20
		},
		backdrop: {
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
		modal: {
			width: 300
		},
		button_container: {
			flex: 1,
			flexDirection: 'row',
		},
		button_layout: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
		},
	})

	let clearAll = _ => {
		setVisible(false);
		setOperacion('');
		setEmailInputValue('');
		setNameInputValue('');
		setCompradorSeleccionado({id: '', nombre: '', email: ''})
	}

	const OPERACION = {
		EDITAR: 'EDITAR',
		CREAR: 'CREAR'
	}

	const PlusIcon = (props) => (
		<Icon {...props} name='plus'/>
	);

	const EditIcon = (props) => (
		<Icon {...props} name="edit"/>
	)

	const DeleteIcon = (props) => (
		<Icon {...props} fill="red" name="trash-2-outline"/>
	)
	const acciones = (props, item) => (
		<>

			<Button
				onPress={() => {
					setCompradorSeleccionado(item);
					setOperacion(OPERACION.EDITAR);
					setVisible(true);
				}}
				appearance='ghost'
				accessoryLeft={EditIcon}
			/>
			
			<Button
				onPress={() => {
					eliminarComprador(item.id)
				}}
				appearance='ghost'
				accessoryLeft={DeleteIcon}
			/>

		</>
	)
		
	return(
		<View style={{position: 'relative', height: '100%', width: '100%'}}>

			<Modal
				style={styles.modal}
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true}>
          <Text>Nombre</Text>
					<Input value={nameInputValue} onChangeText={text => setNameInputValue(text)}></Input>
					<Text>Email</Text>
					<Input value={emailInputValue} onChangeText={text => setEmailInputValue(text)}></Input>
					<Layout style={styles.button_container}>
						<Layout style={styles.button_layout}>
							<Button onPress={() => {
								clearAll();
							}}>
								CANCELAR
							</Button>
						</Layout>
						<Layout style={styles.button_layout}>
							<Button onPress={() => {
								if(operacion === OPERACION.CREAR){
									agregarComprador({ nombre: nameInputValue, email: emailInputValue})
								} else {
									modificarComprador({...compradorSeleccionado, nombre: nameInputValue, email: emailInputValue})
								}
								clearAll();
							}}>
								ACEPTAR
							</Button>
						</Layout>
					</Layout>
        </Card>
      </Modal>

			<List
				data={compradores}
				renderItem={
					({item}) => 
						<ListItem
							title = {item.nombre}
							description = {item.email}
							accessoryRight = {(props) => acciones(props, item)}
						/>
				}
			/>
			<Button
				onPress={() => {
					setOperacion(OPERACION.CREAR);
					setVisible(true);
				}}
				status='primary' 
				style={styles.button_plus}
				accessoryLeft={PlusIcon}
			/>
		</View>
	)

}