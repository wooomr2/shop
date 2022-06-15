const allowedOrigins = [
  'http://127.0.0.1:8000',
  'http://localhost:4000',
  'http://localhost:4001',
  'http://localhost:3000',
  'http://localhost:3001',
];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;