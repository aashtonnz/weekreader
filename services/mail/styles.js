const subWrapper = `
  width: 100%;
  margin: 1.4rem 0;
  background: #fff;
`;

const subTitleWrapper = `
  display: flex;
  align-items: center;
  padding: 0.4rem 0.2rem 0.4rem 0;
  background: #fff;
  width: 100%;
`;

const header = `
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #333;
  max-width: max-content;
  margin-right: 1rem;
  font-weight: 700;
`;

const subImg = `
  margin-right: 0.5rem;
  height: 1.1rem;
  max-width: 75px;
`;

const numArticles = `
  margin-left: 0.4rem;
  font-weight: 400;
  color: #aaa;
`;

const appImg = `
  height: 2rem;
`;

const noArticles = `
  color: #ddd;
  padding-top: 0.4rem;
  padding-left: 1.2rem;
  border-top: 1px solid #f3f3f3;
  text-align: left;
`;

const articles = `
  width: 100%;
`;

const articleWrapper = `
  display: block;
  text-decoration: none;
  padding: 0.6rem 0;
  background: #fff;
  padding-left: 0.3rem;
  color: #333;
  border-top: 1px solid #f3f3f3;
`;

const articleTitle = `
  display: block;
  text-decoration: none;
  flex-grow: 1;
  text-align: left;
`;

const publishedAt = `
  margin-left: 0.5rem;
  color: #aaa;
  white-space: nowrap;
`;

const description = `
  margin: 0.3rem 1.2rem 0 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #666;
  text-align: left;
`;

const appTitle = `
  text-decoration: none;
  align-items: center;
  color: #055FD2;
  font-weight: 700;
`;

const appHeader = `
  display: block;
  text-decoration: none;
`;

const body = `
  text-align: center;
  margin: 1rem auto;
  line-height: 1.5;
  font-family: Arial,Helvetica, san-serif;
  background: #fff;
  color: #333;
  max-width: 600px;
  font-size: 11.5px;
`;

const footer = `
  color: #aaa;
  padding: 0.2rem;
  text-align: center;
  text-decoration: none;
  display: block;
`;

const contact = `
  color: #055FD2;
  padding: 0.2rem;
  text-align: center;
  text-decoration: none;
  display: block;
  max-width: min-content;
  margin: 0 auto;
  margin-top: 3.6rem;
`;

const unsub = `
  color: #aaa;
  padding: 0.2rem;
  text-align: center;
  text-decoration: none;
  display: block;
  max-width: min-content;
  margin: 0 auto;
`;

const viewAll = `
  text-decoration: none;
  padding: 0rem 1rem 1.4rem 0.6rem;
  color: #055FD2;
  float: left;
`;

const button = `
  padding: 0 0.8rem;
  color: #fff;
  border: none;
  border-radius: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #055FD2;
  text-decoration: none;
  width: max-content;
  text-align: center;
  margin: 3.6rem auto;
`;

const buttonText = `
  padding: 0.25rem 0 0.25rem 0;
`;

module.exports = {
  subWrapper,
  subTitleWrapper,
  header,
  subImg,
  numArticles,
  noArticles,
  articles,
  articleWrapper,
  articleTitle,
  publishedAt,
  description,
  appTitle,
  appHeader,
  body,
  footer,
  unsub,
  viewAll,
  appImg,
  button,
  buttonText,
  contact,
};
