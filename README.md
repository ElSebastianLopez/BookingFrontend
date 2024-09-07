
# BookingFrontend

**BookingFrontend** es una aplicación **Angular 18** para la gestión de reservas de servicios de hoteles y restaurantes. Proporciona un sistema de login y una funcionalidad protegida para gestionar reservas.

## Requisitos previos

Antes de empezar, asegúrate de tener las siguientes herramientas instaladas:

- **Node.js**: [Descargar e instalar Node.js](https://nodejs.org/)
- **npm**: Generalmente se instala con Node.js. Verifica que esté instalado usando el siguiente comando:

```bash
npm --version
```

## Instalación

Sigue estos pasos para configurar el entorno de desarrollo y correr el proyecto:

Clona el repositorio:

```bash
git clone https://github.com/tu-usuario/BookingFrontend.git
cd BookingFrontend
```

Instala las dependencias necesarias ejecutando:

```bash
npm install
```

Para correr el servidor de desarrollo, ejecuta:

```bash
ng serve
```

Accede a la aplicación desde tu navegador en:

```bash
http://localhost:4200
```

## Estructura del Proyecto

El proyecto sigue la estructura estándar de Angular. Algunas carpetas importantes son:

- `app/Components`: Contiene los componentes principales de la aplicación como LoginComponent y ReservationComponent.
- `app/guard`: Contiene los guards para proteger rutas como GuardGuard.
- `app/Interceptor`: Contiene los interceptores que pueden ser utilizados para manejar peticiones HTTP.
- `app/Services`: Contiene los servicios que conectan con el backend.

### Archivos importantes:

- `app-routing.module.ts`: Archivo de rutas de la aplicación.
- `app.component.html`: Componente principal de la interfaz de usuario.
- `angular.json`: Archivo de configuración del proyecto Angular.
- `package.json`: Contiene los scripts y dependencias del proyecto.

## Rutas

Estas son las rutas principales configuradas en `app-routing.module.ts`:

- `/`: Redirige al componente LoginComponent.
- `/login`: Muestra el formulario de login.
- `/reservations`: Muestra el componente ReservationComponent, protegido por el GuardGuard.

## Estilos y Temas

La aplicación utiliza los siguientes archivos de estilos:

- `styles.scss`: Estilos globales de la aplicación.
- `theme.less`: Archivo para la configuración de temas (si aplicable).

## Compilación para Producción

Para generar una versión lista para producción, ejecuta el siguiente comando:

```bash
ng build --prod
```

Este comando genera los archivos necesarios en la carpeta `dist/`, los cuales pueden ser desplegados en un servidor web.

## Contribución

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-funcionalidad`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva funcionalidad'`).
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la licencia MIT.
