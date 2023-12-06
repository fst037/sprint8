'use client'

import React, { useState } from 'react';
import FormularioDeContacto from '../components/FormularioContacto/FormularioDeContacto';

export default function ContactPage() {


  return (
    <div>
      <FormularioDeContacto />
     <h2>Contacto</h2>
      <p>Si tienes preguntas, comentarios o inquietudes, no dudes en ponerte en contacto con nosotros.</p>
      <p>Estamos aquí para ayudarte en lo que necesites.</p>

      <h2>Información de Contacto</h2>
      <p>Correo Electrónico: <a href="mailto:info@itbank.com">info@itbank.com</a></p>
      <p>Teléfono: +123 456 789</p>

      <h2>Horario de Atención</h2>
      <p>Nuestro equipo de atención al cliente está disponible de lunes a viernes, de 9:00 a.m. a 6:00 p.m.</p>
      <p>Si nos contactas fuera de este horario, te responderemos tan pronto como sea posible en el siguiente día hábil.</p>

      <h2>Ubicación</h2>
      <p>Estamos ubicados en Avenida Siemprevida 742.</p>
      <p>¡Esperamos con interés poder asistirte!</p>

    
    </div>
  );
}

