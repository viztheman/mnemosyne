import express from 'express';
import helmet from 'helmet';

const app = express();
app.use(helmet());

import categoriesApi from './controllers/api/categories';
import forumsApi from './controllers/api/forums';
import subforumsApi from './controllers/api/subforums';
app.use('/api/categories', categoriesApi);
app.use('/api/forums', forumsApi);
app.use('/api/subforums', subforumsApi);

// ** Debug
import usersApi from './controllers/api/users';
app.use('/api/users', usersApi);

function run(port: number): void {
	app.listen(port, () => console.log(`Mnemosyne running on port ${port}`));
}

export default {run};
