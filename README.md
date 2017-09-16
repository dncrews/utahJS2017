# Queries









query welcomePage {
  customer(id:"C-1234") {
    id
    contact {
      givenName
      fullName
    }
    salesRep {
      badgeId
      contact {
        givenName
        phone
      }
    }
  }
}
























query detailsPage {
  customer(id:"C-1234") {
    ...fullCustomer
  }
}

fragment fullCustomer on Customer {
  id
  contact {
    ...fullContact
  }
  sites {
    ...fullSite
  }
  salesRep {
    badgeId
  }
}

fragment fullAddress on Address {
  street1
  street2
  city
  state
  postalCode
  country
  timezone
  geolocation {
    latitude
    longitude
  }
}

fragment fullContact on Contact {
  givenName
  familyName
  fullName
  email
  phone
  address {
    ...fullAddress
  }
}


fragment fullSite on Site {
  id
  address {
    ...fullAddress
  }
}























query topCustomers {
  firstGuy: customer(id:"C-1234") {
    ...shortCustomer
  }
  secondGuy: customer(id:"C-2345") {
    ...shortCustomer
  }
  thirdGuy: customer(id:"C-3456") {
    ...shortCustomer
  }
  fourthGuy: customer(id:"C-4567") {
    ...shortCustomer
  }
}

fragment shortCustomer on Customer {
  id
  contact {
    givenName
  }
  sites {
    id
  }
  salesRep {
    badgeId
    contact {
      givenName
      phone
    }
  }
}






















query circular {
  customer(id:"C-1234") {
    id
    contact {
      fullName
      address {
        state
      }
    }
    salesRep {
      badgeId
      contact {
        ...fullContact
      }
      customers {
        ...fullCustomer
        salesRep {
          badgeId
          contact {
            ...fullContact
          }
          customers {
            contact{
              fullName
            }
          }
        }
      }
    }
  }
}

















query circularQueries {
  customer(id:"C-1234") {
    id
    contact {
      fullName
      address {
        state
      }
    }
    salesRep {
      badgeId
      contact {
        ...fullContact
      }
      customers(state:"WA") {
        salesRep {
          badgeId
          customers(state:"WA") {
            id
            contact {
              fullName
            }
            salesRep {
              badgeId
              customers(state:"WA") {
                id
                contact {
                  fullName
                }
                salesRep {
                  badgeId
                  customers(state:"WA") {
                    id
                    contact {
                      fullName
                    }
                    salesRep {
                      badgeId
                      customers(state:"WA") {
                        id
                        contact {
                          fullName
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}














