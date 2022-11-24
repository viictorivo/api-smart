import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import {AtualizarJogadorDto} from '../dto/atualizar-jogador.dto'
import {Jogador} from '../Interfaces/jogador.interface'
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name)

    async criarJogador(criarJogadorDto: CriarJogadorDto): Promise<Jogador>{

        const {email} = criarJogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado){
            throw new BadRequestException("Jogador já existente");
        } 

        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()
    }

    async atualizarJogador(atualizarJogadorDto: AtualizarJogadorDto, _id: String): Promise<void>{

        const jogadorEncontrado = await this.jogadorModel.findOne({_id}).exec();

        if (jogadorEncontrado){
            await this.jogadorModel.findOneAndUpdate({_id},
                {$set: atualizarJogadorDto}).exec()
        } else {
            throw new NotFoundException ('Jogador com id ' + _id + ' não encontrado')
        }
    }

    async consultarTodosJogadores(): Promise<Jogador[]> {

        return await this.jogadorModel.find().exec()
    }

    async consultarPeloId(id: String): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();
        if(!jogadorEncontrado){
            throw new NotFoundException ('Jogador com id ' + id + ' não encontrado')
        } 

        return jogadorEncontrado;       
    }

    async deletar(id: String): Promise<any>{

        const jogadorEncontrado = await this.jogadorModel.findOne({id}).exec();
        if(!jogadorEncontrado){
            throw new NotFoundException ('Jogador com id ' + id + ' não encontrado')
        } 

        return await this.jogadorModel.deleteOne({id}).exec();
    }

}

