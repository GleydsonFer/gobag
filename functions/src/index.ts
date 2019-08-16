// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

const functions = require('firebase-functions');
const app = require('firebase-admin');
app.initializeApp();

const pagarme = require('pagarme');
const api_key_teste = 'ak_test_KN3qLDMn4KnpRgHCidxb7T9xfVcSz0';

const cors = require('cors')({
    origin: true,
});

export const helloWorld = functions.https.onRequest((request: any, response: any) => {
    return cors(request, response, () => {
        response.send("Hello from Firebase!");
    })
});

// Mostrar as transações realizadas
export const mostrarTransferencias = functions.https.onRequest((request: any, response: any) => {
    return cors(request, response, () => {
        response.send(
            pagarme.client.connect({ api_key: api_key_teste })
                .then((client: any) => client.transactions.all())
        )
    })
});

