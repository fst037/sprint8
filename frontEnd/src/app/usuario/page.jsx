'use client'
import { redirect } from "next/navigation";

function PaginaUsuario() { 


  redirect('/usuario/' + localStorage.getItem('username'))

  return (
    <>
    </>
  );
}

export default PaginaUsuario;