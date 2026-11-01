

file/module : db.js:

application restaurant
waiter => nodejs
kitchen => pgsql

connection pool

Our application
            |
Connection pool
   |   |    |
conn  conn  conn
   |    |    |
  postgresSQL DB

we dont want to create everytime new connection for every req

2 responsibilities
1: connect our nodejs application to postgreSQL
2: make sure our required db table exists

Nodejs start 
           |
Load env varaibles
           |
create pgsql connection pool
           |
create/check tasks table
            |
db ready
           |
server can handle requests

