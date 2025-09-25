export const ENV = {
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL ||
    "https://jsonplaceholder.typicode.com",
  API_TIMEOUT: Number(process.env.EXPO_PUBLIC_API_TIMEOUT) || 10000,
  API_MAX_RETRIES: Number(process.env.EXPO_PUBLIC_API_MAX_RETRIES) || 3,
  API_RETRY_DELAY: Number(process.env.EXPO_PUBLIC_API_RETRY_DELAY) || 1000,

  CACHE_TTL: Number(process.env.EXPO_PUBLIC_CACHE_TTL) || 30000,
  MAX_USERS: Number(process.env.EXPO_PUBLIC_MAX_USERS) || 100,
  PAGE_SIZE: Number(process.env.EXPO_PUBLIC_PAGE_SIZE) || 10,

  ENVIRONMENT: process.env.EXPO_PUBLIC_ENVIRONMENT || "development",

  IS_DEVELOPMENT: process.env.EXPO_PUBLIC_ENVIRONMENT === "development",
  IS_PRODUCTION: process.env.EXPO_PUBLIC_ENVIRONMENT === "production",
} as const;

export const API_URLS = {
  USERS: `${ENV.API_BASE_URL}/users`,
} as const;
