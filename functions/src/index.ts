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
        console.log(request.body);
        pagarme.client.connect({ api_key: api_key_teste })
            .then((client: any) => client.transactions.create({
                capture: request.body.capture,
                amount: request.body.amount,
                card_number: request.body.card_number,
                card_cvv: request.body.card_cvv,
                card_expiration_date: request.body.card_expiration_date,
                card_holder_name: request.body.card_holder_name,
            }))
            .then((transaction: any) => {
                console.log('Transação efetuada com sucesso!', transaction);
                response.send(request);
            })
            .catch((err: any) => {
                console.log('ERRO NA CONFIRMAÇÃO', err);
                response.status(500).send(err);
            });

    });
});
