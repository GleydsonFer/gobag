export class Lojista{
    email: string;
    cnpj: string;
    endereco: {
        logradouro: string,
        numero: number,
        complemento?: string
    };
    telefone: string;
}