import pool from '../config/init-data-base.mjs'
/**
 * Inserts a parent user into the user_parent table.
 */
export async function insertParentUser(email, fname, lname, password, userType) {
    try {
        const result = await pool.query(
            'INSERT INTO user_parent (email, fname, lname, password, user_type) VALUES (?, ?, ?, ?, ?)',
            [email, fname, lname, password, userType]
        );
        console.log(result);
        return { success: true, message: 'Parent user inserted successfully', userId: result[0].insertId };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

/**
 * Inserts an admin user into the admin table.
 */
export async function insertAdmin(email, fname, lname, password, role = 'superadmin') {
    try {
        // Step 1: Insert into user_parent
        const parentUser = await insertParentUser(email, fname, lname, password, 2); // 2 for admin
        if (!parentUser.success) return parentUser; // Return error if insertion failed

        const userId = parentUser.userId;

        // Step 2: Insert into admin table
        await pool.query(
            'INSERT INTO admin (user_id, role) VALUES (?, ?)',
            [userId, role]
        );

        return { success: true, message: 'Admin inserted successfully', userId };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

/**
 * Inserts a seller into the seller table.
 */
export async function insertSeller(email, fname, lname, password, description = '', averageRating = 2.5, ratingCount = 0) {
    try {
        // Step 1: Insert into user_parent
        const parentUser = await insertParentUser(email, fname, lname, password, 1); // 1 for seller
        if (!parentUser.success) return parentUser; // Return error if insertion failed

        const userId = parentUser.userId;

        // Step 2: Insert into seller table
        await pool.query(
            'INSERT INTO seller (user_id, description, average_rating, rating_count) VALUES (?, ?, ?, ?)',
            [userId, description, averageRating, ratingCount]
        );

        return { success: true, message: 'Seller inserted successfully', userId };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

/**
 * Inserts a buyer into the buyer table.
 */
export async function insertBuyer(email, fname, lname, password, isPrime = 0, primeExpiryDate = null) {
    try {
        // Step 1: Insert into user_parent
        const parentUser = await insertParentUser(email, fname, lname, password, 0); // 0 for buyer
        if (!parentUser.success) return parentUser; // Return error if insertion failed

        const userId = parentUser.userId;
        console.log(`userId: ${userId}`,parentUser);
        // Step 2: Insert into buyer table
        await pool.query(
            'INSERT INTO buyer (user_id, is_prime, prime_expiry_date) VALUES (?, ?, ?)',
            [userId, isPrime, primeExpiryDate]
        );

        return { success: true, message: 'Buyer inserted successfully', userId };
    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}
export const userTypeMapping = {
    buyer: 0,
    seller: 1,
    admin: 2
};
