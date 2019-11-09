const express = require('express');

const app = express();
const graphPath = '/graphql';

app.get('/', (req, res) => {
  res.send(`Graph server is running at ${graphPath}`);
});

module.exports = mode => {
  const ISDEV = mode !== 'production';

  return {
    server: {
      introspection: ISDEV,
      playground: false,
      port: process.env.PORT || 4000,
      applyMiddleware: {
        app,
        path: graphPath,
      },
    },
  };
};
