## ViewSoul
ViewSoul es una aplicación web de redes sociales construida con Next.js, Tailwind CSS, React y Prisma. Permite a los usuarios crear perfiles, conectarse con amigos y compartir publicaciones con imágenes almacenadas en Cloudinary. La autenticación se gestiona con Auth.js, y la aplicación se despliega en Vercel.

## Comenzando
Primero, clona el repositorio e instala las dependencias:

``` bash
Copy code
git clone https://github.com/cjristian/my-app-viewsoul.git
cd viewsoul
npm install
# o
yarn install
# o
pnpm install
# o
bun install
```
Luego, ejecuta el servidor de desarrollo:


``` bash
Copy code
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador para ver el resultado.

Puedes comenzar a editar la página modificando `app/page.tsx`. La página se actualiza automáticamente a medida que editas el archivo.

Este proyecto utiliza [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) para optimizar y cargar automáticamente Inter, una fuente personalizada de Google.

## Historial de Commits y Hitos de Desarrollo
- 28 de mayo de 2024
Update data.ts: Autor - beca_utd
Registro terminado con todos los valores: Autor - beca_utd
- 27 de mayo de 2024
Co-authored by Angel: Autor - beca_utd
Verdaderos cambios en los git: Autor - beca_utd
Creación de publicaciones de amigos, cambio diseño de ViewSoul: Autor - beca_utd
Cambio diseño de página, agregado de borrado de amigos: Autor - beca_utd
- 23 de mayo de 2024
Cambio diseño de página, agregado de borrado de amigos: Autor - beca_utd
- 22 de mayo de 2024
Cambio en estructura de datos, skeleton, mejora de tabla friends: Autor - beca_utd
Cambio de Navbar y lista de amigos: Autor - beca_utd
- 21 de mayo de 2024
Creación lista amigos: Autor - beca_utd
Suspense en las páginas: Autor - beca_utd
- 20 de mayo de 2024
Finalización search: Autor - beca_utd
Delete file: Autor - beca_utd
Añadiendo buscar gente: Autor - beca_utd
Actualización profile: Autor - beca_utd
- 17 de mayo de 2024
Post page create: Autor - beca_utd
- 16 de mayo de 2024
Actualización de la funcionalidad de creación de publicaciones, integración de Cloudinary, y modificación del esquema y validación de formularios: Autor - beca_utd
- 15 de mayo de 2024
Creando el Page de Post: Autor - cjristian
Comprobación de despliegue: Autor - cjristian
Update again: Autor - cjristian
Update deployment: Autor - cjristian
Cambios estructura base de datos: Autor - beca_utd
- 10 de mayo de 2024
Mejorando estructura de la interacción de usuarios: Autor - beca_utd
- 9 de mayo de 2024
Cambios en el responsive: Autor - beca_utd
- 7 de mayo de 2024
Empezando estructura interna de ViewSoul: Autor - beca_utd
Arreglo en las URL de los proveedores y el reset de la contraseña: Autor - beca_utd
Corrección de errores y finalización de opciones: Autor - beca_utd
- 30 de abril de 2024
Cambios en el idioma: Autor - beca_utd
Página principal responsive: Autor - beca_utd
Nuevo archivo en packagenode: Autor - beca_utd
Cambio estructura de ViewSoul: Autor - beca_utd
- 22 de abril de 2024
Commit inicial desde Create Next App: Autor - beca_utd
## Tecnologías Utilizadas
- [Next.js](https://nextjs.org/docs) : Un framework de React para construir aplicaciones web rápidas y modernas.
- [React](https://es.react.dev/): Una biblioteca de JavaScript para construir interfaces de usuario.
- [Tailwindcss](https://tailwindcss.com/): Un framework de CSS utility-first para desarrollo rápido de interfaces.
- Prisma: Un ORM para Node.js y TypeScript.
- Cloudinary: Un servicio en la nube para gestionar imágenes y videos.
- Auth.js: Una biblioteca para gestionar la autenticación en aplicaciones JavaScript.
- Vercel: Una plataforma para desplegar aplicaciones web.
Despliegue en Vercel
La manera más fácil de desplegar tu aplicación de Next.js es usar la Plataforma Vercel de los creadores de Next.js.

## Para desplegar:

Empuja tu código a un repositorio de Git.
Vincula tu repositorio a [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)
Vercel desplegará automáticamente tu aplicación y proporcionará una URL en vivo.
Para más detalles, consulta la documentación de despliegue de Next.js.

## Aprende Más
Para aprender más sobre Next.js, revisa los siguientes recursos:

- [Next.js Documentation](https://nextjs.org/docs) - aprende sobre las características y API de Next.js.
- [Learn Next.js](https://nextjs.org/learn) - un tutorial interactivo de Next.js.
Puedes revisar el [the Next.js GitHub repository](https://github.com/vercel/next.js/) - tus comentarios y contribuciones son bienvenidos!
