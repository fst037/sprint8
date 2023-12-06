import transferencias from "../../api/transferencias.js";

export default function page({params}) {
  const {id} = params

  return (
    <>
      <h1>Detalle de transferencia</h1>
      <p>id: {id}</p>
    </>
  );
}

