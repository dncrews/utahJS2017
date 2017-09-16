const casual = require('casual');
const shared = require('./shared');
const customerSites = {};
const sites = {};

exports.get = (id) => {
  if (!sites[id]) {
    const address = shared.address();

    sites[id] = {
      id,
      address,
    };
  }

  return Promise.resolve(sites[id]);
};

exports.query = ({ customerId }) => {
  if (customerSites[customerId]) {
    return Promise.resolve(customerSites[customerId]);
  }

  const siteIds = [];
  let siteCount = casual.integer(1, 2);

  for (; siteCount > 0; siteCount--) {
    siteIds.push(`S-${ casual.integer(500000, 800000) }`);
  }

  customerSites[customerId] = siteIds;

  return Promise.resolve(siteIds);
};
