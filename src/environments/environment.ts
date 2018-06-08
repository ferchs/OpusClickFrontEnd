// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  appUrl: 'localhost:4200',
  devApiUrl: 'http://localhost:8083/v1',
  firebase :{
    apiKey: "AIzaSyDESia3jwf8z6wH8U2drp6tJdMExAegOl0",
    authDomain: "ng-opus.firebaseapp.com",
    databaseURL: "https://ng-opus.firebaseio.com",
    projectId: "ng-opus",
    storageBucket: "ng-opus.appspot.com",
    messagingSenderId: "692834552585"
  }
};
