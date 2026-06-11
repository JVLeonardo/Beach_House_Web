export const beachHouseConfig = Object.freeze({
  whatsappPhone: "51943157950",
  publicSiteUrl: "",
  packages: Object.freeze({
    "1/2 Dia": Object.freeze({ code: "P1", label: "1/2 DIA" }),
    "24 horas": Object.freeze({ code: "P2", label: "24 HORAS" }),
    "2 dias, 1 noche": Object.freeze({ code: "P3", label: "2 DIAS / 1 NOCHE" }),
    "3 dias, 2 noches": Object.freeze({ code: "P4", label: "3 DIAS / 2 NOCHES" })
  })
});

export function publicSiteUrl() {
  if (beachHouseConfig.publicSiteUrl) return beachHouseConfig.publicSiteUrl;
  return `${window.location.origin}${window.location.pathname}`;
}

export function whatsAppUrl(message) {
  return `https://wa.me/${beachHouseConfig.whatsappPhone}?text=${encodeURIComponent(message)}`;
}

export function trackingSource(buttonSource = "web-general") {
  const params = new URLSearchParams(window.location.search);
  const values = [
    buttonSource,
    params.get("utm_source"),
    params.get("utm_campaign")
  ].filter(Boolean);

  return values
    .map((value) => value.trim().replace(/[^\p{L}\p{N}._-]+/gu, "-"))
    .join(" | ");
}

export function generalWhatsAppMessage(source) {
  return [
    "Hola, llegue desde la pagina web de Beach House.",
    "",
    "SOLICITUD WEB | PG | CONSULTA GENERAL",
    `Origen: ${source}`,
    "",
    "Quisiera conocer la disponibilidad, los paquetes y los pasos para separar una fecha."
  ].join("\n");
}

export function packageWhatsAppMessage(packageType, formattedDate, source) {
  const packageData = beachHouseConfig.packages[packageType];
  if (!packageData) return generalWhatsAppMessage(source);

  return [
    "Hola, llegue desde la pagina web de Beach House.",
    "",
    `SOLICITUD WEB | ${packageData.code} | ${packageData.label}`,
    `Fecha solicitada: ${formattedDate}`,
    `Origen: ${source}`,
    "",
    "Quisiera confirmar disponibilidad, precio final y los pasos para separar la fecha."
  ].join("\n");
}
