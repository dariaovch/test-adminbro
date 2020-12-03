const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');

const express = require('express');

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

const adminBro = new AdminBro({
  databases: [],
  rootPath: '/admin',
});

const router = AdminBroExpress.buildRouter(adminBro);

app.use(adminBro.options.rootPath, router);

app.listen(PORT, () => {
  console.log(`The AdminBro app is listening to port ${PORT}`);
});
