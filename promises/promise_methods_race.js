

const dataBase = {
  customer: [
    {id: 1, name: "John", orders: [2, 4, 5]},
    {id: 2, name: "Andrew", orders: [1, 6]},
    {id: 3, name: "Justin", orders: [7, 8, 9]},
    {id: 4, name: "Shawna", orders: [10, 14, 13]},
  ],
  orders: [
    {id: 1, prod_id: 1, date: "05/23/2013"},
    {id: 2, prod_id: 2, date: "05/23/2013"},
    {id: 3, prod_id: 3, date: "05/23/2013"},
    {id: 4, prod_id: 2, date: "05/23/2013"},
    {id: 5, prod_id: 4, date: "05/23/2013"},
    {id: 6, prod_id: 2, date: "05/23/2013"},
    {id: 7, prod_id: 4, date: "05/23/2013"},
    {id: 8, prod_id: 1, date: "05/23/2013"},
    {id: 9, prod_id: 2, date: "05/23/2013"},
    {id: 10, prod_id: 2, date: "05/23/2013"},
    {id: 11, prod_id: 4, date: "05/23/2013"},
    {id: 12, prod_id: 3, date: "05/23/2013"},
    {id: 13, prod_id: 1, date: "05/23/2013"},
  ],
  models: [
    {id: 1, model: "ABC3", manufacturer: "Microsoft"},
    {id: 2, model: "FED3", manufacturer: "Apple"},
    {id: 3, model: "BA_348", manufacturer: "Samsung"},
    {id: 4, model: "ASD_234", manufacturer: "LG"},
  ]
}

// back end
const server1 = {
  loadTime: 500,
  getCustomerById: function(cus_id){
    const customer = dataBase.customer.filter(function(cus){
      return cus.id === cus_id;
    })[0];
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        if(customer){
          resolve({server_id: 1, customer: customer});
        } else {
          reject("NO_CUSTOMER_FOUND");
        }
      }, 500);
    });
  }
}
const server2 = {
  loadTime: 1,
  getCustomerById: function(cus_id){
    const customer = dataBase.customer.filter(function(cus){
      return cus.id === cus_id;
    })[0];
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        if(customer){
          resolve({server_id: 2, customer: customer});
        } else {
          reject("NO_CUSTOMER_FOUND");
        }
      }, 1);
    });
  }
}
const server3 = {
  loadTime: 1000,
  getCustomerById: function(cus_id){
    const customer = dataBase.customer.filter(function(cus){
      return cus.id === cus_id;
    })[0];
    return new Promise(function(resolve, reject) {
      setTimeout(function () {
        if(customer){
          resolve({server_id: 3, customer: customer});
        } else {
          reject("NO_CUSTOMER_FOUND");
        }
      }, 1000);
    });
  }
}

// front-end

function getCustomerById(id) {
  return Promise.race([server1, server2, server3].map(function(server){
    return server.getCustomerById(id);
  }));
}
getCustomerById(3)
  .then(function(data){
    console.log("got customer: "
      + JSON.stringify(data.customer)
      + " from server: "
      + data.server_id);
    console.log(data);
  })
