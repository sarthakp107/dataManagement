const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'LibraryDB';

// Create a new MongoClient
const client = new MongoClient(url);

async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db(dbName);
        const loansCollection = db.collection('loans'); // Ensure you have the 'loans' collection created

        // Start time measurement
        const startTime = process.hrtime();

        // Create a new loan record
        const newLoan = {
            book_id: 1,
            member_id: 1,
            loan_date: new Date('2023-10-01'),
            due_date: new Date('2025-04-15'),
            return_date: null,
            extension_count: 0,
        };

        const result = await loansCollection.insertOne(newLoan);

        // End time measurement
        const endTime = process.hrtime(startTime);
        const executionTime = (endTime[0] * 1e9 + endTime[1]) / 1e9; // Convert to seconds

        console.log(`New loan record inserted successfully. MongoDB Write Query Execution Time: ${executionTime} seconds`);
    } catch (error) {
        console.error('Error inserting loan record:', error);
    } finally {
        // Close the connection
        await client.close();
    }
}

run();
