'use client'
import FormularioLogin from "../login-singin/FormularioLogin";
import OpcionesStaff from "../staff/OpcionesStaff";
import { usePathname } from 'next/navigation'

export default function ProtectorPagina ({children}) {  
  const usuarioActivo = typeof window !== 'undefined' ? localStorage.getItem('username') : undefined;
  const isStaff = typeof window !== 'undefined' ? localStorage.getItem('is_staff') : undefined;

  return (
    <>      
      {usuarioActivo != undefined ?            
          <>
            {
              isStaff === 'true' ?
                <>
                  <OpcionesStaff />
                </>
              :
                <>
                  {children}
                </>
            }
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
  );
};