export class Usuario {
    constructor(
        public email: string,
        public nome_completo: string,
        public nome_usuario: string,
        public senha: string,
        public endereco = {
            numero: 0,
            logradouro: '',
            bairro: '',
            cep: '',
            complemento: ''
        },
        public complemento: string,
        public cpf: string
        
        
    ) {}
}