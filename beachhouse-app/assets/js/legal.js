const legalModals = `
  <div class="modal fade legal-modal" id="termsModal" tabindex="-1" aria-labelledby="termsModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header">
          <div>
            <p class="legal-modal-kicker">Beach House Santa Rosa</p>
            <h2 class="modal-title" id="termsModalTitle">Terminos y condiciones</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body legal-modal-body">
          <p class="legal-updated">Ultima actualizacion: junio de 2026</p>
          <section><h3>1. Servicio</h3><p>Beach House Santa Rosa ofrece el alquiler temporal de una casa privada para estadias, reuniones y celebraciones, conforme al paquete, fecha, horario, aforo y servicios que se confirmen para cada reserva.</p></section>
          <section><h3>2. Disponibilidad y reserva</h3><p>La disponibilidad mostrada o consultada es referencial. Una reserva queda confirmada unicamente cuando Beach House la confirma por WhatsApp y comunica las condiciones aplicables antes del pago.</p></section>
          <section><h3>3. Tarifas y promociones</h3><p>Las tarifas publicadas como "desde" corresponden a precios base y pueden variar por fecha, disponibilidad, aforo, servicios adicionales y promociones vigentes. El importe final se informa antes de realizar el pago.</p></section>
          <section><h3>4. Garantia reembolsable</h3><p>La garantia cubre danos, faltantes, incumplimientos de las normas de uso, multas o sanciones ocasionadas durante la estadia. Se devuelve luego de la verificacion final del inmueble, descontando solo los conceptos que correspondan.</p></section>
          <section><h3>5. Aforo y normas de uso</h3><p>Solo podran ingresar las personas previamente autorizadas. El huesped responsable debe respetar el aforo, los horarios de descanso, la propiedad y a los vecinos. No se permiten actividades ilicitas, ruidos molestos, equipos de alto volumen sin autorizacion ni eventos con cobro de entradas.</p></section>
          <section><h3>6. Ingreso, salida y responsabilidad</h3><p>Las horas de ingreso y salida se establecen en el paquete o en la confirmacion de reserva. El huesped responsable debe entregar el inmueble y sus bienes en condiciones similares a las recibidas. El incumplimiento grave puede motivar la terminacion de la estadia, conforme al contrato aplicable.</p></section>
          <section><h3>7. Cambios y cancelaciones</h3><p>Las solicitudes de cambio, cancelacion o reprogramacion se evaluan segun la anticipacion, la disponibilidad y las condiciones confirmadas por WhatsApp para la reserva.</p></section>
          <section><h3>8. Contrato y consultas</h3><p>Antes del ingreso se puede completar un contrato temporal con los datos de la reserva. Para consultas sobre estas condiciones, comunicate por WhatsApp con Beach House Santa Rosa.</p></section>
        </div>
        <div class="modal-footer"><button class="btn btn-outline-dark rounded-0 px-4" type="button" data-bs-dismiss="modal">Cerrar</button></div>
      </div>
    </div>
  </div>

  <div class="modal fade legal-modal" id="privacyModal" tabindex="-1" aria-labelledby="privacyModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header">
          <div>
            <p class="legal-modal-kicker">Beach House Santa Rosa</p>
            <h2 class="modal-title" id="privacyModalTitle">Politica de privacidad</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body legal-modal-body">
          <p class="legal-updated">Ultima actualizacion: junio de 2026</p>
          <section><h3>Responsable</h3><p>MONZON CAVERO CRISTHIAN DANIEL, RUC 10466990430, es responsable del tratamiento de los datos que el cliente proporcione para la atencion de su consulta o reserva.</p></section>
          <section><h3>Datos y finalidad</h3><p>Podemos solicitar datos de contacto, fecha, paquete, cantidad de huespedes y los datos necesarios para completar una reserva o contrato. Se usan para atender consultas, verificar disponibilidad, confirmar reservas, gestionar pagos, estadias y comunicaciones relacionadas.</p></section>
          <section><h3>Canales de contacto</h3><p>La comunicacion comercial y de reserva se realiza principalmente por WhatsApp. Al contactar voluntariamente por este canal, el cliente autoriza el uso de los datos que comparte para la finalidad descrita.</p></section>
          <section><h3>Conservacion y seguridad</h3><p>Los datos se conservan durante el tiempo necesario para gestionar la reserva, cumplir obligaciones aplicables y atender consultas posteriores. Beach House adopta medidas razonables para evitar accesos no autorizados.</p></section>
          <section><h3>Derechos</h3><p>El titular puede solicitar informacion, actualizacion, rectificacion o cancelacion de sus datos, cuando corresponda, comunicandose por WhatsApp con Beach House Santa Rosa.</p></section>
        </div>
        <div class="modal-footer"><button class="btn btn-outline-dark rounded-0 px-4" type="button" data-bs-dismiss="modal">Cerrar</button></div>
      </div>
    </div>
  </div>

  <div class="modal fade legal-modal" id="guaranteeModal" tabindex="-1" aria-labelledby="guaranteeModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header">
          <div>
            <p class="legal-modal-kicker">Beach House Santa Rosa</p>
            <h2 class="modal-title" id="guaranteeModalTitle">Garantia reembolsable</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body legal-modal-body">
          <p>La garantia es un deposito temporal asociado a la reserva. Su monto aplicable se indica en el paquete seleccionado y en la confirmacion final.</p>
          <section><h3>Devolucion</h3><p>Se devuelve al finalizar la estadia y despues de verificar el inmueble, siempre que todo se encuentre conforme a las condiciones acordadas.</p></section>
          <section><h3>Descuentos aplicables</h3><p>Podran descontarse costos por danos al inmueble, paredes, mobiliario o electrodomesticos; objetos faltantes; perdida de llaves; suciedad excesiva; multas o sanciones por disturbios; ingreso de personas no autorizadas; o incumplimientos de las normas acordadas.</p></section>
          <section><h3>Transparencia</h3><p>Cualquier descuento se vinculara a una incidencia verificada durante la revision de salida.</p></section>
        </div>
        <div class="modal-footer"><button class="btn btn-outline-dark rounded-0 px-4" type="button" data-bs-dismiss="modal">Cerrar</button></div>
      </div>
    </div>
  </div>

  <div class="modal fade legal-modal" id="companyModal" tabindex="-1" aria-labelledby="companyModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header">
          <div>
            <p class="legal-modal-kicker">Informacion del proveedor</p>
            <h2 class="modal-title" id="companyModalTitle">Informacion de la empresa</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body legal-modal-body">
          <dl class="company-details">
            <div><dt>Marca comercial</dt><dd>Beach House Santa Rosa</dd></div>
            <div><dt>Titular</dt><dd>MONZON CAVERO CRISTHIAN DANIEL</dd></div>
            <div><dt>RUC</dt><dd>10466990430</dd></div>
            <div><dt>Atencion</dt><dd>WhatsApp Beach House Santa Rosa</dd></div>
            <div><dt>Ubicacion</dt><dd>Santa Rosa, Lima</dd></div>
          </dl>
        </div>
        <div class="modal-footer"><button class="btn btn-outline-dark rounded-0 px-4" type="button" data-bs-dismiss="modal">Cerrar</button></div>
      </div>
    </div>
  </div>

  <div class="modal fade legal-modal" id="contractModal" tabindex="-1" aria-labelledby="contractModalTitle" aria-hidden="true">
    <div class="modal-dialog modal-md modal-dialog-centered">
      <div class="modal-content border-0 rounded-0">
        <div class="modal-header">
          <div>
            <p class="legal-modal-kicker">Beach House Santa Rosa</p>
            <h2 class="modal-title" id="contractModalTitle">Contrato referencial</h2>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
        </div>
        <div class="modal-body legal-modal-body">
          <p>Revisa el modelo de contrato de arrendamiento temporal utilizado como referencia para cada reserva.</p>
          <p class="legal-contract-note"><i class="bi bi-info-circle"></i> El contrato se completa y confirma para cada reserva.</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-outline-dark rounded-0 px-4" type="button" data-bs-dismiss="modal">Cerrar</button>
          <a class="btn btn-gold rounded-0 px-4 fw-bold" href="/assets/legal/contrato-beach-house.pdf" target="_blank" rel="noopener noreferrer"><i class="bi bi-file-earmark-pdf me-2"></i>Ver contrato</a>
        </div>
      </div>
    </div>
  </div>`;

document.body.insertAdjacentHTML("beforeend", legalModals);
