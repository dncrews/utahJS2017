const graphHTTP = require('express-graphql');

const types = require('./schema');

const schema = types.schema;
const fetchers = types.fetchers;

const formatError = (err) => {
  // FIXME: Don't do this in production or something, right?
  let formatted = err;
  let original = err.originalError;

  if (err instanceof Error) {
    if (original) {
      if (original instanceof Error) {
        original = {
          message: original.message,
          stack: original.stack,
        };
      }
      formatted = Object.assign({}, original, {
        path: err.path,
        locations: err.locations,
      });
    } else {
      formatted = {
        message: err.message,
        raw: {
          message: err.message,
          stack: err.stack,
        },
      };
    }
  }

  log(JSON.stringify(formatted));

  return formatted;
};

exports.default = () => {
  return [
    graphHTTP((req, res) => {
      const context = {
        accessToken: res.locals.accessToken,
        viewer: res.locals.viewer,
        requestId: req.headers.requestId || uuid.v4(),
      };

      const reqFetchers = Object.keys(fetchers).reduce((prev, curr) => {
        const key = curr.toLowerCase();

        prev[key] = new fetchers[curr](context);

        return prev;
      }, {});

      context.fetchers = reqFetchers;

      return {
        schema,
        context,
        formatError,
      };
    }),
  ];
};
