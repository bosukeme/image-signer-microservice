import smtplib
from email.message import EmailMessage
import config as cfg

settings = cfg.Settings() 


def notification(image_id, receiver_address):
    
    sender_address = settings.GMAIL_ADDRESS
    sender_password = settings.GMAIL_PASSWORD
    
    msg = EmailMessage()
    msg.set_content(f"Image Created: {image_id} is now ready!")
    msg["Subject"] = "Image Download"
    msg["From"] = sender_address
    msg["To"] = receiver_address

    session = smtplib.SMTP_SSL("smtp.gmail.com", 465)
    session.login(sender_address, sender_password)
    session.send_message(msg, sender_address, receiver_address)
    session.quit()
    print("Mail Sent")
