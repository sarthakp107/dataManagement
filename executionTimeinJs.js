const { MongoClient } = require('mongodb');

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

        // Start timing
        const start = Date.now();

        // Execute a sample query
        const result = await collection.find({ author_id: 1 }).toArray(); // Modify query as needed

        // End timing
        const end = Date.now();

        const executionTime = (end - start) / 1000;

        // Output results
        console.log("MongoDB Query Execution Time:", executionTime, "s");

        

    } finally {
        // Close the MongoDB client
        await client.close();
    }
}

// Run the function
measureQueryTime().catch(console.error);
