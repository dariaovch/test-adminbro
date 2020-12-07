const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://daraovcinnikova@localhost:5432/weather_db');

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

AdminBro.registerAdapter(AdminBroSequelize);

const express = require('express');

const Weather = require('./models/weather');

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

const testDataBase = {
  name: 'TestDataBase',
  icon: 'MostlyCloudy',
};

const adminBro = new AdminBro({
  // databases: [sequelize],
  resources: [{ resource: Weather, options: { navigation: testDataBase } }],
  rootPath: '/admin',
  branding: {
    companyName: 'Daria LLC',
  },
  dashboard: {
    handler: async () => {
      return  adminBro.options.resources;
    },
    component: AdminBro.bundle('./src/dashboard'),
  },
});

const ADMIN = {
  email: 'test@example.com',
  password: 'password',
};

//const router = AdminBroExpress.buildRouter(adminBro);

const authRouter = (admin) => {
  const router =  AdminBroExpress.buildAuthenticatedRouter(admin, {
    cookieName: 'adminbro',
    cookiePassword: 'somePassword',
    authenticate: async (email, password) => {
      if (ADMIN.password === password && ADMIN.email === email) {
        return ADMIN;
      }
      return null;
    }
  });
  return router
};


app.use(adminBro.options.rootPath, authRouter(adminBro));

app.listen(PORT, () => {
  console.log(`The AdminBro app is listening to port ${PORT}`);
});
