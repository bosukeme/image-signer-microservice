## Node Server
The Node server acts as the intermediary between the frontend and the backend processing pipeline. It performs the following tasks:

* API Handling: Receives HTTP API requests from the frontend containing data such as the image, text, and user information.

* Database Insertion: Saves the received data as a new record in MongoDB.

* Message Publishing: Publishes a message to the RabbitMQ queue to trigger processing by the Python consumer.

This service ensures smooth communication between the frontend interface and the asynchronous image processing workflow.

## Technologies Used
* Node.js – Runtime environment for building the backend service.

* TypeScript – Strongly typed language for scalable Node.js development.

* Express.js – Minimal and flexible web framework for handling HTTP routes.

* RabbitMQ – Message broker for publishing events to the Python consumer.

* Mongoose / MongoDB – For interacting with the database.


## Docker SetUp

#### Build Image
```
$ docker build -t image-signer-node-server . 
```

#### Tag Image
```
$ docker tag image-signer-node-server <your dockerhub account name>/image-signer-node-server
```

#### Push Image
```
$ docker login # skip if already logged in
$ docker push <your dockerhub account name>/image-signer-node-server
```

### Env Variables
```
PORT=4000
NODE_ENV=development
MONGO_URI=
QUEUE_NAME=sign
RABBITMQURL=amqp://rabbitmq:5672
```

## Contributing

If you would like to contribute, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bugfix.
- Submit a pull request.

## Authors

Ukeme Wilson

- <a href="https://www.linkedin.com/in/ukeme-wilson-4825a383/">Linkedin</a>.
- <a href="https://medium.com/@ukemeboswilson">Medium</a>.
- <a href="https://www.ukemewilson.sbs/">Website</a>.
