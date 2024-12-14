import {buyer} from '../models/buyers-models.mjs';
async function insertBuyerOrders(req, res) {
    try {
        const userID = req.params.id;
        const {productOrders} = req.body;
        const result = await buyer.insertOrder(userID,productOrders);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function getBuyerOrders(req,res) {
    try {
        const userID = req.params.id;
        const result = await buyer.getBuyerOrders(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function getBuyerCreditCard(req,res) {
    try {
        const userID = req.params.id;
        const result = await buyer.getCreditCards(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function insertBuyerCreditCard(req,res) {
    try {   
        const userID = req.params.id;    
        const {cardHolderName,cvv,expiryDate,cardNumber} = req.body;
        console.log(req.body);
        const result = await buyer.insertCreditCard(cardHolderName,cvv,expiryDate,userID,cardNumber);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function insertBuyerAdditionalDetails(req,res) {
    try {
        const userID = req.params.id;
        const { street1, street2, city, state, country, zipcode } = req.body;
        const result = await buyer.insertBuyerAdditionalDetails(userID, street1, street2, city, state, country, zipcode);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function getBuyerAdditionalDetails(req,res) {
    try {
        const userID = req.params.id;
        const result = await buyer.getBuyerAdditionalDetails(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function getBuyerInfo(req,res) {
    try{
        const userID = req.params.id;
        const result = await buyer.getBuyerInfo(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    }catch(error){    
        console.error(error);    
        return res.status(500).send(error.message);
    }
}

export const buyerController = {
    insertBuyerOrders
    ,getBuyerOrders
    ,getBuyerCreditCard
    ,insertBuyerCreditCard
    ,getBuyerAdditionalDetails
    ,insertBuyerAdditionalDetails
    ,getBuyerInfo
};

