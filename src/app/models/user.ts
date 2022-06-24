import { Role } from "../enum/role";

export class User {
    id: number;
    email: string;
    password: string;
    nome: string;
    cognome: string;
    token?: string;
    role: Role;
    authorities:any[];
    abbonamenti:any[]

}