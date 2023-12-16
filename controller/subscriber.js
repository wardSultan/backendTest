const axios = require("axios");

// Function to authenticate and obtain authentication information
async function authenticateUser() {
  try {
    const loginResponse = await axios.post(
      "http://178.16.142.186/mobile/login/send",
      {
        msisdn: "96311222333",
      }
    );

    // Extract authentication information (cookies, tokens, etc.) from login response
    const authenticationInfo = loginResponse.headers["set-cookie"];

    return authenticationInfo;
  } catch (error) {
    console.error("Authentication failed:", error.message);
    throw error;
  }
}

// Function to make the second request with authentication
async function makeSecondRequest(authenticationInfo, body) {
  try {
    const secondResponse = await axios.post(
      "http://178.16.142.186/mobile/subs/addSubscriberInfo",
      {
        body,
      },
      {
        headers: {
          Cookie: authenticationInfo,
        },
      }
    );
  } catch (error) {
    console.error("Second request failed:", error.message);
    throw error;
  }
}

exports.creatSubscriber = async (req, res, next) => {
  try {
    const body = req.body;
    const authenticationInfo = await authenticateUser();
    await makeSecondRequest(authenticationInfo, body);
  } catch (error) {
    console.error("Process failed:", error.message);
    next(error);
  }
};
