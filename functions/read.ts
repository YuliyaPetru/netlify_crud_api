import { Handler } from '@netlify/functions';
import { Client, fql } from 'fauna';
require('dotenv').config();

const client = new Client({
    secret: process.env.FAUNA_SECRET,
});

const handler: Handler = async (event) => {
    try {
        const getId = event.queryStringParameters?.id;
        
        if (getId) {
            const response = await client.query(fql`Inventory.byId(${getId})`);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        } else {
            const response = await client.query(fql`Inventory.all()`);
            return {
                statusCode: 200,
                body: JSON.stringify(response),
            };
        }
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred' }),
        };
    }
};

export { handler };
