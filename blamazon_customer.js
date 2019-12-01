const mysql = require("mysql");
const inquirer = require("inquirer")

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "AwakE*2014",
    database: "blamazon"
});

connection.connect((err) => {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    displayShop(shopKeep);
    
});

displayShop = (callback) => {
    connection.query("SELECT * FROM products", (error, response) => {
        if (error) {
            throw error;
        }
        console.table(response);

        callback();
    });
}

shopKeep = () => {
        inquirer
            .prompt([{
                    name: "selection",
                    type: "input",
                    message: "Type the item_id of the item you would like to buy.",
                },
                {
                    name: "quantity",
                    type: "number",
                    message: "How many would you like?"
                }
            ])
            .then(answer => {
                connection.query("SELECT * FROM products WHERE item_id= " + answer.selection, (error, response) => {
                    if (error) {
                        throw error;
                    }

                    for (i = 0; i < response.length; i++) {

                        if (response[i].stock_quantity < answer.quantity){
                            console.log("sorry, we don't have enough of this product to fulfil your request.");
                            console.log("please try again later.")
                            displayShop(shopKeep);
                        }
                        else {
                            console.log('thank you for you purchase.')
                            connection.query("UPDATE products SET stock_quantity= " + (response[i].stock_quantity - answer.quantity) +  " WHERE item_id= " + answer.selection, error => {
                                if (error){
                                    throw error
                                }
                                displayShop(shopKeep);
                            });
                        }
                    }

                });

            });
}