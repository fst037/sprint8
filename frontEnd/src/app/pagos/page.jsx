import pagos from "../api/pagos.js";
import Link from "next/link.js";

export default function page() {
  return (
    <div>
      <h1>pagos</h1>
      <ul>
        {pagos.map((pago) => (
          <Link href={`/pagos/${pago.id}`}>
            <li key={pago.id}>{pago.fecha}
            <p>{pago.monto}</p>
            <p>{pago.destinatario}</p>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}