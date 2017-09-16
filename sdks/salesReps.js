const casual = require('casual');
const shared = require('./shared');

const salesReps = {};

exports.get = (badgeId) => {
  console.info(`loading sales rep ${ badgeId }`);
  if (!salesReps[badgeId]) {
    const address = shared.address();
    const contact = shared.contact();

    contact.address = address;

    let customerCount = casual.integer(5, 20);

    const customers = [];

    for (; customerCount > 0; customerCount--) {
      customers.push(casual.integer(10000, 80000));
    }

    const rep = {
      badgeId,
      contact,
      customers,
    };

    salesReps[badgeId] = rep;
  }

  return Promise.resolve(salesReps[badgeId]);
};
