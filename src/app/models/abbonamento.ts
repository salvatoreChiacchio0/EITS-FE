import { Palestra } from "./palestra";
import { User } from "./user";

export class Abbonamento{
    id: number;
    nome: string;
    costo: number;
    dataInizio: string;
    dataFine: string;
    idUtente: User;
    palestra:Palestra;
    pagato:boolean;
}