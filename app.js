const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('<a href="http://partyhorse.party">PartyHorse.Party</a> <-- Highly recommended'));

app.listen(80);
