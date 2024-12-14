import {seller} from '../models/sellers-models.mjs';
async function getSellerinfo(req, res) {
    try {
        const userID = req.params.id;
        const result = await seller.getSellerInfo(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});    
    } catch (error) {
        console.error(error);
        return res.status(500).send({success: false, message: error.message});
    }
}
async function getSellerProducts(req, res) {
    try{
        const userID = req.params.id;
        const result = await seller.getSellerProducts(userID);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        return res.status(200).send({success: true, result});
    }catch(error){
        console.error(error);
        return res.status(500).send(error.message);
    }
}
async function insertSellerProduct(req, res) {
    try {
        const userID = req.params.id;
        const {  name, brand, price, category_id, description, available_units, in_stock } = req.body;
        const result = await seller.insertSellerProduct(userID, name, brand, price, category_id, description, available_units, in_stock);
        if (!result.success) {
            return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
        }
        console.log(result);
        return res.status(201).send({success: true, result});
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}
export const sellerController = {
    getSellerinfo
    ,getSellerProducts
    ,insertSellerProduct
};