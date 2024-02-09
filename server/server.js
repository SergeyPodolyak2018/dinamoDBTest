import app from './app.js';
import constant from './const.js';

app.listen(constant.PORT, () =>
  console.log(
    `App is running on port ${constant.PORT}, base path is ${constant.BASE_URI}`
  )
);
