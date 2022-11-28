import { Module } from '@nestjs/common';
import { JogadoresModule } from './app/Modules/jogadores.module';
import { JogadoresController } from './app/Controllers/jogadores.controller';
import { JogadoresService } from 'src/app/Services/jogadores.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriasModule } from './categorias/categorias.module';
import { CategoriasController } from './categorias/categorias.controller';
import { CategoriasService } from './categorias/categorias.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ivovict:potter93@cluster0.pqpp75c.mongodb.net/test',
    { useNewUrlParser: true, 
      useUnifiedTopology: true,}),
    JogadoresModule,
    CategoriasModule],
  controllers: [CategoriasController],
  providers: [CategoriasService]
})
export class AppModule {}
