import autoIncrement from 'mongoose-auto-increment';
import env from './env';
import mongoose from 'mongoose';
import server from './server';

(async () => {
    try {
        await mongoose.connect(env.MONGO);

        server.run(env.PORT);
    }
    catch (err) {
        console.error(err);
        process.exit(1);
    }
})();