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
    return cors(request, response, () => {

        const jsonRequest = CircularJSON.stringify(request.body);
        const objRequest = JSON.parse(jsonRequest);
        console.log(objRequest);

        pagarme.client.connect({ api_key: api_key_teste })
            .then((client: any) => client.transactions.create({
                capture: objRequest.capture,
                amount: objRequest.amount,
                card_number: objRequest.card_number,
                card_holder_name: objRequest.card_holder_name,
                card_expiration_date: objRequest.card_expiration_date,
                card_cvv: objRequest.card_cvv
            })
                .then((transaction: any) => {
                    console.log('Transação efetuada com sucesso!', transaction);
                    response.send(transaction);
                })
            )
            .catch((err: any) => {
                console.log('ERRO NA CONFIRMAÇÃO', err);
                response.status(500).send(err);
            });

    });
});
