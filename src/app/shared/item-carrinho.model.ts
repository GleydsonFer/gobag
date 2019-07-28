class ItemCarrinho {
    constructor(
        public id_produto: string,
        public imagem: string,
        public nome: string,
        public descricao: string,
        public anunciante: string,
        public valor: number,
        public quantidade: number
    ) { }
}

export { ItemCarrinho }