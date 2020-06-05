module.exports = {
  // eslint-disable-next-line radix
  PORT: parseInt(process.env.PORT) || 3000,
  JWT_SECRET: process.env.JWT_SECRET || 'some-secket-key',
  MONGO_IP: process.env.MONGO_IP || 'mongodb://localhost:27017/diplomadb',
};
