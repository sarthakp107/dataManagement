const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = "mongodb://localhost:27017";
const dbName = "LibraryDB"; 

// Function to measure query execution time
async function measureQueryTime() {
    const client = new MongoClient(uri);

    try {
        // Connect to MongoDB
        await client.connect();
        const db = client.db(dbName);
        
        // Start timing for the aggregation query
        const startAggregation = Date.now();

        // Aggregate to get loans with member and book details for loans issued in 2023
        const aggregationResult = await db.collection("Loan").aggregate([
            {
                $match: { loan_date: { $gte: new Date("2023-01-01"), $lt: new Date("2024-01-01") } }
            },
            {
                $lookup: {
                    from: "Book",
                    localField: "book_id",
                    foreignField: "_id",
                    as: "book_info"
                }
            },
            {
                $lookup: {
                    from: "Member",
                    localField: "member_id",
                    foreignField: "_id",
                    as: "member_info"
                }
            },
            {
                $unwind: "$book_info"
            },
            {
                $unwind: "$member_info"
            },
            {
                $project: {
                    loan_id: 1,
                    "member_info.first_name": 1,
                    "member_info.last_name": 1,
                    "book_info.title": 1,
                    loan_date: 1
                }
            }
        ]).toArray();

        // End timing for the aggregation query
        const endAggregation = Date.now();
        const aggregationExecutionTime = (endAggregation - startAggregation) / 1000;

        // Output aggregation results
        console.log("MongoDB Aggregation Execution Time:", aggregationExecutionTime, "s");
        console.log("Aggregation Result:", aggregationResult);

    } catch (error) {
        console.error("Error executing query:", error);
    } finally {
        // Close the MongoDB client
        await client.close();
    }
}

// Run the function
measureQueryTime().catch(console.error);
