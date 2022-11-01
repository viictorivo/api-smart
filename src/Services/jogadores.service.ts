import { Injectable, Logger } from '@nestjs/common';
import { UUIDV4 } from 'sequelize/types';
import {CriarJogadorDto} from '../app/dto/criar-jogador.dto'
import {Jogador} from '../app/Interfaces/jogador.interface'
import {v4 as uuidv4} from 'uuid'

@Injectable()
export class JogadoresService {

    private jogadores: Jogador[] = [];
    private readonly logger = new Logger(JogadoresService.name)

    async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void>{

        this.logger.log(`criaJogadorDto: ${criarJogadorDto}`)
        this.criar(criarJogadorDto);

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
        this.jogadores.push(jogador);
    }
}

