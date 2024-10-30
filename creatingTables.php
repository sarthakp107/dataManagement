<?php
require_once("settings.php");



// Select the LibraryDB database
$conn->query("USE LibraryDB");

// SQL query to create tables
$query = "
CREATE TABLE IF NOT EXISTS Member (
    member_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(15) NOT NULL
);

CREATE TABLE IF NOT EXISTS Author (
    author_id INT PRIMARY KEY AUTO_INCREMENT,
author_name VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS Branch (
    branch_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS Book (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    branch_id INT,
    author_id INT,
    title VARCHAR(200),
    FOREIGN KEY (author_id) REFERENCES Author(author_id),
    FOREIGN KEY (branch_id) REFERENCES Branch(branch_id)
);

CREATE TABLE IF NOT EXISTS Loan (
    loan_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    member_id INT,
    loan_date DATE NOT NULL,
    due_date DATE NOT NULL,
    return_date DATE,
    extension_count INT,
    FOREIGN KEY (book_id) REFERENCES Book(book_id),
    FOREIGN KEY (member_id) REFERENCES Member(member_id)
);

CREATE TABLE IF NOT EXISTS Extension (
    extension_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT,
    extension_date DATE NOT NULL,
    new_due_date DATE NOT NULL,
    FOREIGN KEY (loan_id) REFERENCES Loan(loan_id)
);

CREATE TABLE IF NOT EXISTS Fine (
    fine_id INT PRIMARY KEY AUTO_INCREMENT,
    loan_id INT,
    issued_date DATE NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    paid_status BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (loan_id) REFERENCES Loan(loan_id)
);

CREATE TABLE IF NOT EXISTS Holds (
    hold_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    member_id INT,
    hold_date DATE NOT NULL,
    FOREIGN KEY (book_id) REFERENCES Book(book_id),
    FOREIGN KEY (member_id) REFERENCES Member(member_id)
);


 INSERT INTO Branch (branch_name, location) VALUES 
('Mernda Library', 'Mernda'),
('Hawthorn Library', 'Glenferrie'),
('Broadmeadows Library', 'Broadmeadows');

INSERT INTO Member (first_name, last_name, address, phone_number) VALUES
('Sarthak', 'Pradhan' , '123 St Glenroy' ,' 9999999'),
('Samip', 'Pudasaini' , '71 Orange Glenroy' ,' 956191'),
('Chirag', 'Luitel' , '51 Banana Ave' ,' 171642'),
('Ashim', 'Adhikari' , '111 Coconut rd ' ,' 987102'),
('Prabesh', 'Bhatarrai' , '71 Apple rd ' ,' 885019');

INSERT INTO Author (author_name) VALUES 
('George Orwell'),
('J.K. Rowling'),
('J.R.R. Tolkien');

INSERT INTO Book (branch_id, author_id, title)
VALUES 
(1, 1, 'The Great Gatsby'),
(1, 2, 'To Kill a Mockingbird'),
(2, 3, '1984'),
(3, 1, 'This Side of Paradise');

INSERT INTO Loan (book_id, member_id, loan_date, due_date, return_date, extension_count)
VALUES 
(1, 1, '2023-10-01', '2025-04-15', NULL, 0),
(2, 2, '2023-10-03', '2024-10-17', NULL, 1),
(3, 3, '2023-10-05', '2025-08-19', NULL, 0);

INSERT INTO Extension (loan_id, extension_date, new_due_date)
VALUES 
(2, '2023-10-10', '2025-10-24');

INSERT INTO Fine (loan_id, issued_date, amount, paid_status)
VALUES 
(1, '2023-10-16', 5.00, FALSE),
(2, '2023-10-18', 10.00, TRUE);


INSERT INTO Holds (book_id, member_id, hold_date)
VALUES 
(1, 1, '2023-10-01'),
(3, 2, '2023-10-05');
";

// Execute the multi-statement query
if ($conn->multi_query($query)) {
    echo "Tables created and added data successfully ";
} else {
    echo "Error creating tables: " . $conn->error;
}






// Close the connection
$conn->close();
?>
