class ItemCarrinho {
    constructor(
        public id: string,
        public img: string,
        public titulo: string,
        public descricao: string,
        public valor: number,
        public quantidade: number
    ) { }
}

export { ItemCarrinho }