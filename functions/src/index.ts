import * as functions from 'firebase-functions';

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export class Functions {
    pagarme = require('pagarme/browser');
    api_key_teste = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';
}

export const funct = new Functions();

export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});

// Mostrar as transações realizadas
export const mostrarTransferencias = functions.https.onRequest((request, response) => {
    response.send(() => {
        funct.pagarme.client.connect({ api_key: funct.api_key_teste })
            .then(client => {
                return client.transactions.all()
            })
            .then(console.log());
    })
});

