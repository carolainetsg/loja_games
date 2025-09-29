/* eslint-disable prettier/prettier */
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from './../services/produto.service';
import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";

@Controller("/produtos")
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Produto[]>{
        return this.produtoService.findAll();
    }
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id:number): Promise<Produto>{
        return this.produtoService.findById(id);
    }
    @Get('/nome_produto/:nome_produto')
    @HttpCode(HttpStatus.OK)
    findByAllNome_produto(@Param('nome_produto')nome_produto:string): Promise<Produto[]>{
        return this.produtoService.findAllByNome_produto(nome_produto);
    }

    @Get('/plataforma/:plataforma')
    @HttpCode(HttpStatus.OK)
    findByAllPlataforma(@Param('plataforma')plataforma:string): Promise<Produto[]>{
        return this.produtoService.findAllByPlataforma(plataforma);
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.create(produto);
    }
    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() produto: Produto): Promise<Produto>{
        return this.produtoService.update(produto);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number){
        return this.produtoService.delete(id);
    }
}