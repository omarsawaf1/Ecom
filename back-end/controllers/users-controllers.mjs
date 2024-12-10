import { user } from '../models/users-models.mjs';
export async function signupController(req, res) {
    try {
        const { email, fname, lname, password, userType, phone } = req.body;
        // Validate request data
        if (!email || !fname || !password || userType === undefined || !phone) {
            return res.status(400).json({ success: false, message: 'Missing required fields' });
        }

        let result;
        switch (userType) {
            case user.userTypeMapping.buyer: // Buyer
                result = await user.insertBuyer(email, fname, lname, password,phone,userType);
                break;

            case user.userTypeMapping.seller : // Seller
                result = await user.insertSeller(email, fname, lname, password,phone,userType);
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

