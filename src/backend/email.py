import sendgrid
from sendgrid.helpers.mail import *

import auth_config

def send_verification_email(email, verification_url, jinja_env):
    sg = sendgrid.SendGridAPIClient(apikey=auth_config.sendgrid_api_key)

    template = jinja_env.get_template('templates/welcome_email.html')
    body = template.render(verification_url=verification_url)

    from_email = Email("no-reply@lightho.us")
    to_email = Email(email)
    subject = 'Welcome to lightho.us!'
    content = Content("text/html", body)
    message = Mail(from_email, subject, to_email, content)

    sg.client.mail.send.post(request_body=message.get())


def send_forgot_password_email(email, forgot_password_url, jinja_env):
    sg = sendgrid.SendGridAPIClient(apikey=auth_config.sendgrid_api_key)

    template = jinja_env.get_template('templates/forgot_password_email.html')
    body = template.render(forgot_password_url=forgot_password_url)

    from_email = Email("no-reply@lightho.us")
    to_email = Email(email)
    subject = 'lightho.us Password Recovery Email'
    content = Content("text/html", body)
    message = Mail(from_email, subject, to_email, content)

    sg.client.mail.send.post(request_body=message.get())


def send_posts_update_email(email, subject, body, unsubscribe_url):
    sg = sendgrid.SendGridAPIClient(apikey=auth_config.sendgrid_api_key)

    from_email = Email("beacon@lightho.us")
    to_email = Email(email)
    subject = subject
    content = Content("text/html", body)
    message = Mail(from_email, subject, to_email, content)
    message.add_header(Header("List-Unsubscribe", unsubscribe_url))

    sg.client.mail.send.post(request_body=message.get())


