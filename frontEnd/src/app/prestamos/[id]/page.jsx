export default function page({params}) {
    const {id} = params
  
    return (
      <>
        <h1>Detalle de prestamo</h1>
        <p>id: {id}</p>
      </>
    );
  }