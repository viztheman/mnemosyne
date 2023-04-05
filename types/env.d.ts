interface IEnv {
    PORT: number;
    MONGO: string;
    JWT_SECRET: string;
}
declare const env: IEnv;
export default env;
