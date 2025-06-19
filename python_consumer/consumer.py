import sys
import os
import pika
import json
import service as srv
import email_util as em
import config as cfg

settings = cfg.Settings() 


def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    try:
        data = json.loads(body)
    
        text = data["text"]
        email = data["email"]
        image_name = data["imageName"]
        image_id = data["imageId"]
        
        theme = "light" if "light" in image_name else "dark"
        
        updated_cloudinary_url = srv.process_image_message(theme, text, image_id)
        
        update_payload = {
            "cloudinaryUrl": updated_cloudinary_url,
            "status": "completed"
        }
        
        mod_count = srv.upload_to_mongo(update_payload, image_id)
        if mod_count == 1:
            em.notification(image_id, email)
        else:
            print("Failed to update mongo record. Try again")
        
        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        print(f"Error processing message: {str(e)}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)

def main():
    print(settings.RABBITMQ_URL)
    connection = pika.BlockingConnection(pika.ConnectionParameters(settings.RABBITMQ_URL))
    channel = connection.channel()

    queue_name = settings.QUEUE_NAME
    
    channel.queue_declare(queue=queue_name, durable=True)

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue=queue_name, on_message_callback=callback)

    print(" [*] Waiting for messages. To exit press CTRL+C")
    channel.start_consuming()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("Interrupted")
        try:
            sys.exit(0)
        except SystemExit:
            os._exit(0)