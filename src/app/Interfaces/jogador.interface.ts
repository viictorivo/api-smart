//import { Document } from "mongoose";

export interface Jogador {
    readonly phoneNumber: string;
    readonly email: string;
    name: string;
    ranking: string;
    rankingPosition: number;
    urlFotoJogador: String;
}