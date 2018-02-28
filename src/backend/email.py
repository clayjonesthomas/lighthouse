from google.appengine.api import mail


def send_verification_email(email, verification_url, jinja_env):
    template = jinja_env.get_template('templates/welcome_email.html')
    body = template.render(verification_url=verification_url)
    message = mail.EmailMessage(
        sender="no-reply@lightho.us",
        subject='Welcome to lightho.us!',
        to=email,
        html=body,
    )
    message.send()


def send_forgot_password_email(email, forgot_password_url, jinja_env):
    template = jinja_env.get_template('templates/forgot_password_email.html')
    body = template.render(forgot_password_url=forgot_password_url)
    message = mail.EmailMessage(
        sender="no-reply@lightho.us",
        subject='lightho.us Password Recovery Email',
        to=email,
        html=body
    )
    message.send()
