import { Handler } from '@netlify/functions';
import { Client, fql } from 'fauna';
require('dotenv').config();

const client = new Client({
    secret: process.env.FAUNA_SECRET,
});

interface InventoryData {
    item: string;
    quantity: number;
    price: number;
  }  

const handler: Handler = async (event) => {
    try {
        const id = event.queryStringParameters?.id;
        if (!id) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid request parameters' }),
            };
        }

        const requestPostData = event.body ? JSON.parse(event.body) as InventoryData : null;
        if (!requestPostData) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'Invalid request body' }),
            };
        }

        const item = requestPostData.item;
        const quantity = requestPostData.quantity;
        const price = requestPostData.price;

        const response = await client.query(fql`
            let itemToUpdate = Inventory.byId(${id});
            itemToUpdate!.update({
                item: ${item},
                quantity: ${quantity},
                price: ${price}
            })`
        );

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Item updated successfully', response }),
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
