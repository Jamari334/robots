const client = require('./client.js')
const { createRobot } = require('./robots.js')
const {createTask} = require('./tasks.js')
const {createCustomer} = require('./customers.js')

const dropTables = async () => {
    try {
        await client.query(`

        DROP TABLE IF EXISTS robots_tasks;
        DROP TABLE IF EXISTS robots_customers;
        DROP TABLE IF EXISTS robots;
        DROP TABLE IF EXISTS tasks;
        DROP TABLE IF EXISTS customers;
       
         `)

    } catch (error) {
        console.log(error)
    }
}

const createTables = async () => {
    try {
        await client.query(`
            CREATE TABLE robots(
             id SERIAL PRIMARY KEY,
             name varChar (40),
             model varChar (30),
             company varChar(40),
             imgURL varChar(200),
             warranty int,
             is_child_safe boolean,
             release_date date
             );  
            
            CREATE TABLE tasks(
                id SERIAL PRIMARY KEY,
                name varChar (30)
            ); 

            CREATE TABLE customers(
                id SERIAL PRIMARY KEY,
                name varChar(40), 
                email varChar(50)
            );

            CREATE TABLE robots_customers(
                robot_id int REFERENCES robots(id),
                customer_id int REFERENCES customers(id) 
            );

            CREATE TABLE robots_tasks(
                robot_id int REFERENCES robots(id),
                task_id int REFERENCES tasks(id)
            );


        `)
    } catch (error) {
        console.log(error)
    }
}

const syncAndSeed = async () => {
    try {
        await client.connect();
        console.log('hello world');

        await dropTables();
        console.log('TABLES DROPPEDS')

        await createTables();
        console.log('TABLES CREATED!')

        await createRobot('GiggleGear', 'GX2', 'Jamari INC', 'placeHolder', 20, false, '2020-12-25');

        await createRobot('Robotron', 'HY3', 'JAMARI INC', 'placeHolder', 25, true, '2024-12-30');

        await createRobot('ByteBot', 'GSE1', 'Jadene Industries', 'placeHolder', 19, true, '2023-07-18');

        await createRobot('SparkleSpark', 'MM2', 'Jackie CORP', 'placeHolder', 7, true, '1998-02-10');

        await createRobot('LaughterLaser', 'YHV4', 'Jadene Industries', 'placeHolder', 9, false, '2007-01-01');

        console.log("robots created")

        await createTask ('CUTTING GRASS');

        await createTask ('WASHING DISHES');
    
        await createTask ('FOLDING CLOTHES');

        await createTask('MOPPING FLOOR');
     
        await createTask ('CONSTRUCTION');
        console.log("tasks created");
        
        await createCustomer ('Jelani A.','jjj@yahoo.com');

        await createCustomer('Micheal.J','MJ@gmail.com');
        
        await createCustomer('Tony.O', 'to@gmail.com');
        console.log("customsters created")
        
        client.end();
    } catch (error) {
        console.log(error);
    }
}
syncAndSeed()