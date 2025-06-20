## NextJS Frontend
The Next.js frontend provides the user interface for interacting with the image generation service. It offers the following functionality:

* User Input: Renders a form where users can:

    - Enter their email address.

    - Input custom text to be written on the image.

    - Upload an image file.

* Form Submission: Sends the collected data to the Node.js server via an API request.

* Image Retrieval: Allows users to retrieve and view the generated image once processing is complete.

This frontend is built for simplicity and responsiveness, ensuring a smooth user experience throughout the submission and retrieval process.

## Technologies Used
* Next.js – React framework for building the frontend UI with server-side rendering.

* TypeScript – Provides static typing for better development and maintainability.

* Tailwind CSS – Utility-first CSS framework for styling.

* Fetch API – For sending HTTP requests to the backend API.


## Docker SetUp

#### Build Image
```
$ docker build -t image-signer-frontend . 
```

#### Tag Image
```
$ docker tag image-signer-frontend <your dockerhub account name>/image-signer-frontend
```

#### Push Image
```
$ docker login # skip if already logged in
$ docker push <your dockerhub account name>/image-signer-frontend
```

### Env Variables
```
NEXT_PUBLIC_API_BASE_URL=http://node-server.live
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
