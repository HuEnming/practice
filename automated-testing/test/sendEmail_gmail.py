# import smtplib, ssl

# smtp_server = "smtp.gmail.com"
# port = 587  # For starttls
# sender_email = "huenming111@gmail.com"
# password = "huenming"#input("Type your password and press enter: ")

# # Create a secure SSL context
# context = ssl.create_default_context()

# # Try to log in to server and send email
# try:
#     server = smtplib.SMTP(smtp_server,port)
#     server.ehlo() # Can be omitted
#     server.starttls(context=context) # Secure the connection
#     server.ehlo() # Can be omitted
#     server.login(sender_email, password)
#     # TODO: Send email here
# except Exception as e:
#     # Print any error messages to stdout
#     print(e)
# finally:
#     server.quit() 


import email, smtplib, ssl

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

subject = "An email with attachment from Python"
body = "This is an email with attachment sent from Python"
sender_email = "huenming111@gmail.com"
receiver_email = "enming.hu.2019@mumail.ie"#"huenming111@gmial.com"
password = ""#input("Type your password and press enter:")

# Create a multipart message and set headers
message = MIMEMultipart()
message["From"] = sender_email
message["To"] = receiver_email
message["Subject"] = subject
message["Bcc"] = receiver_email  # Recommended for mass emails

# Add body to email
message.attach(MIMEText(body, "plain"))

filename = "test.txt"  # In same directory as script

# Open PDF file in binary mode
with open(filename, "rb") as attachment:
    # Add file as application/octet-stream
    # Email client can usually download this automatically as attachment
    part = MIMEBase("application", "octet-stream")
    part.set_payload(attachment.read())

# Encode file in ASCII characters to send by email    
encoders.encode_base64(part)

# Add header as key/value pair to attachment part
part.add_header(
    "Content-Disposition",
    f"attachment; filename= {filename}",
)

# Add attachment to message and convert message to string
message.attach(part)
text = message.as_string()

context = ssl.create_default_context()
with smtplib.SMTP_SSL("smtp.gmail.com", 465, context=context) as server:
    server.login(sender_email, password)
    server.sendmail(sender_email, receiver_email, text)
    
# import smtplib
# import ssl
# context = ssl.SSLContext(ssl.PROTOCOL_TLS)
# connection = smtplib.SMTP('smtp.office365.com', 587)
# connection.ehlo()
# connection.starttls(context=context)
# connection.ehlo()
# connection.login('enming.hu.2019@mumail.ie', 'dongaifangpdk8256')

# context = ssl.SSLContext(ssl.PROTOCOL_TLS)
# with smtplib.SMTP('smtp.office365.com', 587) as server:
#     server.ehlo()
#     server.starttls(context=context)
#     server.ehlo()
#     server.login('enming.hu.2019@mumail.ie', 'dongaifangpdk8256')
