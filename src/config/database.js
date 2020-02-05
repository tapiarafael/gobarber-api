module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5431',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true,
    underscored: true,
    undersocredAll: true,
  },
};
