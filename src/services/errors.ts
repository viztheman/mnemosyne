export const BAD_ID = 'Invalid ID.';
export const NOT_FOUND = 'Entity not found.';
export const ALL_REQUIRED = 'All fields are required.';
export const SOME_REQUIRED = 'One or more fields are required.';
export const INVALID = 'One or more fields are invalid.';
export const SERVER_ERROR = 'Server error. Please try again later.';

export interface IError {
    statusCode: number;
    message: string;
}

export default class Error implements IError {
    public statusCode = 0;
    public message = '';

    constructor(statusCode: number, message: string) {
        this.statusCode = statusCode;
        this.message = message;
    }
}