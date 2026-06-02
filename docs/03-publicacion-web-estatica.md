# Publicacion temporal de Beach House

La web publica es estatica y no necesita desplegar el backend. El artefacto listo para hosting se genera con:

```powershell
npm run build --prefix beachhouse-app
```

La carpeta que se publica es `beachhouse-app/dist`. Solo contiene la landing informativa, sus estilos, imagenes y JavaScript publico. No incluye el panel administrativo ni los clientes de API.

## Netlify

1. Conectar el repositorio desde Netlify.
2. Netlify tomara la configuracion de `netlify.toml`.
3. Verificar que el comando sea `npm run build --prefix beachhouse-app`.
4. Verificar que la carpeta publicada sea `beachhouse-app/dist`.

Si el despliegue se hace manualmente con arrastrar y soltar, subir exclusivamente la carpeta `beachhouse-app/dist`. No subir `beachhouse-app`, porque esa carpeta tambien conserva el panel administrativo para una etapa futura.

El artefacto incluye reglas `_redirects` defensivas para devolver `404` en las rutas del panel y sus scripts aunque se intente acceder directamente.

## Cloudflare Pages

1. Conectar el repositorio desde Cloudflare Pages.
2. Usar `npm run build --prefix beachhouse-app` como comando de build.
3. Usar `beachhouse-app/dist` como carpeta de salida.

## Dominio propio

Cuando se compre el dominio, agregarlo como dominio personalizado en el hosting elegido y seguir las instrucciones DNS del proveedor. La URL temporal de Netlify o Cloudflare Pages puede mantenerse como respaldo.
