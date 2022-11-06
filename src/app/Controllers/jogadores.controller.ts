import { Body, Controller, Post } from '@nestjs/common';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'
import { JogadoresService } from '../Services/jogadores.service';
@Controller('api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async criarAtualizarJogador(
        @Body() CriarJogadorDto: CriarJogadorDto){ // extrai um objeto que é do tipo criarJogador
            await this.jogadoresService.criarAtualizarJogador(CriarJogadorDto)
    }

}
