CREATE DATABASE blamazon;

USE blamazon;

CREATE TABLE products (
	item_id INTEGER auto_increment PRIMARY KEY,
    product_name VARCHAR(1000),
    department_name VARCHAR(1000),
    price DECIMAL,
    stock_quantity INTEGER
);

DESCRIBE products;