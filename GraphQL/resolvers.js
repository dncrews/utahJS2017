
const customers = require('../sdks/customers');
const salesReps = require('../sdks/salesReps');
const sites = require('../sdks/sites');

exports.Query = {
  customer(source, args) {
    return customers.get(args.id);
  },
};


exports.Address = {
  postalCode(source) {
    return source.postalCode || source.zip;
  },
};

exports.Contact = {
  fullName(source) {
    return `${ source.givenName } ${ source.familyName }`;
  },
};

exports.Customer = {
  contact(source) {
    const { address, profile } = source;

    profile.address = address;

    return profile;
  },
  salesRep(source) {
    const repId = source.salesRep;


    return salesReps.get(repId);
  },
  salesPerson(source) {
    const repId = source.salesRep;

    return salesReps.get(repId);
  },
  sites(source) {
    return sites.query({ customerId: source.id })
      .then((siteIds) => {
        return Promise.all(siteIds.map((siteId) => {
          return sites.get(siteId);
        }));
      });
  },
};

exports.Employee = {
  customers(source, args) {
    return customers.query({
      repId: source.badgeId,
      state: args.state,
    });
  },
};
