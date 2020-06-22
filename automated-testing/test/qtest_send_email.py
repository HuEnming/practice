from send_email import send_email


def test_send_email():
    # your Gmail account
    import smtplib

    # creates SMTP session
    s = smtplib.SMTP("smtp.gmail.com", 587)

    # start TLS for security
    s.starttls()

    # Authentication
    s.login("huenming111@gmail.com", "")

    # message to be sent
    message = "Message_you_need_to_send"

    # sending the mail
    s.sendmail("huenming111@gmail.com", "821116016@qq.com", message)

    # terminating the session
    s.quit()

