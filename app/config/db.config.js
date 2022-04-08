module.exports = {
  db: {
    database: process.env.DB_NAME || 'sql11484500',
    user: process.env.DB_USER || 'sql11484500',
    password: process.env.DB_PASS || 'SlllXLnWDz',
    options: {
      dialect: process.env.DIALECT || 'mysql', // sqlite original
      host: process.env.HOST || 'sql11.freemysqlhosting.net',
      storage: './intraenvios.sqlite',
      port: process.env.PORT || 3306 // 8081 original
    }
  }
}
