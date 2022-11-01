import { Module } from '@nestjs/common';
import { JogadoresModule } from './app/Modules/jogadores.module';
import { JogadoresController } from './app/Controllers/jogadores.controller';
import { JogadoresService } from './jogadores/jogadores.service';

@Module({
  imports: [JogadoresModule],
  controllers: [JogadoresController],
  providers: [JogadoresService],
})
export class AppModule {}
