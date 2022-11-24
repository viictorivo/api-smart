import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import {AtualizarJogadorDto} from '../dto/atualizar-jogador.dto'
import { JogadoresService } from '../Services/jogadores.service';
import {Jogador} from '../Interfaces/jogador.interface'
import{JogadoresValidacaoParametrosPipe} from '../pipes/jogadores-validacao-parametros.pipe'
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async criarJogador(
        @Body() criarJogadorDto: CriarJogadorDto): Promise<Jogador>{ // extrai um objeto que é do tipo criarJogador
            return await this.jogadoresService.criarJogador(criarJogadorDto)
    }

    @Put('/:_id')
    @UsePipes(ValidationPipe)
    async atualizarJogador(
        @Body() atualizarJogadorDto: AtualizarJogadorDto,
        @Param('_id', JogadoresValidacaoParametrosPipe) _id:string): Promise<void>{ // extrai um objeto que é do tipo criarJogador
            await this.jogadoresService.atualizarJogador(atualizarJogadorDto, _id)
    }

    @Get()
    async consultarJogadores(): Promise<Jogador[]>{
                return await this.jogadoresService.consultarTodosJogadores();          
    }

    @Get('/:_id')
    async consultarJogadoresPorId(
        @Param('_id', JogadoresValidacaoParametrosPipe) id: String): Promise<Jogador>{       
                return await this.jogadoresService.consultarPeloId(id);
    }

    @Delete('/:_id')
    async deletarJogadores(
        @Param('_id', JogadoresValidacaoParametrosPipe) _id: String): Promise<void>{
        return await this.jogadoresService.deletar(_id);
    }

}
