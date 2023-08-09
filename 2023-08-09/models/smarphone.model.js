import mongodb, { ObjectId } from "mongodb";
import { dbCollection, Collections } from "../database/index.js";

class Smartphone {
    _id = new ObjectId();
    brand;
    model;
    storage;
    color;
    price;
    constructor(brand, model, storage, color, price) {
        this.brand = brand;
        this.model = model;
        this.storage = storage;
        this.color = color;
        this.price = price;
    }
    async create() {
        const data = {
            _id: this._id,
            brand: this.brand,
            model: this.model,
            storage: this.storage,
            color: this.color,
            price: this.price,
        };
        await dbCollection[Collections["SMARTPHONE"]].insertOne(data);
        return data;
    }
}

export default Smartphone;
