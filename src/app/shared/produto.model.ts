export class Produto {
    id_produto: string;
    nome: string;
    nome_insensitive: string;
    descricao: string;
    valor: number;
    categoria: Array<string>;
    data?: Date;
    loja: string;
    tamanho: string;
    estoque: number;
    observacoes?: string;
    imagens: Array<string>;
}