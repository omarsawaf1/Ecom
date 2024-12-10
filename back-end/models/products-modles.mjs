import pool from '../config/init-data-base.mjs';
async function getProduct(id){
    try{
        const result = await pool.query(
            'SELECT * FROM product WHERE product_id = ?',
            [id]
        )
        const data=result[0];
        if(data.length === 0){    
            return {success:false, message: "Product not found"};
        }
        return result[0];
    }catch(error){
        console.error(error);
        return {success:false, message: error.message};
    }
}
async function getProductImages(id) {
    try {
        const result = await pool.query(
            'SELECT * FROM product_image WHERE product_id = ?',
            [id]
        );
        return result[0];
    } catch (error) {
        console.error('Error retrieving product image:', error);
        return { success: false, message: error.message };
    }
}
async function insertProductCombined(sellerId, name, brand, price, categoryName, description, availableUnits, inStock = 1) {
    try {
        // Insert product with a subquery for category_id
        const [result] = await pool.query(
            `INSERT INTO product 
            (seller_id, name, brand, price, category_id, description, available_units, in_stock) 
            VALUES (?, ?, ?, ?, 
                (SELECT category_id FROM category WHERE name = ?), 
                ?, ?, ?)`,
            [sellerId, name, brand, price, categoryName, description, availableUnits, inStock]
        );

        return { success: true, message: 'Product inserted successfully', productId: result.insertId };
    } catch (error) {
        console.error('Error inserting product:', error);
        return { success: false, message: error.message };
    }
}
async function insertProductImage(productId, imageUrl) {
    try {
        // Step 1: Insert the image URL into the product_image table
        const [result] = await pool.query(
            `INSERT INTO product_image (product_id, image_url) 
            VALUES (?, ?)`,
            [productId, imageUrl]
        );

        return { success: true, message: 'Product image inserted successfully', imageId: result.insertId };
    } catch (error) {
        console.error('Error inserting product image:', error);
        return { success: false, message: error.message };
    }
}
async function searchProduct(name, category, page = 1, limit = 10) {
    try {
        // Calculate the offset for pagination
        const offset = (page - 1) * limit;

        // Start the query with the base condition
        let query = `SELECT * FROM product WHERE 1=1`;
        let queryParams = [];

        // Add filter for name if provided
        if (name) {
            query += ` AND name LIKE ?`;
            queryParams.push(`%${name}%`);
        }

        // Add filter for category if provided
        if (category) {
            query += ` AND category_id = ?`;
            queryParams.push(category);
        }

        // Add LIMIT if limit is provided
        if (limit) {
            query += ` LIMIT ?`;
            queryParams.push(Number(limit));
        }

        // Add OFFSET if offset is calculated (based on page and limit)
        if (offset !== undefined && offset >= 0) {
            query += ` OFFSET ?`;
            queryParams.push(offset);
        }

        // Execute the query
        const [rows] = await pool.query(query, queryParams);
        console.log(rows, rows.length);

        // Check if products were found
        if (rows.length === 0) {
            return { success: false, message: 'No products found' };
        }

        // Return the found products
        return { success: true, data: rows };

    } catch (error) {
        // Handle any errors that occur
        console.error('Error searching for products:', error);
        return { success: false, message: 'Server error' };
    }
}

export const product = {
    getProductImages,
    getProduct,
    insertProductCombined,
    insertProductImage,
    searchProduct
};