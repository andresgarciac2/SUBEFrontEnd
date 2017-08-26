# Arquitectura de Referencia Single Page Application
Single Page Application (SPA) construido con AngularJS 1.X.
Proyecto basado en [generator-gulp-angular](https://github.com/Swiip/generator-gulp-angular) con ciertas modificaciones usando [Typescript](http://www.typescriptlang.org/)
como lenguaje que transpila a ES5, [Gulp](http://gulpjs.com/) como task runner, [Webpack](https://webpack.github.io/) para la compilación de los scripts, [Bower](http://bower.io/) para manejo de dependencias de runtime,
[typings](https://github.com/typings/typings) para el manejo de definición de tipos en TS.

## Tabla de contenidos
* [Archivos de interés](#Archivos)
* [Instalación](#Instalación)
* [Definición de tipos en TS](#Typings)
* [Tareas disponibles en Gulp](#Gulp)
* [Desarrollo](#Desarrollo)
* [Pruebas](#Pruebas)

## Archivos
* `package.json` se encuentra la especificación de dependencias de desarrollo nodejs.

* `bower.json` se encuentran las dependencias javascript necesarias al momento de correr la aplicación.

* `gulpfile.js` se encuentra la especificación del build para compilar la aplicación a su versión de distribución.

* `typings.json` se especifican las definiciones Typescript de las librerias que estamos usando.

* `.nvmrc` se especifica la versión usada de NodeJS en el proyecto.

* `.tsconfig` se especifican las preferencias para la transpilacion de TS a JS.

* `.editorconfig` se especifican algunas preferencias para su IDE, verificar que tiene instalado el plugin para soportarlo.

* `gulp/scripts.js` se encuentra la compilacion de scripts con webpack y la variación de ambientes por medio del alias `environment`.

## Instalación
* Instalar y configurar en su ambiente las siguientes dependencias:
    * [nvm](https://github.com/creationix/nvm) - Para el manejo de distintas versiones de [NodeJS](https://nodejs.org)

    Usar e instalar la versión de NodeJS usada en el proyecto
    ```
    nvm install --lts
    nvm use --lts
    ```

    Instalar con npm las dependencias asociadas: bower, gulp y typings.
    ```
    npm install -g bower gulp typings
    ```

    Instalar dependencias del proyecto npm, bower y typings.
    ```
    npm install
    bower install
    typings install
    ```

## Typings

Mantener las versiones de tipos actualizadas con la última revisión.

* `typings ls` Lista las dependencias actuales y me informa por si hay una nueva versión.
* `typings install dt~angular --global --save` Actualiza la versión de angular y la persiste en el `typings.json`

## IDE

Configurar IDE con [typescript@next](https://github.com/Microsoft/TypeScript/wiki/Nightly-drops)

## Gulp

Como referencia documentación [Generador](https://github.com/Swiip/generator-gulp-angular/blob/master/docs/README.md)

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp qa` compila la aplicacion para el ambiente de qa
* `gulp production` compila la aplicacion para el ambiente de production
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode

## Desarrollo

### Estandar de codificacion

### Modulos

* `src/app/app.module.ts` Es el entry point de la aplicación donde se define el modulo principal, se referencian los modulos secundarios, las dependencias de desarrollo y las configuraciones ortogonales.

* `src/app/common/common.module.ts` El modulo comun donde se deben desarrollar los artefactos comunes (servicios, directivas, componentes, filtros) de otros modulos.

* `src/app/nombremodulo/nombremodulo.module.ts` Por cada bloque funcional de la aplicación se debe trabajar en su modulo respectivo.
En la definición del modulo angular se deben referenciar todos los artefactos (servicios, directivas, componentes, filtros, bloques de configuración del modulo, etc).

```
import { config } from './nombremodulo.config';
import { run } from './nombremodulo.run';
import { routes } from './nombremodulo.routes';

import { ServiceA } from './services/a.service';
import { ServiceB } from './services/b.service';

import { ComponentA } from './components/a.component';
import { ComponentB } from './components/b.component';
import { DirectiveC } from './directives/c.component';

export default angular.module('app.nombremodulo', [])
    .config(config)
    .config(routes)
    .run(run)
    .service('ServiceA', ServiceA)
    .service('ServiceB', ServiceB)
    .component('app-component-a', ComponentA)
    .component('app-component-b', ComponentB)
    .directive('app-directive-c', DirectiveC);
```

### Componentes y Directivas

* El desarrollo de la aplicación estara guiado exclusivamente mediante el uso de componentes web. Esto significa que NO se hará el uso del metodo .controller() angular,
o de templates que no esten asociados a un componente.
    * [Link de referencia](https://www.airpair.com/angularjs/posts/preparing-for-the-future-of-angularjs)
    * [Link de referencia](http://teropa.info/blog/2014/10/24/how-ive-improved-my-angular-apps-by-banning-ng-controller.html)

* Todo componente web que tenga un template asociado debe crearse usando el metodo .component().
    * [Link de referencia](http://toddmotto.com/exploring-the-angular-1-5-component-method)

* Todo componente web que no tenga template asociado, que tenga cierto comportamiento como manipular el DOM deb ser una .directive() de tipo atributo.

* Tener en cuenta los lifecycle hooks.
    * [Link de referencia](https://toddmotto.com/angular-1-5-lifecycle-hooks)

* Tener en cuenta el one-way data-binding.
    * [Link de referencia](https://toddmotto.com/one-way-data-binding-in-angular-1-5)

* Los estados de ui.router (URIs) deben referenciar al componente web asociado.

```
$stateProvider.state('miestado', {
    url: '/miestado',
    template: `<mi-componente-web></mi-componente-web>`
});
```
* Comunicación entre componentes usando Angular Reactive Extensions, a través de objetos observables dispuestos en los servicios del módulo.

### Estilos CSS

* `src/app/app.scss` es el archivo principal de los estilos donde gulp inyectara automaticamente en la compilación los otros archivos .scss que se encuentren en el proyecto.

* Cada componente web debe tener asociado sus estilos CSS usando SASS en un archivo con extensión .scss

## Pruebas
