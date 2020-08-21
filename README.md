# Weekreader

RSS – mailed to you

Weekreader is configured to run on [Heroku](https://heroku.com/) and uses:

- [Node.js](https://nodejs.org/en/)
- [Express](http://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mailgun](https://www.mailgun.com/)
- [Amazon S3](https://aws.amazon.com/s3/) (via [Heroku Bucketeer](https://elements.heroku.com/addons/bucketeer))

The UI uses:

- [React](https://reactjs.org/)
- [React Redux](https://react-redux.js.org/)
- [Styled Components](https://styled-components.com/)

## Installation

To install Weekreader:

```
npm install --prefix ui && npm install
```

## Environment Variables

- `MONGO_URI`
- `JWT_SECRET`
- `BUCKETEER_BUCKET_NAME`
- `BUCKETEER_AWS_SECRET_ACCESS_KEY`
- `BUCKETEER_AWS_ACCESS_KEY_ID`
- `MAILGUN_API_KEY`
- `MAILGUN_DOMAIN`
- `HOST_URL`

## Usage

To start the UI and the server:

```
npm run dev
```

The UI build is automated when pushed to Heroku (via the `heroku-postbuild` script).

## License

[MIT](https://choosealicense.com/licenses/mit/)
