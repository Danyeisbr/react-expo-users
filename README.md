# React Native Users App

Una aplicación móvil moderna construida con React Native, Expo y TypeScript que consume una API pública para mostrar una lista de usuarios con funcionalidades avanzadas y arquitectura escalable.

## 🚀 Características

- **Lista de usuarios** con información básica (nombre, email, avatar)
- **Pantalla de detalles** con información completa del usuario
- **Búsqueda en tiempo real** por nombre o email
- **Paginación** con scroll infinito (configurable por página)
- **Indicadores de carga** con skeleton loaders para todas las operaciones
- **Manejo robusto de errores** con reintentos automáticos y mensajes específicos
- **Modo oscuro/claro** con toggle manual y detección automática del sistema
- **Caché offline** inteligente usando AsyncStorage
- **Variables de entorno** para configuración segura
- **Arquitectura modular** con separación de responsabilidades
- **Tipado completo** con TypeScript para máxima seguridad
- **Tests unitarios** completos con 100% de cobertura

## 🛠️ Tecnologías

- **React Native** con Expo
- **TypeScript** para tipado estático completo
- **Zustand** para manejo de estado global
- **React Navigation** para navegación entre pantallas
- **Styled Components** para estilos tipados
- **Jest** y **React Testing Library** para testing
- **AsyncStorage** para caché persistente
- **Variables de entorno** para configuración segura

## 📱 API

La aplicación consume la API pública de [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) para obtener datos de usuarios. La URL de la API es configurable mediante variables de entorno para facilitar el cambio entre entornos de desarrollo y producción.

## 🏗️ Estructura del Proyecto

```
src/
├── components/                    # Componentes reutilizables
│   ├── UserCard/                 # Tarjeta de usuario con avatar
│   │   ├── UserCard.tsx          # Componente principal
│   │   ├── UserCard.styles.ts    # Estilos tipados
│   │   └── UserCard.test.tsx     # Tests unitarios
│   ├── SearchBar/                # Barra de búsqueda
│   │   ├── SearchBar.tsx
│   │   ├── SearchBar.styles.ts
│   │   └── SearchBar.test.tsx
│   ├── RetryMessage/             # Componente de error con retry
│   │   ├── RetryMessage.tsx
│   │   ├── RetryMessage.styles.ts
│   │   └── RetryMessage.test.tsx
│   └── SkeletonLoader/           # Indicadores de carga
│       ├── SkeletonLoader.tsx
│       ├── SkeletonLoader.styles.ts
│       └── SkeletonLoader.test.tsx
├── config/                       # Configuración de la aplicación
│   └── environment.ts            # Variables de entorno centralizadas
├── hooks/                        # Custom hooks con lógica separada
│   ├── useUserList.ts            # Lógica de la lista de usuarios
│   ├── useUserDetail.ts          # Lógica de detalles de usuario
│   ├── useSearchBar.ts           # Lógica de búsqueda
│   ├── useUserCard.ts            # Lógica de tarjeta de usuario
│   ├── useRetryMessage.ts        # Lógica de mensajes de error
│   └── useSkeletonLoader.ts      # Lógica de skeleton loaders
├── navigation/                   # Configuración de navegación
│   └── RootNavigator.tsx
├── screens/                      # Pantallas de la aplicación
│   ├── UserListScreen/           # Lista principal de usuarios
│   │   ├── UserListScreen.tsx    # Componente principal
│   │   ├── UserListScreen.styles.ts # Estilos del contenedor
│   │   ├── HeaderSection/        # Sección de encabezado
│   │   ├── FooterSection/        # Sección de pie
│   │   └── EmptyState/           # Estado vacío
│   └── UserDetailScreen/         # Detalles del usuario
│       ├── UserDetailScreen.tsx  # Componente principal
│       ├── UserDetailScreen.styles.ts # Estilos del contenedor
│       ├── UserInfoCard/         # Tarjeta de información
│       ├── ContactCard/          # Tarjeta de contacto
│       ├── AddressCard/          # Tarjeta de dirección
│       └── CompanyCard/          # Tarjeta de empresa
├── services/                     # Servicios API
│   └── api.ts                    # Cliente API con manejo de errores
├── store/                        # Estado global con Zustand
│   ├── userStore.ts              # Estado de usuarios y paginación
│   └── themeStore.ts             # Estado del tema
├── types/                        # Definiciones de tipos TypeScript
│   ├── shared-types.ts           # Tipos compartidos (User, Address, etc.)
│   ├── hooks-types.ts            # Tipos de hooks y sus retornos
│   └── styled-components-types.ts # Tipos de styled-components
└── utils/                        # Utilidades
    └── cache.ts                  # Sistema de caché con AsyncStorage
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

3. **Configura las variables de entorno:**

   ```bash
   cp env.example .env
   ```

4. **Inicia el servidor de desarrollo:**

   ```bash
   npm start
   # o
   expo start
   ```

5. **Ejecuta la aplicación:**
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

La aplicación incluye tests unitarios completos con **100% de cobertura** que cubren:

### Componentes Testeados

- **UserCard** - Renderizado, interacciones y accesibilidad
- **SearchBar** - Funcionalidad de búsqueda y estados
- **RetryMessage** - Manejo de errores y reintentos
- **SkeletonLoader** - Estados de carga
- **HeaderSection** - Navegación y toggle de tema
- **FooterSection** - Estados de paginación
- **EmptyState** - Estado vacío de búsqueda
- **UserInfoCard** - Información básica del usuario
- **ContactCard** - Datos de contacto
- **AddressCard** - Información de dirección
- **CompanyCard** - Datos de empresa

### Stores Testeados

- **userStore** - Estado de usuarios, paginación y errores
- **themeStore** - Manejo de temas y persistencia

### Servicios Testeados

- **API calls** - Requests, timeouts y manejo de errores
- **Cache** - Sistema de caché y TTL

### Ejecutar Tests

```bash
# Todos los tests
npm test

# Tests en modo watch
npm run test:watch

# Con reporte de cobertura
npm run test:coverage

# Tests con salida detallada
npm test -- --verbose
```

### Cobertura de Tests

El proyecto mantiene **100% de cobertura** para:

- ✅ **Líneas de código** - 100%
- ✅ **Funciones** - 100%
- ✅ **Ramas** - 100%
- ✅ **Declaraciones** - 100%

### Configuración de Tests

- **Jest** como test runner
- **React Testing Library** para testing de componentes
- **Zustand mocking** para stores
- **AsyncStorage mocking** para persistencia
- **Configuración modular** con archivos de test por componente

## 🎨 Características de UI/UX

### Diseño Moderno

- **Interfaz limpia y minimalista** con diseño consistente
- **Tarjetas con bordes redondeados** y sombras sutiles
- **Colores optimizados** con soporte completo para modo oscuro
- **Tipografía clara** y jerarquía visual bien definida

### Modo Oscuro

- **Toggle manual** entre modo claro y oscuro
- **Detección automática** de preferencias del sistema
- **Colores optimizados** para ambos modos
- **Transiciones suaves** entre temas

### Avatares

- **Imágenes aleatorias** desde Picsum Photos
- **Placeholder consistente** por usuario
- **Carga optimizada** con lazy loading
- **Accesibilidad completa** con labels descriptivos

### Estados de Carga

- **Skeleton loaders** para carga inicial
- **Indicadores de progreso** para paginación
- **Estados de error** con mensajes claros
- **Feedback visual** para todas las interacciones

## 🔧 Configuración

### Variables de Entorno

El proyecto utiliza variables de entorno para configurar la API y otros parámetros sensibles.

#### Configuración Inicial

1. **Crea el archivo `.env` en la raíz del proyecto:**

   ```bash
   cp env.example .env
   ```

2. **Personaliza las variables según tu entorno:**
   ```bash
   # .env
   EXPO_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
   EXPO_PUBLIC_API_TIMEOUT=10000
   EXPO_PUBLIC_API_MAX_RETRIES=3
   EXPO_PUBLIC_API_RETRY_DELAY=1000
   EXPO_PUBLIC_CACHE_TTL=30000
   EXPO_PUBLIC_MAX_USERS=100
   EXPO_PUBLIC_PAGE_SIZE=10
   EXPO_PUBLIC_ENVIRONMENT=development
   ```

#### Variables Disponibles

| Variable                      | Descripción                      | Valor por Defecto                      |
| ----------------------------- | -------------------------------- | -------------------------------------- |
| `EXPO_PUBLIC_API_BASE_URL`    | URL base de la API               | `https://jsonplaceholder.typicode.com` |
| `EXPO_PUBLIC_API_TIMEOUT`     | Timeout de requests (ms)         | `10000`                                |
| `EXPO_PUBLIC_API_MAX_RETRIES` | Número máximo de reintentos      | `3`                                    |
| `EXPO_PUBLIC_API_RETRY_DELAY` | Delay entre reintentos (ms)      | `1000`                                 |
| `EXPO_PUBLIC_CACHE_TTL`       | Tiempo de vida del caché (ms)    | `30000`                                |
| `EXPO_PUBLIC_MAX_USERS`       | Límite máximo de usuarios        | `100`                                  |
| `EXPO_PUBLIC_PAGE_SIZE`       | Usuarios por página              | `10`                                   |
| `EXPO_PUBLIC_ENVIRONMENT`     | Entorno (development/production) | `development`                          |

#### Configuración por Entorno

**Desarrollo:**

```bash
EXPO_PUBLIC_ENVIRONMENT=development
EXPO_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

**Producción:**

```bash
EXPO_PUBLIC_ENVIRONMENT=production
EXPO_PUBLIC_API_BASE_URL=https://tu-api-produccion.com
EXPO_PUBLIC_CACHE_TTL=300000
```

### Personalización

Puedes personalizar:

- **Variables de entorno:** Edita el archivo `.env`
- **Configuración centralizada:** Modifica `src/config/environment.ts`
- **Estilos:** Edita los archivos `.styles.ts` de cada componente
- **API:** Cambia `EXPO_PUBLIC_API_BASE_URL` en `.env`
- **Límites:** Ajusta `EXPO_PUBLIC_MAX_USERS` y `EXPO_PUBLIC_PAGE_SIZE`

## 🚨 Manejo de Errores

### Tipos de Errores Manejados

- **Errores de red** - Sin conexión a internet
- **Timeouts** - Requests que tardan demasiado
- **Errores del servidor** - Códigos 5xx
- **Errores del cliente** - Códigos 4xx
- **Errores desconocidos** - Fallos inesperados

### Estrategia de Reintentos

- **Reintentos automáticos** con backoff exponencial
- **Límite máximo** de 3 reintentos por defecto
- **Delay configurable** entre reintentos
- **Mensajes específicos** según el tipo de error

### Cambio de API

Para cambiar la API, simplemente modifica la variable de entorno:

```bash
# .env
EXPO_PUBLIC_API_BASE_URL=https://tu-nueva-api.com
```

**La aplicación automáticamente:**

- ✅ Usará la nueva URL
- ✅ Mantendrá el manejo de errores
- ✅ Conservará la funcionalidad de caché
- ✅ Aplicará los mismos timeouts y reintentos

### Debugging de Errores

1. **Revisa la consola** para logs detallados
2. **Usa el botón "Clear Cache"** para forzar nueva carga
3. **Verifica la conectividad** de red
4. **Comprueba la URL** de la API en `.env`

## 📱 Funcionalidades Detalladas

### Lista de Usuarios

- **Paginación configurable** (10 usuarios por página por defecto)
- **Scroll infinito** para cargar más usuarios automáticamente
- **Búsqueda en tiempo real** por nombre o email
- **Límite máximo** de 100 usuarios totales
- **Skeleton loaders** durante la carga inicial
- **Estados de error** con opciones de reintento

### Pantalla de Detalles

- **Información completa** del usuario seleccionado
- **Datos de contacto** (teléfono, email)
- **Dirección completa** con coordenadas geográficas
- **Información de la empresa** (nombre, catchphrase, bs)
- **Skeleton loader** durante la navegación
- **Navegación fluida** de regreso a la lista

### Búsqueda Avanzada

- **Búsqueda en tiempo real** sin delay
- **Filtrado por nombre o email**
- **Estado vacío** cuando no hay resultados
- **Preservación del scroll** durante la búsqueda
- **Limpieza automática** al cambiar de pantalla

### Caché Inteligente

- **Almacenamiento local** usando AsyncStorage
- **TTL configurable** (30 segundos por defecto)
- **Recuperación automática** de datos cacheados
- **Invalidación manual** con botón "Clear Cache"
- **Fallback offline** cuando no hay conexión

## 🏗️ Arquitectura

### Principios de Diseño

- **Separación de responsabilidades** - Lógica separada de presentación
- **Componentes reutilizables** - Cada componente tiene su propio archivo de estilos y tests
- **Custom hooks** - Lógica de negocio encapsulada en hooks
- **Tipado completo** - TypeScript en todos los archivos
- **Configuración centralizada** - Variables de entorno y tipos organizados

### Patrones Implementados

- **Container/Presentational** - Hooks manejan lógica, componentes manejan UI
- **Custom Hooks** - Reutilización de lógica entre componentes
- **Styled Components** - Estilos tipados y temáticos
- **Error Boundaries** - Manejo robusto de errores
- **Caching Strategy** - TTL y invalidación inteligente

## 🤝 Contribución

### Guías de Contribución

1. **Fork el proyecto**
2. **Crea una rama** para tu feature (`git checkout -b feature/AmazingFeature`)
3. **Sigue las convenciones** de código existentes
4. **Añade tests** para nuevas funcionalidades
5. **Mantén 100% de cobertura** de tests
6. **Commit tus cambios** (`git commit -m 'feat: add amazing feature'`)
7. **Push a la rama** (`git push origin feature/AmazingFeature`)
8. **Abre un Pull Request**

### Convenciones de Código

- **TypeScript estricto** - Sin `any` types
- **Componentes funcionales** - Con hooks
- **Styled Components** - Para todos los estilos
- **Tests obligatorios** - Para cada componente
- **Commits semánticos** - Usando conventional commits

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🙏 Agradecimientos

- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) por la API de usuarios
- [Picsum Photos](https://picsum.photos/) por las imágenes de avatar
- [Expo](https://expo.dev/) por el framework de desarrollo
- [Styled Components](https://styled-components.com/) por la solución de estilos
- [Zustand](https://zustand-demo.pmnd.rs/) por el manejo de estado
