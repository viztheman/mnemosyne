import dotenv from 'dotenv';
dotenv.config();

interface IEnv {
	PORT: number;
	MONGO: string;
	JWT_SECRET: string;
}

const env: IEnv = {
	PORT: parseInt(process.env.PORT || ''),
	MONGO: process.env.MONGO || '',
	JWT_SECRET: process.env.JWT_SECRET || ''
};

function terminate(name: string): void {
	console.error(`${name} is a required environment variable.`);
	process.exit(1);
}

if (!env.PORT) terminate('PORT');
if (!env.MONGO) terminate('MONGO');
if (!env.JWT_SECRET) terminate('JWT_SECRET');

export default env;
