## Python Consumer

The Python consumer is responsible for handling image processing tasks triggered by messages from RabbitMQ. It performs the following operations:

- Message Consumption: Listens for and consumes messages from a designated RabbitMQ queue.

- Image Generation: Dynamically generates an image based on the message content.

- Text Overlay: Writes a specified text onto the generated image.

- Cloud Upload: Uploads the finalized image to Cloudinary.

- Database Update: Updates the corresponding record in the MongoDB database with the Cloudinary image URL and related metadata.

- Email Notification: Sends an email to notify the user upon successful processing.


## Technologies Used
* Python 3 – Core language for the consumer logic.

* Pika – For connecting to and consuming messages from RabbitMQ.

* Pillow (PIL) – For image generation and text rendering on images.

* Cloudinary Python SDK – For uploading and managing images in Cloudinary.

* PyMongo – For interacting with MongoDB.

* smtplib / Email Libraries – For sending email notifications.


## Docker SetUp

#### Build Image
```
$ docker build -t image-signer-python-consumer . 
```

#### Tag Image
```
$ docker tag image-signer-python-consumer <your dockerhub account name>/image-signer-python-consumer
```

#### Push Image
```
$ docker login # skip if already logged in
$ docker push <your dockerhub account name>/image-signer-python-consumer
```

### Env Variables
```
QUEUE_NAME=sign
CLOUDINARY_CLOUD_NAME= 
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
GMAIL_ADDRESS=
GMAIL_PASSWORD=
MONGO_URL=
DB_NAME=imageSigner
COL_NAME=imagesigners
RABBITMQ_URL=rabbitmq
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
