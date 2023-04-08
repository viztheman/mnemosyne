export declare const BAD_ID = "Invalid ID.";
export declare const NOT_FOUND = "Entity not found.";
export declare const ALL_REQUIRED = "All fields are required.";
export declare const SOME_REQUIRED = "One or more fields are required.";
export declare const INVALID = "One or more fields are invalid.";
export declare const SERVER_ERROR = "Server error. Please try again later.";
export interface IError {
    statusCode: number;
    message: string;
}
export default class Error implements IError {
    statusCode: number;
    message: string;
    constructor(statusCode: number, message: string);
}
