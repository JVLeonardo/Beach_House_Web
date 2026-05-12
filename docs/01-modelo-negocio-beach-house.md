# Modelo de Negocio - Beach House Santa Rosa

## 1. Vision General

Beach House Santa Rosa es una casa privada de alquiler ubicada en el distrito de Santa Rosa, Lima. El negocio atiende eventos y celebraciones privadas mediante paquetes como full day, estadias cortas, cumpleaños, aniversarios de pareja, vacaciones familiares y reuniones entre amigos.

La propuesta comercial combina privacidad, piscina, parrilla, azotea, ambientes sociales, habitaciones y cercania al mar. El objetivo es convertir la casa en una opcion facil de descubrir, entender y reservar, reduciendo la friccion actual del proceso manual.

## 2. Modelo de Ingresos

Los ingresos principales provienen del alquiler temporal de la casa por paquetes:

- Full day.
- 2 dias / 1 noche.
- 3 dias / 2 noches.
- Promociones de dias con menor demanda.
- Tematicas especiales para cumpleaños, aniversarios, parejas, amigos o familias.

Los ingresos complementarios podran crecer con servicios adicionales, como decoracion tematica, parrilla preparada, limpieza extra, late checkout, paquetes romanticos o servicios tercerizados.

## 3. Problemas Actuales

El negocio opera de forma manual mediante redes sociales y contacto directo por WhatsApp. Esto genera problemas operativos y comerciales:

- Perdida de clientes por demoras en responder.
- Confusion al informar fechas disponibles.
- Riesgo de ofrecer una fecha que ya estaba reservada.
- Dificultad para comunicar paquetes, precios, condiciones y promociones.
- Dependencia excesiva de que el dueño responda todo manualmente.
- Baja ocupacion de dias de semana.
- Interesados que preguntan sin haber revisado informacion basica.

## 4. Solucion Digital Propuesta

La solucion se construira por capas para profesionalizar el negocio sin cambiar de golpe el modelo de confianza del cliente:

- Pagina web informativa con fotos, paquetes, promociones, ubicacion y botones claros de WhatsApp.
- WhatsApp Business configurado con catalogo, respuestas rapidas, etiquetas y mensaje de bienvenida.
- Redes sociales conectadas entre si y apuntando hacia la web.
- Dashboard administrativo para controlar promociones, disponibilidad y reservas.
- API REST con Spring Boot para centralizar reglas de negocio, fechas bloqueadas, paquetes y promociones.

El objetivo inmediato es que el cliente llegue mas informado a WhatsApp, pregunte menos cosas basicas y tenga mayor intencion de reservar.

## 5. Reglas Operativas

- Los lunes no se ofrecen reservas.
- Los lunes quedan reservados para limpieza profunda, mantenimiento, inventario, revision administrativa y preparacion comercial.
- Una reserva solo queda confirmada cuando el administrador registra garantia o adelanto.
- Las fechas confirmadas no deben mostrarse como disponibles.
- Las fechas pasadas no deben mostrarse como reservables.
- Las promociones se activan y desactivan manualmente desde el administrador.
- Una promocion solo puede aplicarse sobre fechas disponibles.
- Si una promocion se agota o la fecha se reserva, el administrador debe desactivarla.
- El cliente no paga por la web en la primera version funcional; la coordinacion final ocurre por WhatsApp.

## 6. Reglas de Disponibilidad

La disponibilidad debe calcularse con estas prioridades:

1. Bloquear siempre los lunes.
2. Bloquear fechas pasadas.
3. Bloquear rangos de reservas confirmadas.
4. Bloquear fechas cerradas manualmente por mantenimiento o decisiones administrativas.
5. Permitir solicitudes solo cuando el rango completo esta disponible.
6. Permitir promociones solo si la fecha objetivo esta disponible.

Una solicitud pendiente no necesariamente bloquea la fecha publicamente, salvo que el administrador decida hacerlo.

## 7. Fases de Desarrollo

### Fase 1: Web Estatica Rehecha

Rehacer la pagina actual con un diseño mas simple, elegante y orientado a conversion. La portada debe funcionar como una experiencia horizontal por categorias: inicio, casa, fotos, paquetes, promociones y contacto.

### Fase 2: Admin Visual y Promociones Locales

Crear un panel inicial para activar y desactivar promociones, usando estado local mientras aun no exista backend. Esta fase servira para validar el flujo operativo del dueño.

### Fase 3: Backend Spring Boot

Implementar una API REST para manejar paquetes, promociones, disponibilidad, fechas bloqueadas y solicitudes de reserva. El formulario del cliente generara un mensaje prellenado hacia WhatsApp.

### Fase 4: Automatizacion Robusta

Agregar pagos online, separacion automatica de fechas, vencimiento de reservas pendientes, reportes financieros, analitica comercial y control mas completo de usuarios administrativos.

## 8. Objetivo Comercial

El objetivo principal es aumentar la ocupacion de martes a jueves sin devaluar los fines de semana. Los descuentos deben usarse como herramienta tactica para llenar dias vacios, no como regla permanente.

Los fines de semana y feriados deben proteger margen. Los dias de baja demanda pueden usar promociones activables de ultimo minuto o campañas especificas.

## 9. Indicadores Clave

- Consultas recibidas por semana.
- Consultas que llegan desde la web.
- Reservas confirmadas por semana.
- Ocupacion de martes a jueves.
- Ocupacion de viernes a domingo.
- Ingreso mensual.
- Ingreso promedio por reserva.
- Tiempo promedio de respuesta en WhatsApp.
- Promociones activadas y reservas logradas por promocion.

## 10. Principio de Producto

La web no debe ser solo una vitrina. Debe funcionar como un vendedor silencioso: informar, mostrar fotos, ordenar paquetes, resolver dudas frecuentes, destacar promociones activas y llevar al cliente a WhatsApp con una decision mas clara.
