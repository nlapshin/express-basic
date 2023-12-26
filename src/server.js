const express = require("express");
const routes = require('./routes');

const validateJSON = (jsonSchema) => {
  return (req, res, next) => {
    if (jsonSchema.params) {
      req.params = validateJSONSchema(req.params, jsonSchema.params);
    }
  }
}

;(() => {
  const app = express(); // создаем инстанс сервера.

  const authenticate = (req, res, next) => {
    if (req.query.token === 'valid-token') {
      return next();
    }
    res.status(401).send('Необходима аутентификация');
  };

  app.use('/users', routes);
  

  
  app.get('/hello', authenticate, (req, res) => {
    res.send('Hello world');
  });


  // app.get('/error', (req, res) => {
  //   // throw new Error('custom-error');
  // });


  // app.use((err, req, res, next) => {
  //   console.log(err);
  //   console.error(err.stack);
  //   res.status(500).send('Что-то пошло не так!');
  // });

  // app.get('/hello/json', (req, res) => {
  //   res.json({ message: 'Hello world' });
  // });

  // app.get(/^\/hello\/(\d+)\/(\d+)$/, (req, res) => {
  //   console.log(req.params)
  
  //   res.send(`Hello regexp`);
  // });

  // app.get('/hello/:id',
    // validateJSON({ 
    //   params: {
    //     type: 'object',
    //     properties: {
    //       id: {
    //         type: 'integer'
    //       }
    //     }
    //   }
    // })
    // преобразование
    // (req, res, next) => {
    //   console.log('callback 1', typeof req.params.id);

    //   req.params.id = Number(req.params.id);
    //   req.customParam = 'customValue';

    //   next();
    // }, 
    // (req, res) => {
    //   // console.log(req);
    //   console.log('callback 2', typeof req.params.id);
    //   console.log(req.customParam);
    //   console.log(req.query);
    //   console.log(req.headers);

    //   res.send(`Hello ${req.params.id}`);
    // });

  app.listen(8080);

  console.log('Server started on 8080 port');
})();










// const routes = require('./routes'); // Путь к вашему маршрутизатору

// app.use('/users', routes);

// app.get('/hello', (req, res) => {
//   res.send('Hello world');
// });

// app.get('/hello/:name', (req, res) => {
//   res.send(`Hello ${req.params.name}`);
// });

// app.get('/hello/json', (req, res) => {
//   res.json({ message: 'Hello world' });
// });

// app.get('/error', (req, res) => {
//   throw new Error('some error');
// });

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Что-то пошло не так!');
// });
