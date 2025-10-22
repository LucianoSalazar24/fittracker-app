# FitTracker - Control de Entrenamientos Semanales

FitTracker es una aplicación móvil desarrollada en React Native con Expo y TypeScript que permite llevar un control de los entrenamientos semanales de una persona.

El objetivo principal es ofrecer una herramienta simple y visual para registrar los días de entrenamiento, los ejercicios realizados y las repeticiones, manteniendo un seguimiento ordenado semana a semana.

Este proyecto fue realizado como **Trabajo Práctico Integrador (Examen Final)** de la materia **Desarrollo de Aplicaciones para Dispositivos Móviles**.

---

## Objetivos del Proyecto

- Diseñar una aplicación funcional y organizada utilizando Expo y TypeScript.
- Implementar navegación mediante Stack y Tabs Navigation.
- Incorporar un listado dinámico (FlatList) con alta, edición y eliminación de entrenamientos.
- Utilizar formularios con validaciones y feedback visual.
- Aplicar un diseño responsive y limpio utilizando Flexbox.
- Mantener una estructura de carpetas clara y profesional, siguiendo las buenas prácticas vistas en clase.

---

## Instalación y Ejecución

### Requisitos previos:
- Node.js (versión 18 o superior)
- npm
- Expo Go instalado en tu dispositivo móvil (disponible en App Store y Google Play)

### Pasos:

**1. Clonar el repositorio**
```bash
git clone https://github.com/LucianoSalazar24/fittracker-app.git
cd fittracker-app
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Iniciar la aplicación**
```bash
npx expo start
```

**4. Ejecutar en tu dispositivo**
- Escanea el código QR que aparece en la consola con Expo Go desde tu celular
- La aplicación se cargará automáticamente

---

## Estructura de Carpetas del Proyecto

```
MIPRIMERAAPP/
├── .expo/
├── .vscode/
├── assets/
├── node_modules/
├── src/
│   ├── components/
│   ├── constants/
│   ├── navigation/
│   ├── screens/
│   ├── types/
│   └── utils/
├── .gitignore
├── app.json
├── App.tsx
├── index.ts
├── package.json
├── tsconfig.json
└── README.md
```
---

## Dependencias Principales

- **expo**: framework base para desarrollo multiplataforma
- **react-native**: núcleo del entorno móvil
- **typescript**: tipado estático para mayor robustez
- **@react-navigation/native**: navegación entre pantallas
- **@react-navigation/stack**: navegación tipo Stack (flujo principal)
- **@react-navigation/bottom-tabs**: navegación por pestañas (menú inferior)
- **react-native-vector-icons**: íconos reutilizables
- **expo-status-bar**: personalización de la barra de estado

Las versiones exactas se encuentran en el archivo `package.json` del repositorio.

---

## Posibles Extensiones Futuras

- Persistencia local con AsyncStorage
- Estadísticas semanales con gráficos
- Sincronización en la nube
- Perfil del usuario con metas de entrenamiento

---

## Declaración de Uso de Inteligencia Artificial

Durante el desarrollo de este proyecto se utilizó asistencia de inteligencia artificial (Claude de Anthropic) para:
- Sugerencias de mejores prácticas en TypeScript y React Native
- Resolución de dudas técnicas específicas

**El código fuente, la lógica del proyecto y las decisiones técnicas fueron desarrolladas y comprendidas por el estudiante.**

---

## Autor

**Luciano Salazar**  
Materia: Desarrollo de Aplicaciones para Dispositivos Móviles  
Instituto: Instituto de Formación Técnica Superior 16  
Año: 2025