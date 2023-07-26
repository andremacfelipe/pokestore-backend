import mongoose from "mongoose";

const marketPurchaseSchema = mongoose.Schema({
    seller: { type: mongoose.Schema.Types.ObjectId, required: true },
    buyer: { type: mongoose.Schema.Types.ObjectId, required: true },
    item: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    date: { type: Date, default: Date.now }
})

const storePurchaseSchema = mongoose.Schema({
    customerId: { type: mongoose.Schema.Types.ObjectId, required: true },
    caseId: { type: mongoose.Schema.Types.ObjectId, required: true },
    price: { type: Number, required: true },
    sortedItem: { type: mongoose.Schema.Types.ObjectId },
    date: { type: Date, default: Date.now }
})




const userSchema = mongoose.Schema({
    username: { type: String, required: true, minlength: 5, maxlength: 500 },
    email: { type: String, required: true, minlength: 5, maxlength: 200 },
    password: { type: String, required: true, minlength: 8, },
    purchases: {
        market: [marketPurchaseSchema],
        store: [storePurchaseSchema]
    },
    credits: { type: Number, default: 100, min: 0 },
    adress: { type: Object, default: {} },
    roles: { type: Array, default: ["user"] },
    createdAt: { type: Date, default: Date.now }
})

export default mongoose.model("User", userSchema)

