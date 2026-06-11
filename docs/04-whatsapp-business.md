# WhatsApp Business - Respuestas Rapidas y Flujo Comercial

## Configuracion inicial

La URL publica se configura una sola vez en `beachhouse-app/assets/js/site-config.js`.
Mientras el valor `publicSiteUrl` este vacio, la web utiliza automaticamente su URL actual.

Etiquetas recomendadas:

- Nuevo contacto
- Web-P1
- Web-P2
- Web-P3
- Web-P4
- Fecha por confirmar
- Pago pendiente
- Reserva confirmada
- Postventa

No enviar datos de pago antes de confirmar disponibilidad. La reserva queda separada
solo despues de validar el adelanto del 50% y enviar la confirmacion por WhatsApp.

## /bienvenida

```text
¡Hola, {nombre}! Gracias por comunicarte con Beach House Santa Rosa.

Alquilamos una casa privada con piscina, parrilla y espacios sociales para celebraciones, reuniones y escapadas.

Para ayudarte, indicanos:
• Fecha que deseas reservar
• Paquete de interes
• Cantidad de personas

Conoce la casa, fotos y paquetes aqui:
🌐 [LINK_WEB]
```

## /p1

```text
El paquete P1 - 1/2 dia incluye uso privado de la casa, piscina, parrilla, cocina, patio y terraza.

🕐 Horario: 11:30 a. m. a 10:00 p. m.
👥 Capacidad: hasta 15 personas
💰 Martes a jueves: desde S/420
💰 Viernes, domingo y lunes: desde S/450
🛡️ Garantia reembolsable: S/350

La fecha se separa abonando el 50% del alquiler. La garantia se paga antes del ingreso y se devuelve despues de verificar los espacios.

¿Confirmamos disponibilidad para el {fecha}?
```

## /p2

```text
El paquete P2 - 24 horas incluye la casa privada, una noche de alojamiento, habitaciones, cocina, piscina, patio y terraza.

🕐 Ingreso: 11:30 a. m.
🕐 Salida: 11:30 a. m. del dia siguiente
👥 Capacidad: hasta 20 personas
💰 Martes a jueves: desde S/600
💰 Viernes, domingo y lunes: desde S/680
🛡️ Garantia reembolsable: S/350

La fecha se separa abonando el 50% del alquiler. La garantia se paga antes del ingreso.

¿Confirmamos disponibilidad para el {fecha}?
```

## /p3

```text
El paquete P3 - 2 dias / 1 noche incluye alojamiento, habitaciones, piscina privada, parrilla, cocina, patio y terraza.

🕐 Ingreso: 11:30 a. m.
🕐 Salida: 10:00 p. m. del segundo dia
👥 Capacidad: hasta 20 personas
💰 Lunes a jueves: desde S/850
💰 Viernes a domingo: desde S/980
🛡️ Garantia reembolsable: S/450

La fecha se separa abonando el 50% del alquiler. La garantia se paga antes del ingreso.

¿Confirmamos disponibilidad para el {fecha}?
```

## /p4

```text
El paquete P4 - 3 dias / 2 noches incluye dos noches de alojamiento, habitaciones, cocina, piscina, patio, terraza y sala lounge.

🕐 Ingreso: 11:30 a. m.
🕐 Salida: 10:00 p. m. del tercer dia
👥 Capacidad: hasta 20 personas
💰 Lunes a jueves: desde S/970
💰 Viernes a domingo: desde S/1,250
🛡️ Garantia reembolsable: S/550

La fecha se separa abonando el 50% del alquiler. La garantia se paga antes del ingreso.

¿Confirmamos disponibilidad para el {fecha}?
```

## /paquetes

```text
Estos son nuestros paquetes:

• P1 - 1/2 dia: desde S/420, hasta 15 personas.
• P2 - 24 horas: desde S/600, hasta 20 personas.
• P3 - 2 dias / 1 noche: desde S/850, hasta 20 personas.
• P4 - 3 dias / 2 noches: desde S/970, hasta 20 personas.

Todos incluyen uso privado de los espacios indicados en cada paquete. Puedes ver fotos, horarios y detalles aqui:
🌐 [LINK_WEB]

¿Que fecha y paquete te interesan?
```

## /garantia

```text
La garantia es independiente del precio del alquiler:

• P1 y P2: S/350
• P3: S/450
• P4: S/550

Se paga antes del ingreso y es reembolsable al finalizar la estadia, despues de verificar que los espacios, equipos y mobiliario se encuentren en buenas condiciones.
```

## /pago

```text
Para separar la fecha se abona el 50% del alquiler. El saldo restante y la garantia deben quedar pagados antes del ingreso.

Aceptamos:
• Yape
• Plin
• Transferencia bancaria

Una vez confirmada la disponibilidad te enviaremos los datos de pago. La reserva queda separada unicamente despues de validar el abono y enviar la confirmacion por WhatsApp.
```

## /enlaces

```text
Conoce mas de Beach House Santa Rosa:

🌐 Pagina web: [LINK_WEB]
📷 Instagram: https://www.instagram.com/beach_house_santa_rosa/
🎵 TikTok: https://www.tiktok.com/@beach.house256
📘 Facebook: https://www.facebook.com/profile.php?id=61573368521184
📍 Ubicacion: https://maps.google.com/?q=-11.794161,-77.173981

En la web encontraras fotos, videos, paquetes y acceso directo a reservas.
```

## /disponible

```text
¡La fecha {fecha} se encuentra disponible para el paquete {paquete}!

Precio del alquiler: S/{precio}
Adelanto para separar, 50%: S/{adelanto}
Saldo pendiente: S/{saldo}
Garantia reembolsable: S/{garantia}

¿Deseas que te enviemos los datos de pago para separar la fecha?
```

## /nodisponible

```text
La fecha {fecha} ya no se encuentra disponible. Podemos revisar fechas cercanas o recomendarte otra opcion.

Indicanos que dias podrias considerar y verificaremos las alternativas.
```

## /confirmada

```text
¡Reserva confirmada, {nombre}!

📅 Fecha: {fecha}
🏠 Paquete: {paquete}
💳 Adelanto recibido: S/{adelanto}
💰 Saldo pendiente: S/{saldo}
🛡️ Garantia: S/{garantia}

Conserva este mensaje como constancia. Antes del ingreso coordinaremos el pago pendiente y las indicaciones finales.
```

## /gracias

```text
¡Muchas gracias por elegir Beach House Santa Rosa! Esperamos que disfruten una experiencia especial.

Puedes seguirnos y compartir nuestros espacios:
🌐 [LINK_WEB]
📷 https://www.instagram.com/beach_house_santa_rosa/
🎵 https://www.tiktok.com/@beach.house256
```

## Mensaje de ausencia

```text
¡Gracias por escribir a Beach House Santa Rosa! Nuestro horario de atencion es de martes a domingo, de 8:00 a. m. a 10:00 p. m.

Dejanos la fecha, paquete y cantidad de personas. Te responderemos apenas retomemos la atencion.

Mientras tanto puedes conocer la casa aqui:
🌐 [LINK_WEB]
```
