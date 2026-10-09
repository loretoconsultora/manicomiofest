/**
 * Manicomio Madness Night — registro en Google Sheets.
 *
 * Pega este código en Extensiones → Apps Script de tu hoja de registros.
 * Cambia SECRET por la misma clave que pongas en Vercel (SHEETS_SECRET).
 */
const SECRET = "CAMBIA-ESTA-CLAVE";
const SEND_EMAIL = true; // false para no enviar correo de confirmación
const SHEET_NAME = "Registros";
const TZ = "America/Mexico_City";

const HEADERS = [
  "Fecha", "Folio", "Nombre", "WhatsApp", "Correo", "Personas",
  "Etapa", "Precio por persona", "Total", "Estado de pago", "Notas",
];

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json({ ok: false, error: "bad_json" });
  }
  if (data.secret !== SECRET) return json({ ok: false, error: "unauthorized" });

  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let folio;
  try {
    const sheet = getSheet();
    folio = "MMN-" + String(sheet.getLastRow()).padStart(4, "0"); // fila 1 = encabezados
    sheet.appendRow([
      Utilities.formatDate(new Date(), TZ, "yyyy-MM-dd HH:mm:ss"),
      folio,
      data.nombre,
      "'" + data.telefono, // apóstrofe: que Sheets no lo trate como número
      data.correo,
      data.personas,
      data.etapa,
      data.precio,
      data.total,
      "Pendiente",
      "",
    ]);
  } finally {
    lock.releaseLock();
  }

  if (SEND_EMAIL && data.correo) {
    try {
      sendConfirmation(data, folio);
    } catch (err) {
      console.error("Correo no enviado: " + err);
    }
  }
  return json({ ok: true, folio: folio });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
  }
  return sheet;
}

function sendConfirmation(d, folio) {
  const money = (n) => "$" + Number(n).toLocaleString("es-MX");
  const html =
    '<div style="font-family:Arial,sans-serif;background:#050202;color:#ffffff;padding:32px;max-width:560px">' +
    '<p style="color:#a8948f;letter-spacing:4px;font-size:12px;margin:0">M PRODUCCIONES PRESENTA</p>' +
    '<h1 style="color:#E44B3B;margin:8px 0 24px">MANICOMIO MADNESS NIGHT</h1>' +
    "<p>Hola " + esc(d.nombre) + ", recibimos tu registro.</p>" +
    '<p style="font-size:22px;margin:24px 0">Folio: <b style="color:#E44B3B">' + folio + "</b></p>" +
    "<p>" + d.personas + " persona(s) · " + esc(d.etapa) + " " + money(d.precio) + " c/u · <b>Total " + money(d.total) + "</b></p>" +
    '<p style="margin-top:24px"><b>Siguiente paso:</b> te compartimos por WhatsApp los datos para pagar por transferencia. ' +
    "Al confirmar tu pago recibirás tu código QR.</p>" +
    '<p style="color:#a8948f">Acceso solo con nombre registrado, código QR e identificación oficial. Evento exclusivo para mayores de 18 años.</p>' +
    '<hr style="border:none;border-top:1px solid #511913;margin:24px 0">' +
    "<p>28 de octubre · 8:00 PM – 2:00 AM<br>Black Lounge · Plaza Campa, Planta Alta · Querétaro</p>" +
    '<p style="color:#a8948f;font-size:12px">Dudas: WhatsApp +52 442 200 7615 · Instagram @mproduccionesyeventos</p>' +
    "</div>";
  MailApp.sendEmail({
    to: d.correo,
    subject: "Tu registro para Manicomio Madness Night · Folio " + folio,
    htmlBody: html,
    name: "M Producciones",
  });
}

function esc(s) {
  return String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
