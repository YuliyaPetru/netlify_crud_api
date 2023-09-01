import { Handler } from '@netlify/functions';
import { Client, fql } from 'fauna';
require('dotenv').config();

const client = new Client({
    secret: process.env.FAUNA_SECRET,
});

const handler: Handler = async (event) => {
    try {
        const id = event.queryStringParameters?.id;
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid request parameters' }),
            };
        }

        const response = await client.query(fql`
        let toDelete = Inventory.byId(${id});
        toDelete!.delete()`
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item deleted successfully', response }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'An error occurred' }),
        };
    }
};

export { handler };
