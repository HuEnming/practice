import smtplib
from email.mime.text import MIMEText
from email.header import Header

# from smtplib import SMTP_SSL


def send_email():
    sender = "enming.hu.2019@mumail.ie"
    receiver = "821116016@qq.com"
    smtpserver = "smtp.office365.com"
    username = "enming.hu.2019@mumail.ie"
    password = ""

    # subject
    mail_title = "Suject：Test Report"

    # read html
    f = open("report/report.html", "rb")
    mail_body = f.read()
    f.close()

    # email content
    message = MIMEText(mail_body, "html", "utf-8")
    message["From"] = sender
    message["To"] = receiver
    message["Subject"] = Header(mail_title, "utf-8")

    smtp = smtplib.SMTP(smtpserver)
    smtp.connect(smtpserver, 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.ehlo()
    smtp.login(username, password)
    smtp.sendmail(sender, receiver, message.as_string())
    print("Sent successfully！！！")
    smtp.quit()

    # mailserver = smtplib.SMTP("smtp.office365.com", 587)
    # mailserver.ehlo()
    # mailserver.starttls()
    # mailserver.login(username, password)
    # mailserver.sendmail(sender, receiver, "python email")
    # mailserver.quit()

    # server = smtplib.SMTP()
    # # 服务器连接
    # server.connect(smtpserver)
    # # 返回服务器特性
    # server.ehlo()
    # # 进行TLS安全传输
    # server.starttls()
    # # 账号密码登录
    # server.login(username, password)
    # # 邮件正文发送
    # body = "Dear Student, \n Please send your report\n Thank you for your attention"

    # server.sendmail(sender, receiver, message.as_string())
    # # 关闭服务器连接
    # server.close()

    # smtp = smtplib.SMTP()
    # smtp.connect(smtpserver, 587)
    # smtp.login(username, password)
    # smtp.sendmail(sender, receiver, message.as_string())
    # print("Sent successfully！！！")
    # smtp.quit()
    # smtp = SMTP_SSL(smtpserver)
    # set_debuglevel()是用来调试的。参数值为1表示开启调试模式，参数值为0关闭调试模式
    # smtp.set_debuglevel(1)


# smtp.ehlo(smtpserver)
# smtp.login(sender_qq, pwd)
# smtp = smtplib.SMTP()
# smtp.connect(smtpserver)
# smtp.login(username, password)
# smtp.sendmail(sender, receiver, message.as_string())
# print("Sent successfully！！！")
# smtp.quit()

# try:
#     smtp = smtplib.SMTP()
#     smtp.connect(smtpserver)
#     smtp.login(username, password)
#     smtp.sendmail(sender, receiver, message.as_string())
#     print("Sent successfully！！！")
#     smtp.quit()
# except smtplib.SMTPException:
#     print("Fail to sent！！！")

