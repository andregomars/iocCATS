export enum DataSourceType {
  Local,
  Firebase,
  Swagger
}

export const environment = {
  production: true,
  agm: { apiKey: '' },
  firebase: {
    apiKey: '',
    authDomain: 'ioccatsdemo.firebaseapp.com',
    databaseURL: 'https://ioccatsdemo.firebaseio.com',
    projectId: 'ioccatsdemo',
    storageBucket: 'ioccatsdemo.appspot.com',
    messagingSenderId: '652898326248'
  },
  apiRootLocal: 'assets/data',
  apiRootIocCATS: 'http://localhost:8080/api/rest/v1',
  dataSource: DataSourceType.Swagger
};
