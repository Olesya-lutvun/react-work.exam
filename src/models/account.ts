export interface IAccountModel {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    gender: 'female' | 'male';
    image: string;
}