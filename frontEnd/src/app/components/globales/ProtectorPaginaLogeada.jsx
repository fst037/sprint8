'use client'
import { useRouter } from 'next/router';
import FormularioLogin from "../login-singin/FormularioLogin";

export default function ProtectorPagina ({children}) {  
  const router = useRouter();
  const usuarioActivo = typeof window !== 'undefined' ? localStorage.getItem('username') : undefined;
  const isStaff = typeof window !== 'undefined' ? localStorage.getItem('is_staff') : undefined;

  useEffect(() => {
    if (usuarioActivo && isStaff === 'true') {
      router.push('/staff');
    } else if (usuarioActivo) {
      router.push('/user');
    }
  }, [usuarioActivo, isStaff]);

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
  );
};