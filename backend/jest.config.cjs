/** roots: indica dónde buscar las pruebas.
testMatch: reconoce archivos terminados en .spec.ts.
transform: utiliza ts-jest para procesar TypeScript.
testEnvironment: ejecuta las pruebas en un entorno Node.js.
clearMocks: limpia el registro de llamadas de los mocks entre pruebas.*/

/** @type {import('jest').Config} */

module.exports = {
  rootDir: '.',
  roots: ['<rootDir>/src'],

  testMatch: ['**/*.spec.ts'],

  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.json',
      },
    ],
  },

  moduleFileExtensions: ['ts', 'js', 'json'],
  testEnvironment: 'node',
  clearMocks: true,
};