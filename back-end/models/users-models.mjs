import pool from '../config/init-data-base.mjs';

/**
 * Inserts a parent user into the user_parent table.
 */
const userTypeMapping = {
    buyer: 0,
    seller: 1,
    admin: 2
};
async function insertPhone(userId,phone) {
    try{
        const result = await pool.query(
            'INSERT INTO phone (user_id, phone) VALUES (?, ?)',
            [userId, phone]
        )
    }catch{
        console.error(error);
        return {success:false, message: error.message};
    }
}
async function insertParentUser(email, fname, lname, password,phone,userType) {
    try {
        const result = await pool.query(
            'INSERT INTO user_parent (email, fname, lname, password, user_type) VALUES (?, ?, ?, ?, ?)',
            [email, fname, lname, password, userType]
        );

        if (!result[0].insertId) throw new Error("Failed to retrieve the inserted user ID");

        const phoneresult = await insertPhone(result[0].insertId,phone);

        return { success: true, message: 'Parent user inserted successfully', userId: result[0].insertId };

    } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
    }
}

/**
 * Inserts an admin user into the admin table.
 */
async function insertAdmin(email, fname, lname, password, role = 'superadmin') {
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
async function insertSeller(email, fname, lname, password,phone, description = '', averageRating = 2.5, ratingCount = 0) {
    try {
        // Step 1: Insert into user_parent
        const parentUser = await insertParentUser(email, fname, lname, password,phone, 1); // 1 for seller
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
async function insertBuyer(email, fname, lname, password,phone, isPrime = 0, primeExpiryDate = null) {
    try {
        // Step 1: Insert into user_parent
        const parentUser = await insertParentUser(email, fname, lname, password,phone, 0); // 0 for buyer
        if (!parentUser.success) return parentUser; // Return error if insertion failed

        const userId = parentUser.userId;
        console.log(`userId: ${userId}`, parentUser);

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
async function checkPassword(email,password,userType){
    try{
        const result = await pool.query(
            'SELECT id FROM user_parent WHERE email = ? AND password = ? AND user_type  = ?',
            [email, password,userType]
        );
        const data=result[0];
        if(data.length === 0){
            return {success:false, message: "Password is incorrect or Email is incorrect"};
        }
        return {success:true,message: "Password is correct", userId:data[0].id};
    }catch(error){
        console.error(error);
        return {success:false, message: error.message};
    }
}

// Export all under a single `user` object
export const user = {
    insertParentUser,
    insertAdmin,
    insertSeller,
    insertBuyer,
    checkPassword,
    userTypeMapping
};
