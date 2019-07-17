export interface Produto {
    id: number
    nome: string
    descricao: string
    valor: number
    categoria: Array<string>
    complemento?: string
    data: Date
    loja: string
    tamanho: string
    estoque: number
    observacoes: string
    imagens: Array<string>
}