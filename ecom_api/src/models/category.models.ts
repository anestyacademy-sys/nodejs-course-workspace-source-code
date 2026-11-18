import mongoose, { Schema, Document } from "mongoose";

// typescript interface
export interface ICategory extends Document {
    name: string,
    description: string,
    createdAt: Date,
    updatedAt: Date,
    productCount?: number,
    products?: any
}


const categorySchema = new Schema<ICategory>({

        // tech web
        // Tech Web
        name: {
            type: String,
            required: [ true, 'Category is required' ]
        },
        description: {
            type: String,
            required: [true, 'Description is required']
        }

    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)


categorySchema.pre('save', function(){
    // tech  pc
    if(this.isModified('name')){
        this.name = this.name
            .split(' ')
            .map( word=>word.charAt(0).toUpperCase()+ word.slice(1).toLocaleLowerCase() )
            .join(' ')
    }
})

categorySchema.post('save', function(doc){
    console.log(`Category saved : ${doc.name} ( ${doc._id} ) `);
})


categorySchema.pre('findOneAndDelete', async function(doc) {
  // 'this' is the query, not the document

  if (doc) {
    const productCount = await mongoose.models.Product?.countDocuments({
      categoryId: doc._id
    });
    
    if (productCount && productCount > 0) {
      throw new Error(
        `Cannot delete category "${doc.name}". ` +
        `It has ${productCount} product(s).`
      );
    }
  }
  

});



categorySchema.pre('findOneAndDelete', async function(){

    const doc = await this.model.findOne(this.getFilter()) 
    
    if(doc){

        const productCount = await mongoose.models.Product?.countDocuments({ categoryId: doc._id })
        if(productCount && productCount > 0){
            console.log('cannot delete category '+
                 ` it has ${productCount} products ` );
            
            throw new Error(
                'cannot delete category '+
                 ` it has ${productCount} products ` 
            
            )
        }
    }
    

})




categorySchema.virtual('productCount', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId',
    count: true
})

categorySchema.virtual('products',{
    ref: 'Product',
    localField: '_id',
    foreignField: 'categoryId',
    as: 'products'
})


export const Category = mongoose.model<ICategory>('Category', categorySchema);