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

        // Data to be inserted
        const newBook = {
            branch_id: "6722f6a17ae554cd929fcd9c", 
            author_id: "6722f63df04a8c639a661058", 
            title: "Computer Systems"
        };

        // Start timing for insert operation
        const startInsert = Date.now();

        // Insert the new book into the collection
        const insertResult = await collection.insertOne(newBook);

        // End timing for insert operation
        const endInsert = Date.now();
        const insertExecutionTime = (endInsert - startInsert) / 1000;

        // Output insert results
        console.log("Inserted Document ID:", insertResult.insertedId);
        console.log("MongoDB Insert Execution Time:", insertExecutionTime, "s");

        // Start timing for query operation
        const startQuery = Date.now();

        // Execute a sample query (modify query as needed)
        const queryResult = await collection.find({ author_id: "author_id_1" }).toArray();

        // End timing for query operation
        const endQuery = Date.now();
        const queryExecutionTime = (endQuery - startQuery) / 1000;

        // Output query results
        console.log("MongoDB Query Execution Time:", queryExecutionTime, "s");
        console.log("Query Result:", queryResult);

    } finally {
        // Close the MongoDB client
        await client.close();
    }
}

// Run the function
measureQueryTime().catch(console.error);
