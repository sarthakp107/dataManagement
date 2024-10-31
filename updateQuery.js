const { MongoClient, ObjectId } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const dbName = "LibraryDB"; 
const collectionName = "Book"; 

// Function to measure query execution time
async function measureQueryTime() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        // Start timing for find operation
        const findStart = Date.now();

        const findResult = await collection.find({ author_id: 3 }).toArray(); 

        // End timing for find operation
        const findEnd = Date.now();
        const findExecutionTime = (findEnd - findStart) / 1000;

        // Output results for find operation
        console.log("MongoDB Find Query Execution Time:", findExecutionTime, "s");
        console.log("Find Result:", findResult);

        // Sample update data
        const bookId = "6722fd66f04a8c639a66105f"; // Replace with an actual book ID
        const newTitle = "The Great Gatsby - Revised Edition"; // New title to set

        // Start timing for update operation
        const updateStart = Date.now();

        // Execute update query
        const updateResult = await collection.updateOne(
            { _id: ObjectId(bookId) }, // Filter for the book to update
            { $set: { title: newTitle } } // Update operation
        );

        // End timing for update operation
        const updateEnd = Date.now();
        const updateExecutionTime = (updateEnd - updateStart) / 1000;

        // Output results for update operation
        console.log("MongoDB Update Query Execution Time:", updateExecutionTime, "s");
        console.log("Update Result:", updateResult.modifiedCount, "document(s) updated");

    } finally {
        // Close the MongoDB client
        await client.close();
    }
}

// Run the function
measureQueryTime().catch(console.error);
