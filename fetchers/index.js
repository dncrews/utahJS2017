
const glob = require('glob');
const path = require('path');

exports.build = () => {
  const filenames = glob.sync(`${ __dirname }/*.js`);

  return filenames
    .filter((filename) => {
      return filename !== __filename;
    })
    .reduce((obj, filename) => {
      log(filename);

      const file = require(filename).default; // eslint-disable-line global-require
      const type = path.basename(filename, '.js');

      obj[type] = file;

      return obj;
    }, {});
};
