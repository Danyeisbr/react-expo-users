# React Native Users App

Una aplicación móvil moderna construida con React Native, Expo y TypeScript que consume una API pública para mostrar una lista de usuarios con funcionalidades avanzadas.

## 🚀 Características

- **Lista de usuarios** con información básica (nombre, email, avatar)
- **Pantalla de detalles** con información completa del usuario
- **Búsqueda en tiempo real** por nombre o email
- **Paginación** con scroll infinito (5-10 elementos por página)
- **Indicadores de carga** para todas las operaciones asíncronas
- **Manejo de errores** con opción de reintentar
- **Modo oscuro/claro** con toggle manual y detección automática del sistema
- **Animaciones sutiles** para mejorar la experiencia de usuario
- **Caché offline** usando AsyncStorage
- **Tests unitarios** completos con Jest y React Testing Library

## 🛠️ Tecnologías

- **React Native** con Expo
- **TypeScript** para tipado estático
- **Zustand** para manejo de estado global
- **React Navigation** para navegación entre pantallas
- **NativeWind** para estilos con Tailwind CSS
- **Jest** y **React Testing Library** para testing
- **AsyncStorage** para caché persistente

## 📱 API

La aplicación consume la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) para obtener datos de usuarios.

## 🏗️ Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── UserCard.tsx    # Tarjeta de usuario con avatar y animaciones
│   ├── SearchBar.tsx   # Barra de búsqueda
│   └── RetryMessage.tsx # Componente de error con retry
├── navigation/          # Configuración de navegación
│   └── RootNavigator.tsx
├── screens/            # Pantallas de la aplicación
│   ├── UserListScreen.tsx   # Lista principal de usuarios
│   └── UserDetailScreen.tsx # Detalles del usuario
├── services/           # Servicios API
│   └── api.ts
├── store/              # Estado global con Zustand
│   ├── userStore.ts    # Estado de usuarios y paginación
│   └── themeStore.ts   # Estado del tema
├── types/              # Definiciones de tipos TypeScript
│   └── index.ts
└── utils/              # Utilidades
    └── cache.ts        # Sistema de caché con AsyncStorage
```

## 🚀 Instalación y Uso

### Prerrequisitos

- Node.js (versión 18 o superior)
- npm o yarn
- Expo CLI
- Expo Go app en tu dispositivo móvil

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone <repository-url>
   cd react-expo-users
   ```

2. **Instala las dependencias:**

   ```bash
   npm install
   # o
   yarn install
   ```

3. **Inicia el servidor de desarrollo:**

   ```bash
   npm start
   # o
   expo start
   ```

4. **Ejecuta la aplicación:**
   - Escanea el código QR con Expo Go (Android) o la app Cámara (iOS)
   - O presiona `w` para abrir en navegador web

### Comandos Disponibles

```bash
# Desarrollo
npm start              # Inicia el servidor de Expo
npm run android        # Ejecuta en Android
npm run ios           # Ejecuta en iOS
npm run web           # Ejecuta en navegador web

# Testing
npm test              # Ejecuta todos los tests
npm run test:watch    # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con reporte de cobertura
```

## 🧪 Testing

La aplicación incluye tests unitarios completos que cubren:

- **Componentes:** UserCard, SearchBar, RetryMessage
- **Stores:** userStore, themeStore
- **Servicios:** API calls
- **Utilidades:** Sistema de caché

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Con reporte de cobertura
npm run test:coverage
```

### Cobertura de Tests

El proyecto mantiene un umbral de cobertura del 70% para:

- Líneas de código
- Funciones
- Ramas
- Declaraciones

## 🎨 Características de UI/UX

### Diseño Moderno

- Interfaz limpia y minimalista
- Tarjetas con bordes redondeados y sombras sutiles
- Colores consistentes con soporte para modo oscuro

### Animaciones

- Transiciones suaves entre pantallas
- Animaciones de fade-in para tarjetas de usuario
- Indicadores de carga animados

### Modo Oscuro

- Toggle manual entre modo claro y oscuro
- Detección automática de preferencias del sistema
- Colores optimizados para ambos modos

### Avatares

- Imágenes aleatorias desde Picsum Photos
- Placeholder consistente por usuario
- Carga optimizada con lazy loading

## 🔧 Configuración

### Variables de Entorno

No se requieren variables de entorno para el funcionamiento básico.

### Personalización

Puedes personalizar:

- **Colores:** Edita `tailwind.config.js`
- **Tamaño de página:** Modifica `pageSize` en `userStore.ts`
- **API:** Cambia la URL en `src/services/api.ts`
- **Cache TTL:** Ajusta `CACHE_TTL` en `userStore.ts`

## 📱 Funcionalidades Detalladas

### Lista de Usuarios

- Muestra 5-10 usuarios por página
- Scroll infinito para cargar más usuarios
- Búsqueda en tiempo real por nombre o email
- Indicadores de carga durante la búsqueda

### Pantalla de Detalles

- Información completa del usuario
- Datos de contacto (teléfono, email)
- Dirección completa
- Información de la empresa

### Manejo de Errores

- Detección de errores de red
- Mensajes de error amigables
- Botón de reintentar
- Fallback a datos cacheados

### Caché Offline

- Almacenamiento local de usuarios
- TTL de 1 hora para datos frescos
- Recuperación automática de datos cacheados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) por la API de usuarios
- [Picsum Photos](https://picsum.photos/) por las imágenes de avatar
- [Expo](https://expo.dev/) por el framework de desarrollo
- [NativeWind](https://nativewind.dev/) por la integración de Tailwind CSS
