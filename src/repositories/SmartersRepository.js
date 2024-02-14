const db = require("../config/dbWhatsapp");

module.exports = {
    getAllNumbers: () => {
        return new Promise((accept, reject) => {
          db.query(
            "SELECT * FROM smartersNumber;",
            (error, results) => {
              if (error) {
                return reject("Request getAllNumbers error: ",error);
              }
              accept(results);
            }
          );
        });
      },
    getByPhone: (phoneNumber) => {
        return new Promise((accept, reject) => {
          db.query(
            "SELECT * FROM smartersNumber where number = ?;",[phoneNumber],
            (error, results) => {
              if (error) {
                return reject("Request getByPhone error");
              }
              accept(results);
            }
          );
        });
      },
    delete: (phoneNumber) => {
        return new Promise((accept, reject) => {
          db.query(
            "DELETE FROM smartersNumber where number = ?;",[phoneNumber],
            (error, results) => {
              if (error) {
                return reject("Request delete error");
              }
              accept(results);
            }
          );
        });
      },
    create: (customer) => {
      console.log(customer)
        return new Promise((accept, reject) => { 
          db.query(
            "INSERT INTO smartersNumber (number,client,description,accessToken,botId,botToken,botServerType) VALUES(?,?,?,?,?,?,?);",
            [customer.number,customer.client,customer.description,customer.accessToken,customer.botId,customer.botToken,customer.botServerType],
            (error, results) => {
              if (error) {
                return reject("Request create error");
              }
              accept(results);
            }
          );
        });
      },
    put: (phoneNumber, customer) => {
        return new Promise((accept, reject) => {
          db.query(
            "UPDATE smartersNumber SET client = ?, description = ?, accessToken = ?, botId = ?, botToken = ?, botServerType = ? WHERE number = ?;",
            [customer.client,customer.description,customer.accessToken,customer.botId,customer.botToken,customer.botServerType,phoneNumber],
            (error, results) => {
              if (error) {
                return reject("Request put error");
              }
              accept(results);
            }
          );
        });
      },
}