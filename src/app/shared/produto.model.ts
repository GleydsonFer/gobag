export class Produto {
    id_produto: string;
    nome: string;
    nome_insensitive: string;
    descricao: string;
    valor: number;
    categoria: Array<string>;
    data: Date;
    loja: string;
    promocao: boolean;
    tamanho: {
        PP: number,
        P: number,
        M: number,
        G: number,
        GG: number,
    };
    observacoes?: string;
    imagens: Array<string>;
}