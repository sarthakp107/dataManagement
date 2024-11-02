const { MongoClient } = require("mongodb");
const uri = "mongodb://localhost:27017"; 

(async () => {
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const collection = db.collection("Book");

        // Initial read
        let initialCount = await collection.countDocuments({ author_id: 1 });
        console.log("Initial read, number of books by author_id = 1:", initialCount);

        // Simulate a delay to allow potential concurrent operations
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Read again to check if data has changed
        let countAfter = await collection.countDocuments({ author_id: 1 });
        console.log("Second read after delay, number of books by author_id = 1:", countAfter);

        if (initialCount === countAfter) {
            console.log("No non-repeatable reads detected.");
        } else {
            console.log("Non-repeatable read detected.");
        }
    } catch (error) {
        console.error("Error during the test:", error);
    } finally {
        await client.close();
    }
})();
