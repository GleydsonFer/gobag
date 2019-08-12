export class Usuario {
    constructor(
        public nome: string,
        public sobrenome: string,
        public data_nascimento: string,
        public celular:string,
        public email:string,
        public cep:string,
        public endereco: string,
        public numero: string,
        public complemento: string,
        public bairro:string,
        public cidade:string,
        public estado:string,
        public senha: string,
        public cpf?: string,
        public foto_perfil?: any
    ) {}
}