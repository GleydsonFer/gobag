export interface Produto {
    id_produto: number
    nome: string
    descricao: string
    valor: number
    categoria: Array<string>
    data?: Date
    loja: string
    tamanho: string
    estoque: number
    observacoes?: string
    imagens: Array<any>
}