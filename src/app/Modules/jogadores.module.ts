import { Module } from '@nestjs/common';
import { JogadoresService } from 'src/app/Services/jogadores.service';
import { JogadoresController } from '../Controllers/jogadores.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { JogadorSchema } from '../Interfaces/schema.interface';

@Module({
  imports:[MongooseModule.forFeature([{name: 'Jogador', schema: JogadorSchema}])],
  controllers: [JogadoresController],
  providers:[JogadoresService]
})
export class JogadoresModule {}
