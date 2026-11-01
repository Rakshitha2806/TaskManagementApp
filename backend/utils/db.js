// 2 responsibilities
// 1: connect our nodejs application to postgreSQL
//2: make sure our required db table exists

//creating the db connection/pool
//sending queries to postgresSql 
// making sure the required table exists


import pg from "pg";
import "dotenv/config";

//create connection pool
//A && B => if A exist/is true then give me B
const pool = new pg.Pool({
    //configuration
    ...(process.env.DATABASE_URL && {
        connectionString: process.env.DATABASE_URL
    }),
    ssl: process.env.PGSSL ==="true" ? {rejectUnauthorized:false}: false
});

export const query =(text,params) => pool.query(text,params)

//create the table

const SCHEMA = `
CREATE TABLE IF NOT EXISTS tasks(
id                  INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
title               TEXT NOT NULL,
description         TEXT,
due_date            TIMESTAMPTZ,
created_at          TIMESTAMPTZ NOT NULL DEFAULT NOW(),
updated_at          TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
`;



//CREATE DB function

const db = async () =>{
    await query(SCHEMA);
    console.log("PostgreSQL conected successfull....");
};

export default db;

