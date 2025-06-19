from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    QUEUE_NAME: str = "sign"
    CLOUDINARY_CLOUD_NAME: str
    CLOUDINARY_API_KEY: str
    CLOUDINARY_API_SECRET: str

    GMAIL_ADDRESS: str
    GMAIL_PASSWORD: str

    MONGO_URL: str = "mongodb://localhost:27017/"
    DB_NAME: str = "imageSigner"
    COL_NAME: str = "imagesigners"
    
    RABBITMQ_URL: str = "rabbitmq"

    class Config:
        env_file = ".env"
