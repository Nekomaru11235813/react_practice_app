import type { Config } from 'jest'
const config: Config = {
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
  projects: [
    {
      displayName: 'main',
      preset: 'ts-jest',
      testEnvironment: 'node', // Electron main processはNode環境
      testMatch: ['<rootDir>/src/main/**/*.test.ts'],
      coverageDirectory: '<rootDir>/coverage/main',

      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.main.json',
        },
      },
    },
    {
      displayName: 'renderer',
      preset: 'ts-jest',
      testEnvironment: 'jest-environment-jsdom', // Rendererはブラウザ環境
      testMatch: [
        '<rootDir>/src/renderer/**/*.test.tsx',
        '<rootDir>/src/renderer/**/*.test.ts',
      ],

      coverageDirectory: '<rootDir>/coverage/renderer',
      moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
      },
      // setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.renderer.json',
        },
      },
    },
  ],
}

export default config
