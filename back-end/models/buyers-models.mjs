import pool from '../config/init-data-base.mjs';
import { data } from '../shared-resources/data.mjs';
import { product } from './products-modles.mjs';
async function insertProductsOrder(orderID, productId, quantity) {
    try {
        const [result] = await pool.query(
            'INSERT INTO order_product (order_id, product_id, quantity) VALUES (?, ?, ?)',
            [orderID, productId, quantity]
        );
        return { success: true, message: 'Product order inserted successfully' };
    } catch (error) {
        console.error('Error inserting product order:', error);
        return { success: false, message: error.message };
    }
};
async function getProductsOrder(orderID) {
    try {
        const result = await pool.query(
            'SELECT * FROM order_product WHERE order_id = ?',
            [orderID]
        );
        return result[0];
    } catch (error) {
        console.error('Error retrieving product order:', error);
        return { success: false, message: error.message };
    }
}
async function insertOrder(userID,productOrders) {
    try {
        const {totalPrice} = await product.getProductsTotalPrice(productOrders);
        const [result] = await pool.query(
            'INSERT INTO orders (user_id,total_price) VALUES (?,?)',
            [userID,totalPrice]
        );
        const orderID = result.insertId;
        for (const order of productOrders) {
            await insertProductsOrder(orderID, order.product_id, order.quantity);
        }
        return { success: true, message: 'Order inserted successfully', orderID: orderID };
    } catch (error) {
        console.error('Error inserting order:', error);
        return { success: false, message: error.message };
    }
}
async function getBuyerOrders(userID) {
    try {
        // Retrieve all orders for the user
        const [orders] = await pool.query(
            'SELECT * FROM orders WHERE user_id = ?',
            [userID]
        );

        // If no orders found, return an empty list
        if (orders.length === 0) {
            return { success: true, message: 'No orders found', orders: [] };
        }

        // Iterate through each order to fetch its products
        const detailedOrders = [];
        for (const order of orders) {
            const products = await getProductsOrder(order.order_id); // Retrieve products for the order
            detailedOrders.push({ ...order, products });
        }

        return { success: true, message: 'Buyer orders retrieved successfully', orders: detailedOrders };
    } catch (error) {
        console.error('Error retrieving buyer orders:', error);
        return { success: false, message: error.message };
    }
}
export const buyer = {
    insertProductsOrder,
    getProductsOrder,
    insertOrder,
    getBuyerOrders
};