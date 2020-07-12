require("dotenv").config();
const moment = require("moment");
const styles = require("./styles");

const FILE_URL = `https://${process.env.BUCKETEER_BUCKET_NAME}.s3.amazonaws.com/`;
const MAX_NUM_ARTICLES = 3;
const MAX_DESC_CHARS = 200;
const hostName = process.env.HOST_URL;

const escapeHtml = (unsafe) => {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const truncateDesc = (string) =>
  string.length <= MAX_DESC_CHARS
    ? string
    : string.substring(0, MAX_DESC_CHARS).trimEnd() + "...";

const filterSubs = (subs, prevArticlesUpdatedAt) => {
  const filteredSubs = subs
    .filter((sub) => sub.isSubscribed)
    .map((sub) => {
      const articles = sub.articles.filter(
        (article) =>
          !article.hidden &&
          !article.archived &&
          (!prevArticlesUpdatedAt ||
            moment(prevArticlesUpdatedAt).isBefore(article.publishedAt))
      );
      sub.articles = articles;
      return sub;
    })
    .filter((sub) => sub.articles.length);
  return filteredSubs;
};

const inbox = (subs, prevArticlesUpdatedAt, unsubToken) => `
  <html>
    <body style="${styles.body}">
      <a style="${styles.appHeader}" href="${hostName}">
        <div>
          <img src="${hostName}/logo64.png" style="${styles.appImg}">
        </div>
        <div style="${styles.appTitle}">Open inbox</div>
      </a>
      ${filterSubs(subs, prevArticlesUpdatedAt)
        .map(
          (sub) => `
          <div style="${styles.subWrapper}">
            <div style="${styles.subTitleWrapper}">
              <a style="${styles.header}" href="${sub.link}" target="_blank">
                <img style="${styles.subImg}" src="${
            FILE_URL + sub.imgKey
          }" alt="" />
                ${sub.title}
                <div style="${styles.numArticles}">${sub.articles.length}</div>
              </a>
            </div>
            <div style="${styles.articles}">
              ${sub.articles
                .slice(0, MAX_NUM_ARTICLES)
                .map(
                  (article) => `
                  <a style="${styles.articleWrapper}" href="${
                    article.link
                  }" target="_blank">
                    <div style="${styles.articleTitle}">
                      ${article.title}
                      <span style="${styles.publishedAt}">
                        ${moment(article.publishedAt).format("MMM D")}
                      </span>
                    </div>
                    ${
                      sub.descriptionsHidden || !article.description
                        ? ""
                        : `
                      <div style="${styles.description}">
                        ${truncateDesc(escapeHtml(article.description))}
                      </div>`
                    }
                  </a>
                `
                )
                .join("")}
            </div>
            <a style="${styles.viewAll}" href="${hostName}">View in app</a>
          </div>
          `
        )
        .join("")}
        <a style="${
          styles.unsub
        }" href="${hostName}/unsubscribe/${unsubToken}">Unsubscribe</a>
      <a style="${
        styles.footer
      }" href="">© Weekreader ${moment().year()}. Icon made by Freepik from www.flaticon.com.</a>
    </body>
  </html>`;

const confirm = (token) => `
    <html>
      <body style="${styles.body}">
        <a style="${styles.appHeader}" href="${hostName}">
          <div>
            <img src="${hostName}/logo64.png" style="${styles.appImg}">
          </div>
          <div style="${styles.appTitle}">Weekreader</div>
        </a>
        <a style="${styles.button}" href="${hostName}/confirm/${token}">
          <div style="${styles.buttonText}">Confirm subscription</div>
        </a>
        <a style="${
          styles.footer
        }" href="">© Weekreader ${moment().year()}. Icon made by Freepik from www.flaticon.com.</a>
      </body>
    </html>`;

const passwordReset = (token) => `
    <html>
      <body style="${styles.body}">
        <a style="${styles.appHeader}" href="${hostName}">
          <div>
            <img src="${hostName}/logo64.png" style="${styles.appImg}">
          </div>
          <div style="${styles.appTitle}">Weekreader</div>
        </a>
        <a style="${styles.button}" href="${hostName}/reset-password/${token}">
          <div style="${styles.buttonText}">Reset password</div>
        </a>
        <a style="${
          styles.footer
        }" href="">© Weekreader ${moment().year()}. Icon made by Freepik from www.flaticon.com.</a>
      </body>
    </html>`;

module.exports = {
  inbox,
  confirm,
  passwordReset,
};
