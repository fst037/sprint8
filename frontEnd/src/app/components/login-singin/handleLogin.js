export default function login({usuario}) {
  //en teoria controlar con una API creada por nosotros
  localStorage.setItem('usuarioActivo', JSON.stringify({nombre: usuario}));
}

