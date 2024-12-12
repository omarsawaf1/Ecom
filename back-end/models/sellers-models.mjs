import pool from '../config/init-data-base.mjs';
import { data } from '../shared-resources/data.mjs';
async function getSellerInfo(userId) {
    try {
        const [fristRows] = await pool.query(
            'SELECT email, fname, lname, user_type, created_at, updated_at FROM user_parent WHERE id = ?',
            [userId]
        );
        const [secondRows] = await pool.query(
            'SELECT  description, average_rating, rating_count, url, created_at, updated_at FROM seller WHERE user_id = ?',
            [userId]
        )
        return { success: true, data: { ...fristRows[0], ...secondRows[0] } };
    } catch (error) {
        console.error('Error fetching seller additional details:', error);
        return { success: false, message: 'Server error' };
    }
}
async function getSellerProducts(userId){
    try{
        const [rows] = await pool.query(
            'SELECT p.product_id, p.name, p.brand, p.price, p.category_id, p.description, p.available_units, p.in_stock, p.average_rating, p.rating_count, \
            IFNULL(SUM(op.quantity), 0) AS units_sold, IFNULL(SUM(op.quantity * p.price), 0) AS total_revenue \
            FROM product AS p \
            LEFT JOIN order_product AS op ON p.product_id = op.product_id \
            WHERE p.seller_id = ? \
            GROUP BY p.product_id',
            [userId]
        );
        if(rows.length === 0){
            return { success: false, message: 'No products found for this seller' };
        }
        return { success: true, data: rows };
    }catch(error){
        console.error('Error fetching seller products:', error);
        return { success: false, message: 'Server error' };
    }
}
async function insertSellerProduct(seller_id, name, brand, price, category_id, description, available_units, in_stock = 1) {
    try {
        const [result] = await pool.query(
            'INSERT INTO product (seller_id, name, brand, price, category_id, description, available_units, in_stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [seller_id, name, brand, price, category_id, description, available_units, in_stock]
        );

        return { success: true, message: 'Product inserted successfully', productId: result.insertId };
    } catch (error) {
        console.error('Error inserting product:', error);
        return { success: false, message: error.message };
    }
}
export const seller = { 
    getSellerInfo,
    getSellerProducts
    ,insertSellerProduct
};