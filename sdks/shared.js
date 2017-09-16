
const casual = require('casual');

exports.address = () => {
  return {
    street1: casual.address1,
    street2: casual.address2,
    city: casual.city,
    state: casual.state_abbr,
    zip: casual.zip(),
    country: casual.country_code,
    timezone: casual.timezone,
    geolocation: {
      latitude: casual.latitude,
      longitude: casual.longitude,
    },
  };
};

exports.contact = () => {
  return {
    givenName: casual.first_name,
    familyName: casual.last_name,
    email: casual.email,
    phone: casual.phone,
  };
};
