export class Produto {
    public id: number
    public titulo: string
    public categoria: Array<string>
    public complemento?: string
    public data: Date
    public descricao: string
    public destaque: boolean
    public loja: string
    public valor: number
    public imagens: Array<string>
}