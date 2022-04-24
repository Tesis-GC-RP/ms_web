export interface ResponseDTO<T> {
    errorCode: number,
    errorMessage: string,
    httpCode : number,
    data: T
}