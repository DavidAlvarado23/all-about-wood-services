const aws = require("aws-sdk");
const validator = require("email-validator");
const ses = new aws.SES({ region: process.env.REGION });

const status = {
  SUCCESS: "SUCCESS",
  FAILED: "FAILED",
};

const createQuote = async (event) => {
  const { input } = event.arguments;
  const {
    name,
    email,
    addressLine,
    addressCity,
    addressState,
    message,
  } = input;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  if (!validator.validate(email)) {
    throw new Error("Email not valid");
  }

  const recipientEmail = process.env.RECIPIENT_EMAIL;
  const body = `<div style="width: 100%">
    <h1 style="text-align:center">New Quote</h1>
    <div>
      Hi,<br/>
      <p>You have received a new quote from the web.</p>
    </div>
    <div>
      <p><b>Name: </b>${name}</p>
      <p><b>Email: </b>${email}</p>
      ${addressLine ? `<p><b>Address Line: </b>${addressLine}</p>` : ""}
      ${addressCity ? `<p><b>City: </b>${addressCity}</p>` : ""}
      ${addressState ? `<p><b>State: </b>${addressState}</p>` : ""}
      <p><b>Message: </b>${message}</p>
    </div>
  </div>`;
  const sourceEmail = process.env.SOURCE_EMAIL;

  const params = {
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: { Data: "[All About Wood Services] - New Quote" },
    },
    Source: sourceEmail,
  };

  let statusReceived;
  try {
    await ses.sendEmail(params).promise();
    statusReceived = status.SUCCESS;
  } catch (err) {
    console.error(err);
    statusReceived = status.FAILED;
  }

  return { ...input, status: statusReceived };
};

module.exports = {
  createQuote,
};
