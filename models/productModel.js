const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
    {
        entry: {
            type: String,
            // required: [true, "Please list your quests"]
        },
        complete: {
            type: Boolean
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);

module.exports = Product;