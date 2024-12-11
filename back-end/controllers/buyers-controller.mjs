import {buyer} from '../models/buyers-models.mjs';
async function insertBuyerOrders(req, res) {
    try {
        const userID = req.params.id;
        const {productOrders} = req.body;
        const result = await buyer.insertOrder(userID,productOrders);
        if (!result.success) return res.status(500).send(result.message);
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
        if (!result.success) return res.status(500).send(result.message);
        return res.status(200).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}

export const buyerController = {
    insertBuyerOrders
    ,getBuyerOrders
};
