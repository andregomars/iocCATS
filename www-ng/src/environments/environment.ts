// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  agm: { apiKey: 'AIzaSyC2aUGq0zuZMLTgrUG72Wb4LX6nOA_Q4VM' },
  firebase: {
    apiKey: 'AIzaSyAvlOwka2tHQ11k7cFxD0gWrv8_u19yIDc',
    authDomain: 'ioccatsdemo.firebaseapp.com',
    databaseURL: 'https://ioccatsdemo.firebaseio.com',
    projectId: 'ioccatsdemo',
    storageBucket: 'ioccatsdemo.appspot.com',
    messagingSenderId: '652898326248'
  }
};
