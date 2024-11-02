const { MongoClient } = require('mongodb');

async function checkoutBook(bookId, memberId) {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("LibraryDB");
        const bookCollection = db.collection("Book");
        const loanCollection = db.collection("Loan");

        // Start a transaction
        const session = client.startSession();
        session.startTransaction();

        try {
            const book = await bookCollection.findOne({ _id: bookId }, { session });
            if (book.available_copies > 0) {
                // Update the book's available copies
                await bookCollection.updateOne(
                    { _id: bookId },
                    { $inc: { available_copies: -1 } },
                    { session }
                );

                // Insert a new loan record
                await loanCollection.insertOne(
                    {
                        book_id: bookId,
                        member_id: memberId,
                        loan_date: new Date(),
                        due_date: new Date(new Date().setDate(new Date().getDate() + 14))
                    },
                    { session }
                );

                await session.commitTransaction();
                console.log(`Checkout successful for member ${memberId}`);
            } else {
                console.log(`No copies available for member ${memberId}`);
                await session.abortTransaction();
            }
        } catch (error) {
            await session.abortTransaction();
            console.error("Transaction failed: ", error);
        } finally {
            session.endSession();
        }
    } finally {
        await client.close();
    }
}

// Simulate concurrency with multiple parallel calls
const concurrencyCount = 5;
for (let i = 0; i < concurrencyCount; i++) {
    checkoutBook(1, 100 + i);
}
