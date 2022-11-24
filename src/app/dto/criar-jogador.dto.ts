import { IsEmail, IsNotEmpty } from 'class-validator'

export class CriarJogadorDto{

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsEmail()
    readonly email: string;
    
    readonly name: string;
}