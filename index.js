import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
  res.render('test', {
    title: "Handlebars rendered page",
    firstname: "Elvin",
    lastname: "Ridley",
    headline: "Can you see me? Then it works!"
  });
});

const port = process.env.PORT || 8050
app.listen(port, () => console.log(`Listening on port ${port}...`));