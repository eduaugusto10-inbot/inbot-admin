const db = require("../config/dbWhatsapp");

module.exports = {
    create: (customer) => {
        console.log(customer)
          return new Promise((accept, reject) => { 
            db.query(
              "INSERT INTO smartersNumber (number,client,observation,accessToken,botId,botToken,botServerType) VALUES(?,?,?,?,?,?,?);",
              [customer.number,customer.client,customer.observation,customer.accessToken,customer.botId,customer.botToken,customer.botServerType],
              (error, results) => {
                if (error) {
                  return reject("Request create error");
                }
                accept(results);
              }
            );
          });
        },
}