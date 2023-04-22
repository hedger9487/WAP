Accounting Web Application Requirements
Introduction
The purpose of this document is to outline the requirements for an accounting web application to be used by a group of friends for tracking payments and expenses. The application will allow users to create accounts, track payments, split expenses, send friend requests, and confirm transaction details. Additionally, the application will provide the ability to ping transactions on Google Maps.
User Management
The application must allow users to create and manage their own accounts with unique login credentials and personal information.
Users should be able to update their personal information, including name, email address, and any other relevant details.
Payment Tracking
Users must be able to enter payment information for various transactions, including the amount paid, the date of the transaction, and any notes or comments.
The application must be able to track these payments and calculate outstanding balances for each user.
Users should be able to view their own payment history and outstanding balances, as well as the payment history and outstanding balances of other users in the group.
Expense Splitting
The application must allow users to split expenses among multiple users, allocating the cost of a shared purchase among the appropriate users.
Users should be able to view the expenses they have shared with others, as well as the expenses shared by other users in the group.
Friend Requests
Users must be able to send friend requests to other users and accept or decline friend requests from others.
The application should provide users with the ability to search for other users in the group and add them as friends.
Confirmation System
When a user adds another user to a transaction, the application must send a confirmation request to the added user to confirm their participation in the transaction.
The application must ensure that all users are aware of and agree to the transaction details before proceeding.
Transaction Mapping
Each transaction entered into the application should be pinged on Google Maps, allowing users to view the location of the transaction.
Users should be able to view all transactions on a map, filtered by date or other relevant criteria.
Security
The application must include appropriate security measures to protect user data and prevent unauthorized access.
Users' personal information and payment history must be kept confidential and secure.
Reporting
The application must include reporting functionality, allowing users to view payment history, outstanding balances, and other relevant information.
Users should be able to download reports in various formats, such as PDF or CSV.
Technology Stack
The application should be built using modern web development technologies such as:
HTML/CSS/JavaScript for the front-end
Node.js for the back-end
MongoDB for the database
Mobile Optimization
The application must be optimized for mobile devices, allowing users to easily access and use the application on their smartphones or tablets.
The user interface should be responsive and user-friendly on mobile devices.
User Support
The application must include clear documentation and user support resources, such as a user manual or FAQs, to help users get started and troubleshoot any issues they encounter.
Users should be able to contact support staff directly if they need assistance.
Conclusion
This accounting web application will provide a secure and user-friendly platform for tracking payments and expenses among a group of friends. The features outlined in this document, as well as the use of a specific technology stack and the ability to ping transactions on Google Maps, will ensure that users are able to manage their finances efficiently and effectively.









Payment Categories: It may be helpful to include payment categories in the payment tracking feature, so users can categorize their expenses (e.g. groceries, rent, entertainment) for easier reporting.
Payment Reminders: Users may forget to make payments, so it might be helpful to include a reminder system that sends users notifications when a payment is due or overdue.
Payment Notifications: The application can also send notifications to other users when a payment is made, so everyone is aware of the transaction.
Splitting expenses equally: Users should have the ability to split expenses equally, even if some users paid more than others.
Group Management: The application should allow for the creation and management of groups, where users can view and manage payments and expenses within the group.
Budgeting: The application can include a budgeting feature that allows users to set spending limits and receive notifications when they are approaching or exceeding their budget.
Data Visualization: The application can include charts and graphs to visualize payment history and outstanding balances, making it easier for users to understand their financial situation.
Integration with Payment Systems: Consider integrating the application with payment systems like PayPal or Venmo to make it easier for users to make and receive payments.
Testing and Maintenance: Make sure to include testing and maintenance in your plan, so you can ensure the application is functioning correctly and address any issues that arise.
User Feedback: Regularly collect feedback from users to improve the application and identify areas that need improvement.





























STEP2
Programming language: Java
Web framework: Spring Boot
Database: MySQL or PostgreSQL
Front-end framework: React.js or Vue.js
Real-time updates: WebSockets
Hosting: Amazon Web Services (AWS) or Heroku
Maps: Google Maps API


STEP3

Class diagram:
+------------------+    	    		+------------------+        			+-------------------+
|      User        |        			|  Transactions   |        			| FriendRequest  |
+------------------+      		  	+------------------+        			+-------------------+
| -userId: int     |       	 		| -transactionId: int  |   		| -requestId: int   |
| -firstName: String|    	 		| -amount: double  |     		| -sender: User     |
| -lastName: String |     		| -description: String|   		| -receiver: User  |
| -email: String    |         		| -date: Date      |        			| -status: Status   |
| -password: String |      		| -payers: List<UserAmount> |        	+-------------------+
| -friends: List<User>|    		| -payees:List<UserAmount or Location> |
| -transactions: List<Transaction>|  	| -status: Status |
                                         		| +sendConfirmation() |
+------------------+        			+------------------+

UserAmount
-user: User
-amount: double
-confirmed: bool

+----------------+        +------------------+
|   Expense      |        | ExpenseSplit     |
+----------------+        +------------------+
| -expenseId: int|        | -splitId: int    |
| -description: String|   | -expenseId: int  |
| -date: Date    |        | -user: User      |
| -location: Location |   | -amount: double  |
| -amount: double|        +------------------+
| -payer: User   |
| -payees: List<ExpenseSplit> |
+----------------+








+-----------------+
|     Location    |
+-----------------+
| -locationId: int|
| -latitude: double|
| -longitude: double|
| -name: String   |
+-----------------+

+------------------+
|      Report      |
+------------------+
| -reportId: int   |
| -name: String    |
| -startDate: Date |
| -endDate: Date   |
| -data: List<Data>|
+------------------+

+----------------+
|      Data      |
+----------------+
| -label: String |
| -value: double |
+----------------+

enum Status {
  IN_PROGRESS,
  COMPLETED,
  CANCELLED
}


Use case diagram:
+------------------+        
|       User       |        
+------------------+       
| +createTransaction() |        
| +sendRequest()   |        
| +viewTransactions()  |      
| +pingTransactions() |
 
+------------------+





Sequence diagram:
                                      +-------------+     +------------+
                                    |    User     |     |  Database  |
                                    +-------------+     +------------+
                                    |             |     |            |
                                    |registerUser |     |            |
                                    |             |     |            |
                                    |    -------->|     |            |
                                    |             |     |storeUser() |
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  createTransaction |            |
                                    |  and split expense |            |
                                    |  among users      |            |
                                    |    -------->|     |            |
                                    |             |     |storeTransaction()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  viewPaymentHistory |            |
                                    |    -------->|     |            |
                                    |             |     |getPaymentHistory()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  viewOutstandingBalances|            |
                                    |    -------->|     |            |
                                    |             |     |getOutstandingBalances()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  addFriend  |     |            |
                                    |    -------->|     |            |
                                    |             |     |storeFriendship()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  confirmTransaction |            |
                                    |    -------->|     |            |
                                    |             |     |confirmTransaction()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  searchUser |     |            |
                                    |    -------->|     |            |
                                    |             |     |searchUser()|
                                    |             |     |    <-------|
                                    |             |     |            |
                                    |             |     |            |
                                    |             |     |            |
                                    |  contactSupport|



Activity diagram:

+------------------+      
|       User       |      
+------------------+      
        |           
        |  createPayment()       
        |-----------------------+
        |           |           |
        |           |    addFriendsToPayment()  
        |           |-----------------------+
        |           |           |           |
        |           |           |    sendConfirmationMessages()
        |           |           |-----------------------+
        |           |           |           |           |
        |           |           |           |   paymentComplete()
        |           |           |           |----------------------->
        |           |           |           |           














Define the requirements - The first step is to define the requirements for your application. What features should it have? Who will use it? What problems will it solve? You can start by creating a list of high-level requirements and then breaking them down into smaller, more specific requirements.
Choose a technology stack - The next step is to choose the technology stack for your application. This includes the programming language, web framework, database, and any other tools you will use. For a web application, some popular technology stacks include Java with Spring, Python with Django, and Ruby on Rails.
Create a data model - Before you start coding, it's important to create a data model that defines the structure of your application's data. This will help you plan your database schema and API endpoints. You can use a tool like ERD (Entity Relationship Diagram) or UML (Unified Modeling Language) to create your data model.
Build the backend - Once you have your data model, you can start building the backend of your application. This includes creating your database schema, defining your API endpoints, and writing your business logic. You can use a web framework to speed up the development process.
Build the frontend - After you have your backend in place, you can start building the frontend of your application. This includes creating your user interface, integrating with your API, and handling user input. You can use a JavaScript framework like React, Angular, or Vue to create your frontend.
Test and deploy - Once you have a working prototype of your application, it's important to test it thoroughly to ensure that it works as expected. You can use automated testing tools to speed up the process. After testing, you can deploy your application to a server or cloud hosting provider.
Iterate and improve - Once your application is live, you can continue to iterate and improve it based on user feedback and usage patterns. You can use analytics tools to monitor usage and identify areas for improvement.


Define your API endpoints: You will need to decide which actions your users should be able to perform on your application, and create endpoints that allow them to do so. For example, you might create an endpoint that allows a user to view their transaction history, or an endpoint that allows them to add a new friend.
Write your business logic: Once you have defined your endpoints, you need to write the code that will handle each request. This includes validating user input, querying the database, and returning the appropriate response.
Create your database schema: You have already done this step! Your database schema defines the structure of your data and how it relates to other data in your application.
Choose a web framework: A web framework is a tool that can help you build your backend more quickly and efficiently. Popular options include Flask, Django, and Express.js.
Write your code: Using the web framework of your choice, you can start writing the code that will power your backend. This will likely involve creating controllers, models, and routes, as well as integrating with your database.
Test and debug: As you write your code, it is important to test it thoroughly to ensure that it is functioning as expected. You will also need to debug any issues that arise.
Deploy your backend: Once your backend is complete, you will need to deploy it to a server so that it can be accessed by your frontend. This could involve using a cloud hosting service like AWS or Google Cloud, or setting up your own server.




















Make changes to your code
Add changes to the staging area: git add . or git add <filename>
Commit changes to the local repository: git commit -m "commit message"
Push changes to the remote repository: git push origin master










CREATE TABLE `User` (
  `userId` INT AUTO_INCREMENT PRIMARY KEY,
  `firstName` VARCHAR(20) NOT NULL,
  `lastName` VARCHAR(20) NOT NULL,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(20) NOT NULL,
  `registDate` DATE NOT NULL,
  `Field` VARCHAR(20) NOT NULL
);

CREATE TABLE `Friend` (
  `friendId` INT AUTO_INCREMENT PRIMARY KEY,
  `user1Id` INT NOT NULL,
  `user2Id` INT NOT NULL,
  `status` ENUM('pending', 'accepted', 'declined') NOT NULL,
  `createdAt` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`user1Id`) REFERENCES `User`(`userId`),
  FOREIGN KEY (`user2Id`) REFERENCES `User`(`userId`),
  UNIQUE KEY (`user1Id`, `user2Id`)
);

CREATE TABLE `Transactions` (
  `transactionId` INT AUTO_INCREMENT PRIMARY KEY,
  `amount` DOUBLE NOT NULL,
  `description` VARCHAR(200),
  `date` TIMESTAMP NOT NULL,
  `status` ENUM('pending', 'completed', 'cancelled') NOT NULL
);

CREATE TABLE `TransactionPayer` (
  `transactionPayerId` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `transactionId` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
  `confirm` BOOLEAN NOT NULL DEFAULT false,
  `confirmation_date` TIMESTAMP DEFAULT NULL
  FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`transactionId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`userId`)
);

CREATE TABLE `TransactionPayee` (
  `transactionPayeeId` INT AUTO_INCREMENT PRIMARY KEY,
  `userId` INT NOT NULL,
  `transactionId` INT NOT NULL,
  `amount` DOUBLE NOT NULL,
   `confirm` BOOLEAN NOT NULL DEFAULT false,
  `confirmation_date` TIMESTAMP DEFAULT NULL
  `locationId` INT,
  FOREIGN KEY (`transactionId`) REFERENCES `Transactions`(`transactionId`),
  FOREIGN KEY (`userId`) REFERENCES `User`(`userId`),
  FOREIGN KEY (`locationId`) REFERENCES `Location`(`locationId`)
);

CREATE TABLE `Location` (
  `locationId` INT AUTO_INCREMENT PRIMARY KEY,
  `latitude` DOUBLE NOT NULL,
  `longitude` DOUBLE NOT NULL,
  `name` VARCHAR(50) NOT NULL
);

CREATE TABLE `Report` (
  `reportId` INT AUTO_INCREMENT PRIMARY KEY,
  `date` DATE NOT NULL,
  `description` VARCHAR(200) NOT NULL,
  `userId` INT NOT NULL,
  FOREIGN KEY (`userId`) REFERENCES `User`(`userId`)
);








Get a list of all transactions:
bash
Copy code
GET /api/transactions
Get a specific transaction by ID:
bash
Copy code
GET /api/transactions/:id
Add a new transaction:
bash
Copy code
POST /api/transactions
Update an existing transaction:
bash
Copy code
PUT /api/transactions/:id
Delete a transaction:
bash
Copy code
DELETE /api/transactions/:id
Get a list of all users:
bash
Copy code
GET /api/users
Get a specific user by ID:
bash
Copy code
GET /api/users/:id
Add a new user:
bash
Copy code
POST /api/users
Update an existing user:
bash
Copy code
PUT /api/users/:id
Delete a user:
bash
Copy code
DELETE /api/users/:id
Get a list of a user's friends:
bash
Copy code
GET /api/users/:id/friends
Add a friend for a user:
bash
Copy code
POST /api/users/:id/friends
Delete a friend for a user:
ruby
Copy code
DELETE /api/users/:id/friends/:friendId
Get a list of a user's transactions:
bash
Copy code
GET /api/users/:id/transactions
Get a list of a user's pending transactions:
ruby
Copy code
GET /api/users/:id/transactions/pending
Confirm a user's pending transaction:
ruby
Copy code
PUT /api/users/:id/transactions/pending/:transactionId/confirm
Reject a user's pending transaction:
ruby
Copy code
PUT /api/users/:id/transactions/pending/:transactionId/reject


