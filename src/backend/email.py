from google.appengine.api import mail


def send_verification_email(email, verification_url):
    body = """
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat" rel="stylesheet">
      </head>
      <body style="font-family: 'Roboto', sans-serif;">
        <table style="width: 100%;min-width: 400px;">
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #003091;text-align: center;padding: 15px;">
                <table style="width: 35%;margin: 0 auto;">
                  <tr>
                    <th>
                      <a href="lightho.us">
                      <img style="max-width: 300px;" src="https://lightho.us/blue_logo.png" alt="lightho.us logo"></a>
                    </th>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #f0f0f0;padding: 40px;font-size: 20px;">
                <p style="margin-top: 0;margin-bottom: 80px;color: #000000 !important;">Welcome to <a style="font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a>! To complete the sign up process, please confirm your email here:</p>
                <div style="text-align: center;margin: 40px 0px;">
                  <a href="
                    """
    body += verification_url
    body += """
                    " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 15px 30px;letter-spacing: 2px;">VERIFY EMAIL</a>
                </div>
                <p style="margin-bottom: 0;margin-top: 80px;color: #000000 !important;"><3,</p>
                <p style="margin-top: 0;margin-bottom: 0;color: #000000 !important;">The <a style="font-weight: normal;font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a> team</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>"""
    
    message = mail.EmailMessage(sender="no-reply@lightho.us", subject='Welcome to lightho.us!')
    message.to = email
    message.html = body
    message.send()


def send_forgot_password_email(email, forgot_password_url):

    body = """
    <html>
      <head>
        <link href="https://fonts.googleapis.com/css?family=Roboto|Montserrat" rel="stylesheet">
      </head>
      <body style="font-family: 'Roboto', sans-serif;">
        <table style="width: 100%; min-width: 400px;">
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #003091;text-align: center;padding: 15px;">
                <table style="width: 35%;margin: 0 auto;">
                  <tr>
                    <th>
                      <a href="lightho.us">
                      <img style="max-width: 300px;" src="https://lightho.us/blue_logo.png" alt="lightho.us logo"></a>
                    </th>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td style="display: block;max-width: 500px;margin: 3px auto;">
              <div style="background-color: #f0f0f0;padding: 40px;font-size: 20px;">
                <p style="margin-top: 0;margin-bottom: 80px;">Hey there! Click the button below to change your password. If you think you got this email by mistake, just ignore it.</p>
                <div style="text-align: center;margin: 40px 0px;">
                  <a href= "
                  """
    body += forgot_password_url
    body += """
                  " style="text-decoration: none;color: #ffffff;background-color: #003091;padding: 15px 30px;letter-spacing: 2px;">CHANGE PASSWORD</a>
                </div>
                <p style="margin-bottom: 0;margin-top: 80px;"><3,</p>
                <p style="margin-top: 0;margin-bottom: 0;">The <a style="font-weight: normal;font-family: 'Montserrat','Roboto',sans-serif;color: #003091;">lightho.us</a> team</p>
              </div>
            </td>
          </tr>
        </table>
      </body>
    </html>"""

    message = mail.EmailMessage(sender="no-reply@lightho.us", subject='lightho.us Password Recovery Email')
    message.to = email
    message.html = body
    message.send()
