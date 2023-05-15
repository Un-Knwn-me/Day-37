// Creating database
use shop

// creating collections
db.createCollection("products")

// insert datas into the collections
db.products.insertMany([data])

// Quest 1

db.products.find({}).pretty()  //This shows 20 sets from the array

db.products.find({}).toArray()  // This shows all details of each products

// Quest 2

db.products.find({product_price: {$gt: 400, $lt: 800}})

// Quest 3

db.products.find({product_price: {$not: {$gt: 400, $lt: 600}}}).toArray()

// Quest 4

db.products.find({product_price: {$gt: 500}},{product_price: 4}) // This shows the 4 products greater than 500 price

db.products.find({product_price: {$gt: 500}})  //This shows all products greater than 500 price

// Quest 5

db.products.find({},{product_name: 1, product_material: 1}).toArray() //To get the name and material in object structure

db.products.find().forEach(function(details){print("Name: "+ details.product_name, "; and its material is: " +details.product_material)}) //To get the name and details as strings

// Quest 6

db.products.findOne({"id": "10"})

// Quest 7

db.products.find().forEach(function(details){print("Name: "+ details.product_name, "; and its material: " +details.product_material)}) //To get the name and details as strings

// Quest 8

db.products.aggregate([
    {$match: {
        "product_material": "Soft"
    }}
])

// Quest 9

db.products.aggregate(
        {$match: {$or:[
            {"product_color":"indigo",
            "product_price": "492.00"}]
        }
    })

// Quest 10

// By using this method we can find the dupicate fields
db.products.aggregate([{ 
    $group: { _id: "$product_price", duplicates: {$push: "$_id"}, count: {$sum: 1}}}, 
    {$match: {count: {$gt:1}}}])
    .forEach(function(dup){
        doc.duplicates.shift(); // It will remove the first index value 
        db.products.deleteMany({_id: {$in: dup.duplicates}});});