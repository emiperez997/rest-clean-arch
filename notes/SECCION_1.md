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
> De igual forma, voy a indicar los paquetes que instala y cómo lo hago yo también

### Instalación (Curso)

- Inicializamos el proyecto

```bash
npm init -y
```

-
