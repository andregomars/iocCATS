// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
export enum DataSourceType {
  Local,
  Firebase,
  Swagger
}

export const environment = {
  production: false,
  agm: { apiKey: '' },
  firebase: {
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: ''
  },
  apiRootLocal: 'assets/data',
  apiRootIocCATS: 'http://localhost:8080/api/rest/v1',
  dataSource: DataSourceType.Local
};
