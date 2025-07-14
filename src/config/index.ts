export default {
  port: process.env.PORT || 8080,
  DATABASE_URL: process.env.POSTGRESQL_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};
