const NODE_ENV = process.env;

module.exports = {
  // eslint-disable-next-line radix
  PORT: parseInt(process.env.PORT) || 3000,
  JWT_SECRET: NODE_ENV === 'production' ? process.env.JWT_SECRET : 'some-secket-key',
  MONGO_IP: NODE_ENV === 'production' ? process.env.MONGO_IP : 'mongodb://localhost:27017/diplomadb',
};
