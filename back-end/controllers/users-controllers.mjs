import {  insertSeller, insertBuyer ,userTypeMapping } from '../models/users-models.mjs';
export async function signupController(req, res) {
    try {
        const { email, fname, lname, password, userType, additionalDetails } = req.body;

        // Validate request data
        if (!email || !fname || !password || userType === undefined) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        let result;
        switch (userType) {
            case userTypeMapping.buyer: // Buyer
                result = await insertBuyer(email, fname, lname, password, additionalDetails?.isPrime, additionalDetails?.primeExpiryDate);
                break;

            case userTypeMapping.seller : // Seller
                result = await insertSeller(
                    email,
                    fname,
                    lname,
                    password,
                    additionalDetails?.description,
                    additionalDetails?.averageRating,
                    additionalDetails?.ratingCount
                );
                break;
            default:
                return res.status(400).json({ success: false, message: 'Invalid user type' });
        }

        // Handle the result
        if (result.success) {
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                userId: result.userId,
            });
        } else {
            return res.status(500).json({ success: false, message: result.message });
        }
    } catch (error) {
        console.error('Error in signupController:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
