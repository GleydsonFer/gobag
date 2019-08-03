export class Usuario {
    constructor(
        public email: string,
        public nome_completo: string,
        public nome_usuario: string,
        public senha: string,
        public endereco: string,
        public numero: string,
        public complemento: string,
        public data_nascimento: string,
        public celular:string,
        public bairro:string,
        public cpf?: string,
        public foto_perfil?: any
    ) {}
}