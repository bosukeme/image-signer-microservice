import cv2
import numpy as np
import cloudinary
import cloudinary.uploader
import os
import tempfile
from bson import ObjectId
from pymongo import MongoClient

import creator as crt 
import config as cfg

settings = cfg.Settings() 


cloudinary.config(
        cloud_name=settings.CLOUDINARY_CLOUD_NAME,
        api_key=settings.CLOUDINARY_API_KEY,
        api_secret=settings.CLOUDINARY_API_SECRET
    )


def add_text_to_image(image, text, theme):
    height, width, _ = image.shape
    
    width_val = width * (1 - 0.38 )
    height_val = height * (1 - 0.11 )

    font = cv2.FONT_HERSHEY_SCRIPT_SIMPLEX | cv2.FONT_ITALIC
    
    font_scale = 3

    color = (12, 12, 12) if theme == "light" else (255, 255, 255)
    thickness = 6
    position = (int(width_val), int(height_val))

    cv2.putText(image, text, position, font, font_scale, color, thickness)
    return image


def upload_to_cloudinary(image, public_id=None):

    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp:
        temp_path = temp.name
        cv2.imwrite(temp_path, image)

    print("Uploading to Cloudinary...")
    result = cloudinary.uploader.upload(temp_path, folder="signed_images/final", public_id=public_id)

    os.remove(temp_path)
    return result['secure_url']


from PIL import Image

def show_with_pillow(image):
    image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pil_image = Image.fromarray(image_rgb)
    pil_image.show()


def process_image_message(theme, text, image_id):

    grid = crt.HexGridGenerator(theme=theme)
    grid.generate_grid()
    pil_image  = grid.scale_image()
    
    image = cv2.cvtColor(np.array(pil_image), cv2.COLOR_RGB2BGR)
    
    image = add_text_to_image(image, text, theme)

    final_url = upload_to_cloudinary(image, public_id=image_id)
    print(f"Final image uploaded to: {final_url}")
    return final_url


def upload_to_mongo(payload: dict, image_id: str):
    try:
        client =  MongoClient(settings.MONGO_URL)
        db = client[settings.DB_NAME]
        collection = db[settings.COL_NAME]
        
        filter = {"_id": ObjectId(image_id)}
        update = {"$set": payload}
        result = collection.update_one(filter, update)
        return result.modified_count 
    except Exception as err:
        print(f"Failed to update mongo record: {err}")
        return 0

if __name__ == "__main__":
    text = "master"
    image_id = "684debd401a598739b8b8581"
    theme = "light"
    cloudinary_url = process_image_message(theme, text, image_id)