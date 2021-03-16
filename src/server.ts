import * as sapper from '@sapper/server';
import axios from 'axios';
import { json } from 'body-parser';
import compression from 'compression';
import session from 'express-session';
import polka from 'polka';
import sessionFileStore from 'session-file-store';
import sirv from 'sirv';

axios.defaults.baseURL = 'http://localhost:3001/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === 'development';
const FileStore = new sessionFileStore(session);

polka() // You can also use Express
  .use(
    json(),
    session({
      secret: 'SomeSecretStringThatIsNotInGithub',
      resave: true,
      saveUninitialized: true,
      cookie: {
        maxAge: 31536000
      },
      store: new FileStore({
        path: `.sessions`
      })
    }),
    compression({ threshold: 0 }),
    sirv('static', { dev }),
    sapper.middleware({
      session: (req, res) => {
        return ({
          user: req.session.user
        })
      }
    })
  )
  .listen(PORT, err => {
    if (err) console.log('error', err);
  });

// app.use((req, res, next) => {
//   res.locals.cspNonce = crypto.randomBytes(16).toString("hex");
//   next();
// });

// app.use(helmet({
//   contentSecurityPolicy: {
//     directives: {
//       defaultSrc: ["'self'"],
//       styleSrc: ["'self'", 'cdn.jsdelivr.net https:'],
//       scriptSrc: ["'self'", "'unsafe-inline'", (req, res) => `'nonce-${res.locals.cspNonce}'`],
//     }
//   }
// }));
