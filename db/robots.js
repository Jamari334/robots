const client = require('./client.js')

const createRobot = async (name, model, company, imgURL, warranty, isChildSafe, releaseDate) => {
    try {
        await client.query(`
    INSERT INTO robots (name, model, company, imgURL, warranty, is_child_safe, release_date)
    VALUES ('${name}', '${model}', '${company}','${imgURL}',${warranty},${isChildSafe}, '${releaseDate}')
     `);

    } catch (error) {
        console.log(error);
    }

}
const getRobots = async()=>{
try{
    await client.query(``)

}catch(error){
    console.log(error)
}

}
module.exports = {
    createRobot
}