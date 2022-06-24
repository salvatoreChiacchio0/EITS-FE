import { Abbonamento } from "./abbonamento";
import { Sensore } from "./sensore";

export class Palestra{
    id:number;
    nome:string;
    indirizzo:string;
    latitudine:number;
    longitudine:number;
    sensore?:Sensore;
    abbonamenti?:Abbonamento[];
    abilitato?:Boolean;
}