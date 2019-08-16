// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const functions = require('firebase-functions');
const app = require('firease-admin');
app.initializeApp();
const pagarme = require('pagarme/browser');
const api_key_teste = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';

export const helloWorld = functions.https.onRequest((request: any, response: any) => {
    response.send("Hello from Firebase!");
});

// Mostrar as transações realizadas
export const mostrarTransferencias = functions.https.onRequest((request: any, response: any) => {
    request.send(() => {
        pagarme.client.connect({ api_key: api_key_teste })
            .then((client: any) => {
                return client.transactions.all();
            })
            .then(console.log());
    })
});

