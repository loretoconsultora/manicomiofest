# Registro en Google Sheets

Cada registro del sitio se guarda como una fila en una hoja de Google con un folio (`MMN-0001`, `MMN-0002`, …),
se envía un correo de confirmación al asistente y después se abre WhatsApp con el folio incluido.
Si la hoja no está configurada o falla, el sitio **igual abre WhatsApp** (sin folio) para no perder la venta.

## 1. Crear la hoja y el script (≈10 min)

1. Crea una hoja nueva en Google Sheets con la cuenta que enviará los correos (ej. la de M Producciones).
   Nómbrala, por ejemplo, **"Registros Manicomio Madness Night"**.
2. Menú **Extensiones → Apps Script**.
3. Borra lo que aparece y pega todo el contenido de [`apps-script-registro.gs`](./apps-script-registro.gs).
4. En la línea `const SECRET = "CAMBIA-ESTA-CLAVE";` pon una clave larga (letras y números, sin espacios). Guárdala, la usarás en el paso 2.
5. Guarda (ícono de disquete).
6. Botón **Implementar → Nueva implementación**:
   - Tipo (engrane): **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier usuario**
   - **Implementar** → autoriza los permisos con tu cuenta (si sale "Google no verificó esta app": *Configuración avanzada → Ir a … (no seguro)*; es tu propio script).
7. Copia la **URL de la aplicación web** (termina en `/exec`).

## 2. Conectar con Vercel

En Vercel → proyecto **manicomiofest** → **Settings → Environment Variables**, agrega (entorno *Production*):

| Nombre | Valor |
|---|---|
| `SHEETS_WEBHOOK_URL` | la URL `/exec` del paso 1.7 |
| `SHEETS_SECRET` | la misma clave del paso 1.4 |

Después ve a **Deployments → último deployment → ⋯ → Redeploy** para que tome las variables.

## 3. Probar

Haz un registro de prueba en el sitio. Debe aparecer una fila en la pestaña **Registros**, llegar el correo
y el mensaje de WhatsApp debe incluir `Folio: MMN-0001`. Borra la fila de prueba si quieres.

## Uso diario

- Cuando alguien pague, cambia **Estado de pago** a `Pagado` (puedes usar validación de datos para un menú).
- Filtra por estado para ver pendientes; la suma de **Personas** con estado `Pagado` te dice cuántos de los 300 accesos van.
- Comparte la hoja con quien cobra y con quien hace el check-in en la puerta.

## Notas

- Si cambias el código del script, usa **Implementar → Administrar implementaciones → Editar → Nueva versión** para que la URL siga siendo la misma.
- Gmail gratuito permite ~100 correos por día desde Apps Script. Para desactivar el correo: `SEND_EMAIL = false`.
- No muevas ni renombres las columnas: el script escribe en ese orden.
