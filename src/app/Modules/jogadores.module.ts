import { Module } from '@nestjs/common';
import { JogadoresService } from 'src/app/Services/jogadores.service';
import { JogadoresController } from '../Controllers/jogadores.controller';

@Module({
  controllers: [JogadoresController],
  providers:[JogadoresService]
})
export class JogadoresModule {}
