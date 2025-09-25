module.exports = {
  preset: "jest-expo",
  setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/android/", "/ios/"],
  testMatch: [
    "<rootDir>/src/**/*.test.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@screens/(.*)$": "<rootDir>/src/screens/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@store/(.*)$": "<rootDir>/src/store/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@nav/(.*)$": "<rootDir>/src/navigation/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
  },
  testTimeout: 10000,
  verbose: true,
  collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts",
    "!src/**/*.test.{js,jsx,ts,tsx}",
    "!src/**/__tests__/**",
    "!src/**/node_modules/**",
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(jest-)?react-native|@react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg|styled-components/native)",
  ],
};
