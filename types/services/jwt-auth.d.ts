declare function jwtAuth(email: string, password: string): Promise<string | null>;
export default jwtAuth;
