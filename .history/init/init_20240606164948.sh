#!/bin/bash

# MySQL credentials
user="root"
password="root"
host="localhost"
db_name="mydb"

# MySQL command to create a table
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS users"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS addresses"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS Deliveries"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS devApps"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS menu_items"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS order_items"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS orders"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS restaurant_categories"
mysql -u $user -p$password -h $host -D $db_name -e "CREATE TABLE IF NOT EXISTS restaurants"


echo "MySQL table created successfully!"