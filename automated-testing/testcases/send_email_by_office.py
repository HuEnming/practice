import email, smtplib, ssl

from email import encoders
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import configparser


def send_email_by_office():
    config = configparser.ConfigParser()
    config.read('pytest.ini')
    subject = "MULE Test Report"
    body = "This is an email with attachment sent from a nautomated testing program."
    sender_email = config['email']['office_365']#"enming.hu.2019@mumail.ie"
    receiver_email = config['email']['qq_mail']#"821116016@qq.com"
    password = config['email']['office_365_password']#""  # input("Type your password and press enter:")
    print(config['email']['office_365'])
    print(config['email']['qq_mail'])
    print(config['email']['office_365_password'])


    # Create a multipart message and set headers
    message = MIMEMultipart()
    message["From"] = sender_email
    message["To"] = receiver_email
    message["Subject"] = subject
    # message["Bcc"] = "huenming111@gmial.com;huenming@live.com"  # Recommended for mass emails

    # Add body to email
    message.attach(MIMEText(body, "plain"))

    filename = "report/report.html"  # In same directory as script

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
        "Content-Disposition", f"attachment; filename= {filename}",
    )

    # Add attachment to message and convert message to string
    message.attach(part)
    text = message.as_string()

    context = ssl.SSLContext(ssl.PROTOCOL_TLS)
    with smtplib.SMTP("smtp.office365.com", 587) as server:
        server.ehlo()
        server.starttls(context=context)
        server.ehlo()
        server.login(sender_email, password)
        server.sendmail(sender_email, receiver_email, text)

if __name__=='__main__':
    send_email_by_office()

