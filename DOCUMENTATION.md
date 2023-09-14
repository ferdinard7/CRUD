## API Documentation
## Introduction
This documentation outlines the usage of the Zuri Backend API for managing person records. The API allows you to perform CRUD operations on person records stored in a MongoDB database.

## Base URL
The base URL for all API endpoints is /api.

## Endpoints
1. Create a New Person
Endpoint: "/"
Method: POST
Request Format:
JSON body with the following field:
name (string, required): The name of the person to be created.
Response Format:
JSON response with the created person's details.
Sample Request:

POST /api/
{
    "name": "John Doe"
}


Sample response
{
    "_id": "5f7b593b8f4c441cfe9b6b76",
    "name": "John Doe",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T00:00:00.000Z"
}


2. Get a Person by ID
Endpoint: /:id
Method: GET
Request Format:
URL parameter id (string, required): The unique identifier of the person.
Response Format:
JSON response with the person's details.
Sample Request:

GET /api/5f7b593b8f4c441cfe9b6b76

Sample response 
{
    "_id": "5f7b593b8f4c441cfe9b6b76",
    "name": "John Doe",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T00:00:00.000Z"
}

3. Update a Person by ID
Endpoint: /:id
Method: PUT
Request Format:
URL parameter id (string, required): The unique identifier of the person.
JSON body with the following field:
name (string, required): The updated name of the person.
Response Format:
JSON response with the updated person's details.
Sample Request:

PUT /api/5f7b593b8f4c441cfe9b6b76
{
    "name": "Updated Name"
}
 Sample response:
 {
    "_id": "5f7b593b8f4c441cfe9b6b76",
    "name": "Updated Name",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T12:34:56.789Z"
}

4. Delete a Person by ID
Endpoint: /:id
Method: DELETE
Request Format:
URL parameter id (string, required): The unique identifier of the person.
Response Format:
JSON response indicating the success of the deletion.
Sample Request:

DELETE /api/5f7b593b8f4c441cfe9b6b76

Sample Response

{
    "message": "Person deleted successfully"
}


5. Get a Person by Name
Endpoint: /person/byName/:name
Method: GET
Request Format:
URL parameter name (string, required): The name of the person to retrieve.
Response Format:
JSON response with the person's details.
Sample Request:

GET /api/person/byName/John%20Doe


Sample Response:
{
    "_id": "5f7b593b8f4c441cfe9b6b76",
    "name": "John Doe",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T00:00:00.000Z"
}

6. Update a Person by Name
Endpoint: /person/:name
Method: PUT
Request Format:
URL parameter name (string, required): The name of the person to update.
JSON body with the following field:
newName (string, required): The updated name of the person.
Response Format:
JSON response with the updated person's details.
Sample Request:

PUT /api/person/John%20Doe
{
    "newName": "Updated Name"
}

Sample Response:
{
    "_id": "5f7b593b8f4c441cfe9b6b76",
    "name": "Updated Name",
    "createdAt": "2023-09-13T00:00:00.000Z",
    "updatedAt": "2023-09-13T12:34:56.789Z"
}


7. Delete a Person by Name
Endpoint: /person/:name
Method: DELETE
Request Format:
Sample Response:
{
   message: "person deleted successfully"
}


Known Limitations and Assumptions
The API assumes that person names are unique and enforces uniqueness through the unique constraint in the database schema.
Rate limiting and authentication mechanisms are not implemented in this version of the API.
The API assumes that MongoDB is properly configured and connected.



## SETTING UP AND DEPLOYING THE API
## Prerequisites
Before you can set up and deploy the Zuri Backend API, ensure you have the following prerequisites installed:

## Node.js: Download and install Node.js.
## MongoDB: Install MongoDB and ensure the MongoDB server is running.
Local Development
Follow these steps to set up and run the API locally for development:

## Clone the Repository:
git clone <repository-url>

Navigate to the project Repository:
cd <project-directory>

Install Dependencies:
npm install

Create a .env File:

Create a .env file in the project root directory and add the following configuration:

PORT=3001
CONNECTION_STRING=<your-mongodb-connection-string>


Replace <your-mongodb-connection-string> with the connection string to your MongoDB instance.

Start the Development Server:
npm start

The API will be available at http://localhost:3001/api.

Deployment to a Server
To deploy the API to a server, you can follow these general steps:

Choose a Hosting Provider: Select a hosting provider such as Heroku, AWS, DigitalOcean, or any other provider of your choice.

Set Up Environment Variables: Configure environment variables on your hosting platform to match the .env configuration used in the local setup.

Deploy Code: Use the deployment method provided by your hosting provider to upload your code and dependencies to the server.

Start the API: Start the API on the server. The specific command may vary depending on your hosting environment.

Configure Domain and SSL (Optional): If you have a custom domain, configure it to point to your server's IP address. Additionally, consider enabling SSL for secure communication.

Monitor and Scale: Set up monitoring tools and consider scaling options as your API's traffic grows.

Please refer to the documentation of your chosen hosting provider for detailed deployment instructions. Make sure to secure your server and follow best practices for production deployment.

That's it! You've successfully set up and deployed the Zuri Backend API. Users can now access your API through the server's URL.