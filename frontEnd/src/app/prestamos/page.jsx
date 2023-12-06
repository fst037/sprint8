import prestamos from "../api/prestamos.js";
import Link from "next/link.js";

export default function page() {
  return (
    <div>
      <h1>Prestamos</h1>
      <ul>
        {prestamos.map((prestamo) => (
          <Link href={`/prestamos/${prestamo.id}`}>
            <li key={prestamo.id}>{prestamo.fecha}
            <p>{prestamo.monto}</p>
            <p>{prestamo.cuotas}</p>
            <p>{prestamo.interes}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
