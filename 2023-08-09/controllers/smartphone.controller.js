import { resClientData } from "../utils/utils.js";
import Smartphone from "../models/smarphone.model.js";

const smartphoneController = {
    create: async (req, res) => {
        try {
            const data = req.body;
            const newSmartphone = new Smartphone(
                data.brand,
                data.model,
                data.storage,
                data.color,
                data.price
            );
            await newSmartphone.create();
            resClientData(res, 200, data, "Success");
        } catch (error) {
            resClientData(res, 500, null, error.message);
        }
    },
};

export default smartphoneController;
