const express = require("express");
const routes = require('./routes'); // Путь к вашему маршрутизатору

// npm init -y - это позволяет нам проинциализировать наш репозиторий
// npm i express - ставим зависимость нашего веб-сервера


const app = express();

app.use('/users', routes);

// Логгирование
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Авторизации миддлевэр
app.use((req, res, next) => {
  if (req.headers.authorization === 'token') {
    console.log('ok');
    next();
  } else {
    res.sendStatus(401);
  }
});
  
app.get('/hello', (req, res) => {
  res.send('Hello world');
});

app.get('/hello/json', (req, res) => {
  // Выполнится ли эта часть?
  res.json({ message: 'Hello world' });
});

app.get('/hello/:name',
  (req, res, next) => {
    console.log('callback 1');
    
    next();
  },
  (req, res) => {
    console.log('callback 2');

    res.send(`Hello ${req.params.name}`);
  }
);

app.get('/error', (req, res) => {
  throw new Error('some error');
});


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Что-то пошло не так!');
});
  

app.listen(8080);
  
console.log('Server started on 8080 port');

// HTTP протокол
// 1. Что это?
// Клиент-серверный протокол взаимодействия между двумя точками.
// 2. HTTP запрос, что это?
// Title -> URL(/endpoint) Метод(GET/POST/PUT/DELETE/OPTIONS) версию протокола(какие версии есть)
// Headers -> мета информация о запросе.
// Body -> это полезная нагрузка.
// 3. HTTP ответ, что это?
// Title -> Status(200, 400, 500)
// Headers
// Body














// ;(() => {
//   const app = express();

//   app.use('/users', routes);

  // app.get('/hello/:name', (req, res) => {
  //   res.send(`Hello ${req.params.name}`);
  // });

  // app.get('/hello/json', (req, res) => {
  //   res.json({ message: 'Hello world' });
  // });

//   app.get('/error', (req, res) => {
//     throw new Error('some error');
//   });

//   app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Что-то пошло не так!');
//   });
  

//   app.listen(8080);

//   console.log('Server started on 8080 port');
// })();
