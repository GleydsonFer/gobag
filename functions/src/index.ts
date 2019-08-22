// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// Modulos do Firebase
const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// PAGARME
const pagarme = require('pagarme');
const api_key_teste = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';
// Modulo que soluciona o problema segurança em requisições http para dominios diferentes
const cors = require('cors')({
    origin: true,
});
const CircularJSON = require('circular-json');

// Função de teste
export const helloWorldVictor = functions.https.onRequest((request: any, response: any) => {
    return cors(request, response, () => {
        response.send("Hello from Firebase!");
    })
});

// Mostrar as transações realizadas
export const mostrarTransferencias = functions.https.onRequest((request: any, response: any) => {
    return cors(request, response, () => {
        pagarme.client.connect({ api_key: api_key_teste })
            .then((client: any) => client.transactions.all())
            .then((transactions: any) => {
                console.log(transactions);
                response.send(transactions);
            })
            .catch((error: any) => {
                console.log('Ocorreu um erro em mostrarTranferencias');
                response.status(500).send(error)
            })
    })
});

// Iniciar tranferência com cartão de crédito
export const iniciarTranferencia = functions.https.onRequest((request: any, response: any) => {
    // É utilizado CORS (Cross-Origin Resource Sharing) que permite navegar por urls com domínios diferentes do nosso
    return cors(request, response, () => {

        // os dados de pagamento enviados no corpo da requisição http são recuperados através do request.body 
        // CircularJSON Serializa e desserializa objetos JSON transformando referências circulares para um formato JSON especializado.
        // O método stringify() converte valores em javascript para uma String  JSON
        const jsonRequest = CircularJSON.stringify(request.body);
        // em seguida o JSON é tranformado para um objeto com todos os dados do pagamento
        const objRequest = JSON.parse(jsonRequest);

        pagarme.client.connect({ api_key: api_key_teste }) // é feita a conexão com a pagarme
            .then((client: any) => client.transactions.create({ // é iniciada a transação
                capture: objRequest.capture,
                amount: objRequest.amount,
                card_number: objRequest.card_number,
                card_holder_name: objRequest.card_holder_name,
                card_expiration_date: objRequest.card_expiration_date,
                card_cvv: objRequest.card_cvv
            })
                .then((transaction: any) => { // se ocorrer tudo corretamente entra aqui
                    // é printado o json da transação retornado da pagarme
                    console.log('Transação efetuada com sucesso!', transaction);
                    // é enviado como resposta da requisição o json com as informações da transação
                    response.send(transaction); 
                })
            )
            .catch((err: any) => { // se ocorrer algum erro entra aqui
                console.log('ERRO NA CONFIRMAÇÃO', err);
                response.status(500).send(err);
            });

    });
});