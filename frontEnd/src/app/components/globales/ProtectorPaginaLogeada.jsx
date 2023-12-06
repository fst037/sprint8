'use client'
import FormularioLogin from "../login-singin/FormularioLogin";
import { redirect, usePathname } from 'next/navigation';

export default function ProtectorPagina ({children}) {  
  
  const usuarioActivo = typeof window !== 'undefined' ? localStorage.getItem('username') : undefined;
  
  return (
    <>      
      {usuarioActivo != undefined ?            
          <>
            {children}
          </>
          :
          <>
            {usePathname() != '/login' && usePathname() != '/register' ?
              <>
                <FormularioLogin />
              </>
            : 
              <>
                {children}
              </>
            }
          </>
        }
    </>
  )};
