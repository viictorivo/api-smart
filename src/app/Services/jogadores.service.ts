import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { UUIDV4 } from 'sequelize/types';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import {Jogador} from '../Interfaces/jogador.interface'
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{

        const {email} = criarJogadorDto;
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)

        if (jogadorEncontrado){
            return this.atualizar(jogadorEncontrado, criarJogadorDto);
        } else {
            this.criar(criarJogadorDto);
        }

    }

    async consultarTodosJogadores(): Promise<Jogador[]> {
        return this.jogadores;
    }

    async consultarPorEmail(email: String): Promise<Jogador> {
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException ('Jogador com e-mail ' + email + ' não encontrado')
        } 

        return jogadorEncontrado;
        
    }


    async deletar(email: String){
        const jogadorEncontrado = this.jogadores.find(jogador => jogador.email === email)
        if(!jogadorEncontrado){
            throw new NotFoundException ('Jogador com e-mail ' + email + ' não encontrado')
        } 
        this.jogadores = this.jogadores.filter(jogador => jogador.email !== jogadorEncontrado.email);
    }

    private criar (criarJogadorDto: CriarJogadorDto): void {
        const {name, email, phoneNumber } = criarJogadorDto;

        const jogador: Jogador ={
            _id: uuidv4(),
            name,
            phoneNumber,
            email,
            ranking: 'A',
            rankingPosition: 1,
            urlFotoJogador: 'www.google.com.br/foto123.jpg'
        };
        this.logger.log(`criaJogadorDto: ${JSON.stringify(jogador)}`)
        this.jogadores.push(jogador);
    }

    private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto ): void {
        const {name } = criarJogadorDto;

        jogadorEncontrado.name = name;
    }

}

