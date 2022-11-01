import { Body, Controller, Post } from '@nestjs/common';
import {CriarJogadorDto} from '../dto/criar-jogador.dto'

@Controller('api/vi/jogadores')
export class JogadoresController {

    @Post()
    async criarAtualizarJogador(
        @Body() CriarJogadorDto: CriarJogadorDto){ // extrai um objeto que é do tipo criarJogador
        const {email} = CriarJogadorDto
        return JSON.stringify(`{
            "email": ${email}
        }`)
    }

}
