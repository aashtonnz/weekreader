const DEFAULT_ERROR_MSG = "Internal server error";

const errorMsg = (msg) => {
  return { error: msg || DEFAULT_ERROR_MSG };
};

const successMsg = (msg) => ({ success: msg });

module.exports = { errorMsg, successMsg };
