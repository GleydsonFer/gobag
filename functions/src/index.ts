// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// Modulos do Firebase
import functions = require('firebase-functions');
import admin = require('firebase-admin');
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