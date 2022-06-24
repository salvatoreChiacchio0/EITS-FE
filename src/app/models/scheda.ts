import { Esercizio } from "./esercizi";
import { User } from "./user";

export class Scheda{
    id:number;
    utente:User;
    dataFine:Date;
    dataInizio:Date;
    esercizi:Esercizio[];
    nome:string
}