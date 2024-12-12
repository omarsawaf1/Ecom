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
async function insertCreditCard(cardHolderName,cvv,expiryDate,userID,cardNumber) {
    try{
        const [result] = await pool.query(
            'INSERT INTO credit_card (cardholder_name,cvv,expiry_date,user_id,card_number) VALUES (?,?,?,?,?)',
            [cardHolderName,cvv,expiryDate,userID,cardNumber]
        )
        return { success: true, message: 'Credit card inserted successfully', cardID: result.insertId };
    }catch(error) {
        console.error('Error inserting credit card:', error);
        return { success: false, message: error.message };
    }
}
async function getCreditCards(userID) {
    try {
        // Query to select all credit card details for the given user
        const [result] = await pool.query(
            'SELECT * FROM credit_card WHERE user_id = ?',
            [userID]
        );

        // Check if there are any credit cards for the user
        if (result.length === 0) {
            return { success: false, message: 'No credit cards found for this user' };
        }

        // Mask the card number before sending it back
        result.forEach(card => {
            card.card_number = maskCardNumber(card.card_number);
        });

        // Return the found credit cards with masked numbers
        return { success: true, data: result };
    } catch (error) {
        console.error('Error retrieving credit cards:', error);
        return { success: false, message: 'Server error' };
    }
}

// Helper function to mask the credit card number
function maskCardNumber(cardNumber) {
    // Only show the last 4 digits and replace the rest with *
    return '************' + cardNumber.slice(-4);
}
async function insertBuyerAdditionalDetails(userId, street1, street2, city, state, country, zipcode, is_default = 0) {
    try {
        const [result] = await pool.query(
            `INSERT INTO user_detail (user_id, street1, street2, city, state, country, zipcode, is_default)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [userId, street1, street2, city, state, country, zipcode, is_default]
        );

        return { success: true, message: 'User details inserted successfully', userDetails: result.insertId };
    } catch (error) {
        console.error('Error inserting user details:', error);
        return { success: false, message: 'Server error' };
    }
}
async function getBuyerAdditionalDetails(userId) {
    try {
        // Query to fetch the additional details for the buyer from the user_details table
        const [rows] = await pool.query(
            'SELECT * FROM user_detail WHERE user_id = ?',
            [userId]
        );

        // Check if any data is found for the given userId
        if (rows.length === 0) {
            return { success: false, message: 'No additional details found for this user' };
        }

        // Return the additional details data
        return { success: true, data: rows }; // Assuming only one row per user
    } catch (error) {
        console.error('Error fetching buyer additional details:', error);
        return { success: false, message: 'Server error' };
    }
}
async function getBuyerInfo(userId){
    try{
        const [fristRows] = await pool.query(
            'SELECT email, fname, lname, user_type, created_at, updated_at FROM user_parent WHERE id = ?',
            [userId]
        );
        const [secondRows] = await pool.query(
            'SELECT is_prime, prime_expiry_date FROM buyer WHERE user_id = ?',
            [userId]
        )
        return { success: true, data:{...fristRows[0],...secondRows[0]} };
    }catch(error){
        console.error('Error fetching buyer additional details:', error);
        return { success: false, message: 'Server error' };
    }
}
export const buyer = {
    insertProductsOrder,
    getProductsOrder,
    insertOrder,
    getBuyerOrders
    ,insertCreditCard
    ,getCreditCards
    ,insertBuyerAdditionalDetails
    ,getBuyerAdditionalDetails
    ,getBuyerInfo
};