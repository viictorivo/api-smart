import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CriarCategoriaDto } from '../dto/criar-categoria.dto';
import { Categoria } from '../Interfaces/categoria.interface';

@Injectable()
export class CategoriasService {
    
    constructor(
        @InjectModel('Categoria') private readonly categoriaModel: Model<Categoria>
    ){}

    async criarCategoriaDto(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria>{

        const { categoria } = criarCategoriaDto

        const categoriaEncontrada = await this.categoriaModel.findOne({categoria}).exec();

        if(categoriaEncontrada){
            throw new BadRequestException(`Categoria ${categoria} já cadastrada`)
        }

        const categoriaCriada = new this.categoriaModel(criarCategoriaDto)
        return await categoriaCriada.save();

    }
}
