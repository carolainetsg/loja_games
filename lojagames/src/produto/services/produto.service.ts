/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoriaService } from "../../categoria/services/categoria.service";

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>,
        private categoriaService: CategoriaService
    ) { }
    async findAll (): Promise<Produto[]>{
        return await this.produtoRepository.find();
    }

    async findById (id:number): Promise<Produto>{
        const produto = await this.produtoRepository.findOne({
            where: {
                id
            }
        });
        if(!produto)
            throw new HttpException('Produto não encontrado!', HttpStatus.NOT_FOUND);
        return produto;
    }
    async findAllByNome_produto(nome_produto: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                nome_produto: ILike(`%${nome_produto}%`)
            }
        })
    }

    async findAllByPlataforma(plataforma: string): Promise<Produto[]>{
        return await this.produtoRepository.find({
            where:{
                plataforma: ILike(`%${plataforma}%`)
            }
        })
    }
    async create(produto: Produto): Promise<Produto>{
        await this.categoriaService.findById(produto.categoria.id)
        return await this.produtoRepository.save(produto);
    }
    async update(produto: Produto): Promise<Produto>{
        await this.findById(produto.id)
        await this.categoriaService.findById(produto.categoria.id)
        return await this.produtoRepository.save(produto);
    }
    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)
    return await this.produtoRepository.delete(id)
    }
    
}