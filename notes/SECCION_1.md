# Requisitos de Instalación y materiales

## Instalaciones para seguir el curso

- VS Code (https://code.visualstudio.com/) o IDX (https://idx.google.com/)
- Node.js (https://nodejs.org/es/) o Bun (https://bun.sh/)
- Postman (https://www.postman.com/) o REST Client (https://open-vsx.org/extension/humao/rest-client)
- Git (https://git-scm.com/)
- Mongo Compass (https://www.mongodb.com/products/compass) o DBeaver (https://dbeaver.io/)
- Docker (https://www.docker.com/)

## Clean Architecture + Node

_Descripción del Proyecto_

Vamos a crear una App de gestión de usuarios. Crearemos endpoints para manejar usuarios (CRUD) y manejar autenticación (auth con JWT). Para esta app se va a utilizar Arquitectura Limpia propuesta por Robert C. Martin del libro Clean Architecture. También implementaremos el patrón Repository para manejar diferentes Bases de datos.

_Detalles de la Clean Architecture_

La Clean Architecture es una arquitectura de software que se basa en la idea de que el código debe ser modularizado de manera que cada parte del código se pueda reutilizar en diferentes contextos. En otras palabras, la Clean Architecture se enfoca en separar el código en capas, cada capa se encarga de una tarea específica y se comunica con otras capas mediante interfaz de alto nivel.

- Entidad (Entities): Una entidad es una unidad de datos que representa un concepto o entidad real en el dominio del sistema.

```typescript
// Ejemplo
export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public email: string,
    public password: string,
    public role: string[],
    public img?: string
  );
}
```

- Casos de Uso (Use Cases): Son las interacciones entre entidades y sistemas que representan los diferentes casos de uso del sistema.

```bash
|- use-cases
  |- auth
    |- login-user.use-case.ts
    |- register-user.use-case.ts
```

- Presentadores (Presenters): Son las capas que se encargan de presentar los datos a los usuarios y manejar las interacciones del usuario. En nuestro caso hace referencia a los Endpoints, Controladores, Rutas y Middlewares.

  - Rutas
  - Controladores
  - Middlewares

- Bases de Datos (Database): Es la capa más externa ya que la idea es desacoplar al sistema del método de persistencia.
  - MongoDB

_No debería afectar si:_

- Cambiamos la base de datos
- Cambiar dependencias
- Añadimos o eliminamos funciones
- Queremos trabajar con múltiples origenes de datos o destinos

## Inicio de proyecto: Node + TypeScript

> ![NOTE]
> En mi caso, voy a utilizar Bun, pero en el curso utiliza npm
> De igual forma, voy a indicar los paquetes que instala

### Instalación

- Inicializamos el proyecto

```bash
npm init -y
# o
bun init -y
```

> !NOTE
> Por defecto, al hacer bun init -y se instala typescript y se crea un archivo tsconfig.json
> Por lo que el paso 3 no hace falta hacerlo

- Instalar TypeScript y demás dependencias

```bash
npm i -D typescript @types/node ts-node-dev rimraf
# o
bun i -D ts-node-dev rimraf
```

- Inicializar el archivo de configuración de TypeScript (Se puede configurar a gusto). Si estás utilizando bun, podes eliminar el archivo `tsconfig.json` para generarlo con esta configuración

```bash
npx tsc --init --outDir dist/ --rootDir src
# o
bun tsc --init --outDir dist/ --rootDir src
```

- Otra opción es cambiar a mano la configuración

```json
{
  "compilerOptions": {
    // ...
    "rootDir": "src",
    "outDir": "dist/"
    // ...
  }
}
```

- Por ultimo vamos a agregar los secripts en el `package.json`

```json
{
  "scripts": {
    "dev": "ts-node-dev --respawn src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "bun build && bun dist/app.js"
  }
}
```

- Con bun hay que hacer aunlagunas pequeñas modificaciones

```json
{
  //...
  "scripts": {
    "dev": "bun --watch src/app.ts",
    "build": "rimraf ./dist && tsc",
    "start": "bun run build && bun dist/app.js"
  }
}
```

> !NOTE
> Si utilizas Bun, no es necesario usar ts-node-dev, ya que Bun permite el uso de TypeScript nativamente

## Explicación de Directorios a Usar

```bash
|- src
  |- presentation # Lo que está cerca de los usuarios
  |- infrastructure # Punto intermedio entre domain y presentation
  |- domain # Las reglas que gobiernan la aplicación
```

`domain`: No deberían tener dependencias externas.
`infrastructure`: Es donde se va a crear las implementaciones respectivas, mappers (transformación de datos).

## Creación de servidor Express

- Primero creamos una función principal autoinvocada (main)

```typescript
(() => {
  main();
})();

async function main() {
  // todo: Inicio de nuestro server
}
```

- Creamos el archivo `server.ts` en la carpeta `presentation`

```typescript
export class Server {
  constructor() {
    // Aqui recibimos la configuración
    // Mis clases deben estar abiertas a expansión y cerradas a modificación
  }

  async start() {
    // La idea es que dentro de start tengamos una app backend
    // Ya sea con Express, Fastify, etc
  }
}
```

- En este curso se usa Express por lo que hay que instalarlo

```bash
npm i express @types/express
# o
bun i express @types/express
```

- Creamos una instancia de express en nuestro server

```typescript
import express from "express";

export class Server {
  public readonly app = express();

  constructor() {}

  async start() {
    this.app.listen(3000, () => {
      console.log("Server started on port 3000");
    });
  }
}
```

- Para iniciar el server debemos crear una instancia de server y llamar al metodo `start`

```typescript
async function main() {
  new Server().start();
}
```

_Conceptos de Arquitectura Limpia_

- Cuando una función o constructor recibe más de 1 o 2 argumentos, deberiamos pasarle un objeto
- En nuestro caso para el constructor de Server, le pasamos un objeto `options` de una interface `Options` creada por nosotros
