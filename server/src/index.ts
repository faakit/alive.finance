import assert from 'assert';
import dotenv from 'dotenv';

dotenv.config();

import app from './main/app';

assert.equal(process.env.TZ, 'utc');

app.listen(process.env.PORT || 3001, () => {
  console.log('Server Running...');
});
