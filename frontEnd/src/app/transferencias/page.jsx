import transferencias from "../api/transferencias.js";
import Link from "next/link.js";
import HistorialTranseferencias from "../components/historialTransferencias/HistorialTranseferencias.jsx";
import RealizarTransferencia from "../components/realizarTransferencia/RealizarTransferencia.jsx";

export default function transferencia() {
  return (
    <div>
      <section>
      <HistorialTranseferencias />
      </section>

      <section>
      <RealizarTransferencia />
      </section>
      
    </div>
  );
}
