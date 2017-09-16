const casual = require('casual');
const shared = require('./shared');

const customers = {};
const customersByRep = {};

const generate = ({
  id = `C-${ casual.integer(10000, 80000) }`,
  salesRep = `R-${ casual.integer(500000, 800000) }`,
}) => {
  if (customers[id]) {
    return customers[id];
  }
  const address = shared.address();
  const profile = shared.contact();
  const sites = [];

  const customer = {
    id,
    address,
    profile,
    sites,
    salesRep,
  };

  const siteCount = Math.ceil(Math.random() * 3);

  for (let i = 0; i >= siteCount; i++) {
    sites.push(shared.address());
  }

  return (customers[id] = customer); // eslint-disable-line no-extra-parens
};

exports.get = (id) => {
  return Promise.resolve(generate({ id }));
};

function byRep(badgeId) {
  if (customersByRep[badgeId]) {
    return customersByRep[badgeId];
  }

  let customerCount = Math.ceil(Math.random() * 100) + 15;
  const repCustomers = Object.keys(customers)
    .map((customerId) => {
      return customers[customerId];
    })
    .filter((customer) => {
      return customer.salesRep === badgeId;
    });

  for (; customerCount > 0; customerCount--) {
    repCustomers.push(generate({ salesRep: badgeId }));
  }

  return (customersByRep[badgeId] = repCustomers); // eslint-disable-line no-extra-parens
}

exports.query = ({ repId: badgeId, state }) => {
  if (!badgeId) {
    throw new Error('query by repId');
  }

  let repCustomers = byRep(badgeId);

  if (state) {
    repCustomers = repCustomers.filter((customer) => {
      return customer.address.state === state;
    });
  }

  return Promise.resolve(repCustomers);
};
