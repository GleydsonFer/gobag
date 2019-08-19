// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
// Modulos do Firebase
const functions = require('firebase-functions');
const app = require('firebase-admin');
app.initializeApp(functions.config().firebase);
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

// Recupera as transações já feitas
const transacoes = async() => {
    return await pagarme.client.connect({ api_key: api_key_teste })
    .then((client: any) => client.transactions.all());
} 
    
// Mostrar as transações realizadas
export const mostrarTransferencias = functions.https.onRequest((request: any, response: any) => {
    return cors(request, response, () => {
        response.send(transacoes);
    })
});

