
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


// callback hell
function getCustomerById(cus_id, callback){
  const customer = dataBase.customer.filter(function(cus){
    return cus.id === cus_id;
  })[0];
  setTimeout(function () {
    callback(customer);
  }, 500);
}

function getOrdersByIds(order_ids, callback){
  const orders = dataBase.orders.filter(function(order){
    return order_ids.indexOf(order.id) != -1;
  })
  setTimeout(function () {
    callback(orders);
  }, 500);
}

function getModelById(model_id, callback){
  const model = dataBase.models.filter(function(mod){
    return mod.id === model_id;
  })[0];
  setTimeout(function () {
    callback(model);
  }, 500);
}

// code to get all the product models a customer has ordered

const productsOrdered = [];
getCustomerById(2, function(customer){
  getOrdersByIds(customer.orders, function(orders){
    orders.forEach(function(order){
      getModelById(order.prod_id, function(product){
        productsOrdered.push(product);
        if(orders.indexOf(order) === orders.length - 1){
          const product_models = productsOrdered.map(function(prod){ return prod.model });
          console.log( "Customer name " + customer.name + " has ordered " + product_models )
        }
      })
    })
  })
})
