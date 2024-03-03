const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config();
app.use(express.json());
app.use(cors());



const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEN_AI_KEY);

const port = 8000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/gemini', async (req, res) => {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    const chat = model.startChat({
        history: req.body.history
    })

    const msg = req.body.message

    const result = await chat.sendMessage(msg)
    const response = await result.response
    const text = response.text()
    res.send(text)
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});