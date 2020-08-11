const moment = require("moment");

const DEFAULT_ERROR_MSG = "Internal server error";

const errorMsg = (msg) => {
  return { error: msg || DEFAULT_ERROR_MSG };
};

const successMsg = (msg) => ({ success: msg });

const isUpdateTime = (updateHour, updateDays) => {
  const minDiff = moment()
    .utc()
    .diff(moment().utc().hour(updateHour).minute(0), "minute");
  return (
    -30 < minDiff && minDiff < 30 && updateDays.includes(moment().utc().day())
  );
};

module.exports = { errorMsg, successMsg, isUpdateTime };
