/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsPositive, Min } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "../../categoria/entities/categoria.entity";

@Entity({name: "tb_produtos"})
export class Produto {

    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({ length:300, nullable:false})
    nome_produto: string

    @IsNotEmpty()
    @Column({ length:300, nullable:false})
    plataforma: string
    
    @IsNumber()
  @IsPositive()
  @Column({ type: "decimal", precision: 6, scale: 2, nullable: false })
  preco: number

   @IsNumber()
  @Min(0)
  @Column({ type: "int", nullable: false })
  estoque: number

  @ManyToOne(() => Categoria, (categoria) => categoria.produto,{
    onDelete: "CASCADE"
  })
  categoria: Categoria
}