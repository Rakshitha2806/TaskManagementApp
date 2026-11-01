//all sql queries related to tasks
// where should i write sql for tasks????????
//get all tasks => SELECT
// insert task  => INSERT
// update task  => UPDATE 
//del task      => DEL 

//perform db operations related to tasks
//controller => taskModel => db
// Frontend => API Request => Controller => Task model /query =>PgSQL => Resuly => controller => frontend

import { query } from "../utils/db.js";

const COLUMNS  = "id, title, description, due_date";

////get all tasks => SELECT
// sort based on when created and DESC means new task should come first
const findAll = async()=>{
    const {rows} = await query(
    `SELECT ${COLUMNS} FROM tasks ORDER BY created_at DESC`
    );
    return rows;
}

/// create/insert task  => INSERT
const create =async({title, description,due_date})=>{
    const {rows} = await query(
        ` INSERT INTO tasks(title, description, due_date )
        VALUES($1,$2,$3)
        RETURNING ${COLUMNS} `,
        [title,description,due_date]
    );
    return rows[0]; // newly created tasks
}

//// update task  => UPDATE 
const update =async(id, {title, description,due_date})=>{
    const {rows} = await query(
        ` UPDATE tasks
            SET title= $2, description=$3, due_date=$4,
            updated_at =NOW()
          WHERE id = $1                   
        RETURNING ${COLUMNS} `,
        [id,title,description,due_date]
    );
    return rows[0]; // newly updated tasks
}

////del task      => DEL 
const remove =async(id)=>{
    const {rows} = await query(
        ` DELETE FROM tasks WHERE id = $1 RETURNING id`,
        [id]
    );
    return rows[0]; // newly updated tasks
}

export default {findAll, create, update,remove};

