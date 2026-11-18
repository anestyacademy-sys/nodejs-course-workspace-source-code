import mongoose, { Schema, Document, Types } from "mongoose";


export interface IProduct extends Document {
    name: string,
    slug: string,
    price: number,
    discount?: number,
    categoryId: Types.ObjectId,
    createdAt: Date,
    updatedAt: Date,
    finalPrice?: number,
    image?: string | null
}


const productSchema = new Schema<IProduct>({

        name: {
            type: String,
            required: [ true, 'product name is required' ]
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true
        },
        price: {
            type: Number,
            required: [ true, 'product price is required' ]

        },
        discount: {
            type: Number
        },
        categoryId: { 
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [ true, 'categoryid is required' ]
        },
        image: {
            type: String,
            default: null
        }

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

// pre-save
productSchema.pre('save', async function(){

    if(!this.isModified('name')){
        return;
    }

    // create slug
    this.slug = this.name
        .toLowerCase()
        .replace(/[^\w\s-]/g,'')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()

    const slugExist = await mongoose.models.Product?.findOne({
        slug: this.slug,
        _id: { $ne : this._id }
    })

    if(slugExist){
        this.slug = `${this.slug}-${Date.now()}`
    }

})


productSchema.pre('save', async function(){

    if(!this.isModified('categoryId')){
        return;
    }

    const category = await mongoose.models.Category?.findById(this.categoryId);
    if(!category){
        throw new Error('Category not found');
    }

})


productSchema.virtual('finalPrice').get( function(){

    if(this.discount && this.discount > 0){
        return (this.price - ( this.price * this.discount / 100 ))
    }
    return this.price

} )


export const Product = mongoose.model<IProduct>('Product', productSchema);