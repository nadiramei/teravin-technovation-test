import mysql from 'serverless-mysql';

const db = mysql({
    config: {
        host: 'localhost',
        user: 'root',
        password: 'password',
        port: '3306',
        database: 'users'
    }
});

export default async function executeQuery({query, values}){
    try {
        const results = await db.query(query, values);
        await db.end();
        return results;
    } catch (error){
        return {error};
    }
}