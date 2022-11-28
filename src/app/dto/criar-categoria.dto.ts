import { ArrayMinSize, IsArray, IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { Evento } from '../Interfaces/categoria.interface';

export class CriarCategoriaDto{

    @IsString()
    @IsNotEmpty()
    readonly categoria: string;

    @IsString()
    @IsNotEmpty()
    readonly descricao: string;
    
    @IsArray()
    @ArrayMinSize(1)
    eventos: Array<Evento>
}