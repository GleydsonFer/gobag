export class Produto {
    public id: number
    public nome: string
    public descricao: string
    public valor: number
    public categoria: Array<string>
    public complemento?: string
    public data: Date
    public destaque: boolean
    public loja: string
    public imagens: Array<string>
}