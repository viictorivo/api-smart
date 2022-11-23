import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import {Jogador} from '../Interfaces/jogador.interface'
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>){}

    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{

        const {email} = criarJogadorDto;
        //const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();

        if (jogadorEncontrado){
            await this.atualizar(criarJogadorDto);
        } else {
            this.criar(criarJogadorDto);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        //return this.jogadores;

        return await this.jogadorModel.find().exec()
    }

    async consultarPorEmail(email: String): Promise<Jogador> {
        const jogadorEncontrado = await this.jogadorModel.findOne({email}).exec();
        if(!jogadorEncontrado){
            throw new NotFoundException ('Jogador com e-mail ' + email + ' não encontrado')
        } 

        return jogadorEncontrado;
        
    }


    async deletar(email): Promise<any>{
        // const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        // if(!jogadorEncontrado){
        //     throw new NotFoundException ('Jogador com e-mail ' + email + ' não encontrado')
        // } 
        // this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);

        return await this.jogadorModel.remove({email}).exec();
    }

    private async criar (criarJogadorDto: CriarJogadorDto): Promise<Jogador> {
        
        const jogadorCriado = new this.jogadorModel(criarJogadorDto)
        return await jogadorCriado.save()
        /*
        const {name, email, phoneNumber } = criarJogadorDto;

        const jogador: Jogador ={
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        };
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador); */
    }

    private async atualizar(criarJogadorDto: CriarJogadorDto ): Promise<Jogador> {
        
        return await this.jogadorModel.findOneAndUpdate({email: criarJogadorDto},
             {$set: criarJogadorDto}).exec()
        // const {name } = criarJogadorDto;
        // jogadorEncontrado.name = name;
    }

}

