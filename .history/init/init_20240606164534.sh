#!/bin/bash

# MySQL credentials
user="root"
password="root"
host="localhost"
db_name="mydb"

# MySQL commands to create a table
mysql -u $user -p$password -h $host -e "CREATE DATABASE IF NOT EXISTS $db_name;"
mysql -u $user -p$password -h $host -e "USE $db_name; CREATE TABLE IF NOT EXISTS users(id INT PRIMARY KEY, email VARCHAR(255), username VARCHAR(255), type VARCHAR(255), password VARCHAR(255), refreshToken VARCHAR(255), createdAt TIMESTAMP, updatedAt TIMESTAMP);"

echo "MySQL tables created successfully!"