import tarjetas from "../../api/listaTarjetas.js";

export default function page({params}) {
  const {id} = params

  return (
    <>
      <h1>{tarjetas.nombre}</h1>
      <p>id: {id}</p>
    </>
  );
}