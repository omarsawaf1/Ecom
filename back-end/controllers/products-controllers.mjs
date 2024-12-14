import { product } from "../models/products-modles.mjs";

export const getProductController = async (req, res) => {
    try{
        if (req.params.id) {
            const { id } = req.params;
            const result = await product.getProduct(id);
            return res.status(200).send({success: true, result});
        }else{
            return res.status(400).send("id is required");
        }
    }catch(error){
        console.error(error);
        return res.status(500).send(error.message);
    }
};     
export const getProductImagesController   = async (req, res) => {
    try{
        if (req.params.id) {
            const { id } = req.params;
            const result = await product.getProductImages(id);
            if(result.length==0){
                return res.status(404).send({ success: false, message: 'Additional details not found or could not be inserted' });
            }
            return res.status(200).send({success: true, result});
        }else{
            return res.status(400).send("id is required");
        }
    }catch(error){
        console.error(error);
        return res.status(500).send(error.message);
    }
};
export const searchProductController = async (req, res) => {
    try{    
            let limit=req.query.limit;
            const { name, category, page} = req.query;
            if(limit){
                limit=Number(limit);
            }
            const result = await product.searchProduct(name, category, page, limit );
            return res.status(200).send({success: true, result:result.data});
    }catch(error){
        console.error(error);
        return res.status(500).send(error.message);
    }
};