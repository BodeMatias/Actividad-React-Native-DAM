import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import { createPanResponder } from 'react-native-color-picker/dist/utils';

export const API_URL =
  'https://api.mercadolibre.com/sites/MLA/search?q=Motorola%20G6';

export const StoreContext = createContext();

export const StoreProvider = ({children}) => {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([
    {nombre: 'Categoria 1', color: 'red', id: Math.random().toString(10)},
    {nombre: 'Categoria 2', color: 'blue', id: Math.random().toString(10)},
    {nombre: 'Categoria 3', color: 'green', id: Math.random().toString(10)},
    {nombre: 'Categoria 4', color: 'yellow', id: Math.random().toString(10)},
  ]);
  const [categoriasProductos, setCategoriasProductos] = useState({});
  const [compradoresProductos, setCompradoresProductos] = useState({});
  const [compradores, setCompradores] = useState([
    {id: '1', nombre: 'Jhonny Test', email: 'jhonnytest123@yahoo.com'},
    {id: '2', nombre: 'John Doe', email: 'j232@yahoo.com'},
    {id: '3', nombre: 'User', email: 'test1615@yahoo.com'},
  ])


  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setProductos(response.data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const agregarProductoACategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }

    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (!categoriaProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCategoriasProductos = {
        ...categoriasProductos,
        [categoria.id]: [...categoriaProductos, producto.id],
      };
      setCategoriasProductos(newCategoriasProductos);
    }
  };

  const quitarProductoDeCategoria = (categoria, producto) => {
    if (!categoria?.id || !producto?.id) {
      return; // No hay id de categoria o producto
    }
    const categoriaProductos = categoriasProductos[categoria.id] ?? [];
    if (categoriaProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCategoriasProductos({
        ...categoriasProductos,
        [categoria.id]: categoriaProductos.filter((pid) => pid !== producto.id),
      });
    }
  };

  const obtenerCategoriasDelProducto = (producto) => {
    const categoriasId = Object.keys(categoriasProductos);
    const categoriasIdDelProducto = categoriasId.reduce(
      (acc, cur) =>
        categoriasProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = categorias.filter((c) =>
      categoriasIdDelProducto.includes(c.id),
    );
    return results;
  };

  const obtenerCompradoresDelProducto = (producto) => {
    const compradorId = Object.keys(compradoresProductos);
    const compradoresIdDelProducto = compradorId.reduce(
      (acc, cur) =>
        compradoresProductos[cur].includes(producto.id) ? [...acc, cur] : acc,
      [],
    );
    const results = compradores.filter((c) =>{
     return compradoresIdDelProducto.includes(c.id)
    });
    return results;
  };

  const agregarCompradorAProducto = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return; // No hay id de comprador o producto
    }

    const compradorProductos = compradoresProductos[comprador.id] ?? [];
    if (!compradorProductos.includes(producto.id)) {
      //Si no esta lo agregamos
      const newCompradoresProductos = {
        ...compradoresProductos,
        [comprador.id]: [...compradorProductos, producto.id],
      };
      setCompradoresProductos(newCompradoresProductos);
    }
  };

  const quitarCompradorDeProducto = (comprador, producto) => {
    if (!comprador?.id || !producto?.id) {
      return; // No hay id de comprador o producto
    }
    const compradorProductos = compradoresProductos[comprador.id] ?? [];
    if (compradorProductos.includes(producto.id)) {
      //Si esta lo quitamos
      setCompradoresProductos({
        ...compradoresProductos,
        [comprador.id]: compradorProductos.filter((pid) => pid !== producto.id),
      });
    }
  };
  const agregarComprador = (comprador) => {
    setCompradores([...compradores, {id: Math.random().toString(10), ...comprador}])
  }

  const modificarComprador = (comprador) => {
    setCompradores(compradores.map(elem => elem.id === comprador.id ? comprador : elem))
  }

  const eliminarComprador = id => {
    setCompradores(compradores.filter(elem => elem.id != id))
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        productos,
        setProductos,
        categorias,
        setCategorias,
        agregarProductoACategoria,
        quitarProductoDeCategoria,
        obtenerCategoriasDelProducto,
        compradores,
        setCompradores,
        agregarComprador,
        modificarComprador,
        eliminarComprador,
        obtenerCompradoresDelProducto,
        agregarCompradorAProducto,
        quitarCompradorDeProducto
      }}>
      {children}
    </StoreContext.Provider>
  );
};
