// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  //apiUrlBase: 'https://api.opusclick.com/v1',
  //loginUrl: 'https://api.opusclick.com/login',
  apiUrlBase: 'http://localhost:8083/v1',
  loginUrl: 'http://localhost:8083/login',
  //apiUrlBase: 'https://awseb-e-m-AWSEBLoa-KZUE0LPFYPPZ-1995786846.us-east-1.elb.amazonaws.com:443/v1',
  //loginUrl: 'https://awseb-e-m-AWSEBLoa-KZUE0LPFYPPZ-1995786846.us-east-1.elb.amazonaws.com:443/login',
  supportPhone:'573222268918',
  terminalPublicKey:'a597deebb3d553b008824a39fccf1c2f',
  firebase :{
    apiKey: "AIzaSyDESia3jwf8z6wH8U2drp6tJdMExAegOl0",
    authDomain: "ng-opus.firebaseapp.com",
    databaseURL: "https://ng-opus.firebaseio.com",
    projectId: "ng-opus",
    storageBucket: "ng-opus.appspot.com",
    messagingSenderId: "692834552585"
  }
};
