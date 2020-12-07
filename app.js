const AdminBro = require('admin-bro');
const AdminBroExpress = require('@admin-bro/express');
const AdminBroSequelize = require('@admin-bro/sequelize');

// Подключаемся к ORM, тестируем подключение и регистрируем адаптер
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
// Модель для ввода данных о погоде
const Weather = require('./models/weather');

// Назначаем порт, с которого приложение слушает запросы
const { PORT = 3000 } = process.env;

const app = express();

// Кастомизация навигационной панели
const testDataBase = {
  name: 'TestDataBase',
  icon: 'MostlyCloudy',
};

// Объект опций для админки
const adminBro = new AdminBro({
  resources: [{ resource: Weather, options: { navigation: testDataBase } }],
  rootPath: '/admin',
  branding: {
    companyName: 'Daria LLC',
  },
  dashboard: {
    handler: async () => {
        return { resourceId: 'weather', action: 'list' };
   },
    component: AdminBro.bundle('./src/dashboard'),
  },
});

// Захардкодили данные для учетной записи админа
const ADMIN = {
  email: 'test@example.com',
  password: 'password',
};

// Создаем роутер с аутентификацией
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
  return router;
};


app.use(adminBro.options.rootPath, authRouter(adminBro));

app.listen(PORT, () => {
  console.log(`The AdminBro app is listening to port ${PORT}`);
});
