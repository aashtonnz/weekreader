require("dotenv").config();
const moment = require("moment");
const styles = require("./styles");

const FILE_URL = `https://${process.env.BUCKETEER_BUCKET_NAME}.s3.amazonaws.com/`;
const hostName = process.env.HOST_URL;

const MAX_NUM_ARTICLES = 3;
const MAX_DESC_CHARS = 200;

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

const filterSubs = (subs) => {
  const filteredSubs = subs
    .map((sub) => {
      const articles = sub.articles.filter(
        (article) => !article.hidden && !article.archived
      );
      sub.articles = articles;
      return sub;
    })
    .filter((sub) => sub.articles.length);
  return filteredSubs;
};

const subsToHtml = (subs) => `
  <html>
    <body style="${styles.body}">
      <a style="${styles.appHeader}" href="${hostName}">
        <div>
          <img src="${hostName}/logo128.png" style="${styles.appImg}">
        </div>
        <div style="${styles.appTitle}">${moment().utc().format("MMMM D")}</div>
      </a>
      <a style="${styles.openInbox}" href="${hostName}">Open inbox</a>
      ${filterSubs(subs)
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
                      !article.description
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
            <a style="${styles.viewAll}" href="${hostName}">${
            sub.articles.length <= MAX_NUM_ARTICLES
              ? "View in app"
              : "View all " + sub.articles.length
          }
            </a>
          </div>
          `
        )
        .join("")}
      <a style="${styles.unsub}" href="%unsubscribe_url%">Unsubscribe</a>
      <a style="${
        styles.footer
      }" href="">© Weekreader ${moment().year()}. Icon made by Freepik from www.flaticon.com.</a>
    </body>
  </html>`;

module.exports = {
  subsToHtml,
};
