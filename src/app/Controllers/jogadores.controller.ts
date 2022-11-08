import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import { JogadoresService } from '../Services/jogadores.service';
import {Jogador} from '../Interfaces/jogador.interface'
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async criarAtualizarJogador(
        @Body() CriarJogadorDto: CriarJogadorDto){ // extrai um objeto que é do tipo criarJogador
            await this.jogadoresService.criarAtualizarJogador(CriarJogadorDto)
    }

    @Get()
    async consultarJogadores(
        @Query('email')email: String): Promise<Jogador[] | Jogador>{
            if(email){
                return await this.jogadoresService.consultarPorEmail(email);
            } else {
                return await this.jogadoresService.consultarTodosJogadores();
            }
    }

    @Delete()
    async deletarJogadores(
        @Query('email')email: String): Promise<void>{
        return await this.jogadoresService.deletar(email);
    }

}
