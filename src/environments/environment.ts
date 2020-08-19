// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // endpoint: 'http://localhost:3000',
  firebase: {
    apiKey: "AIzaSyD9rYmW5yDFCdFyym8R8Uy71PPdpkDg6M0",
    authDomain: "madina-cafe.firebaseapp.com",
    databaseURL: "https://madina-cafe.firebaseio.com",
    projectId: "madina-cafe",
    storageBucket: "madina-cafe.appspot.com",
    messagingSenderId: "710715879487",
    appId: "1:710715879487:web:01bfd9dda3d35fe3e0088a",
    measurementId: "G-V9GBFS69W0"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
