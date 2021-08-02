export interface IErrorMetadata {
    code: number;
    error: string;
    stackTrace?: string;
    type?: 'inputValidation' | 'logic' | 'authorization';
}
