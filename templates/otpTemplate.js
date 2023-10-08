const otpTemplate = (name, otp, site) => {
  return `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>One-Time Password (OTP) Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f7f7f7;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              border:0;
              background-color: #fff;
              border-radius: 5px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            .otp-code {
              font-size: 24px;
              font-weight: bold;
              color: #007bff;
            }
            .instructions {
              margin-top: 20px;
            }
            .cta-button {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              border-radius: 5px;
              border:0;
            }
            .cta-button a{
              color:inherit;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>One-Time Password (OTP)</h1>
            <p>Dear user, <strong>${name}</strong></p>
            <p>Your OTP is:</p>
            <p class="otp-code">${otp}</p>
            <p class="instructions">
              Please use this OTP to proceed with your action. This OTP is valid for a
              single use and will expire shortly.
            </p>
            <p>Thank you for using our services!</p>
            <p><b>Photo Grixal Team</b></p>
            <button class="cta-button">
            <a href="${site}">Visit Our Website</a>
            </button>
          </div>
        </body>
      </html>
      `;
};

export default otpTemplate;
