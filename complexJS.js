const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const dbName = "LibraryDB"; 

// Function to measure query execution time
async function measureLoanedBooksQueryTime() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(dbName);

        // Start timing for the aggregation query
        const startAggregation = Date.now();

        // Aggregate to find titles of books that are currently loaned out
        const aggregationResult = await db.collection("Loan").aggregate([
            {
                $match: { return_date: null } // Match loans with a null return date
            },
            {
                $lookup: {
                    from: "Book",          // Join with Book collection
                    localField: "book_id",  // Match book_id in Loan with _id in Book
                    foreignField: "_id",
                    as: "book_info"
                }
            },
            {
                $unwind: "$book_info"      // Flatten the array returned by the lookup
            },
            {
                $project: {
                    "book_info.title": 1    // Only include the book title in the result
                }
            }
        ]).toArray();

        // End timing for the aggregation query
        const endAggregation = Date.now();
        const aggregationExecutionTime = (endAggregation - startAggregation) / 1000;

        // Output aggregation results
        console.log("MongoDB Aggregation Execution Time:", aggregationExecutionTime, "s");
        console.log("Books Currently Loaned Out:", aggregationResult);

    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        // Close the MongoDB client
        await client.close();
    }
}

// Run the function
measureLoanedBooksQueryTime().catch(console.error);
