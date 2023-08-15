import express from 'express'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import bodyParser from 'body-parser';
import cors from 'cors'
import dotenv from 'dotenv'
import axios from 'axios'

dotenv.config()

const PORT = process.env.PORT || 3000

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.static(__dirname))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ allowedHeaders: "*", allowMethods: "*", origin: '*' }))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.post('/message', async (req, res) => {
    const { name, number } = req.body;
    const message = encodeURI(`<b>Имя:</b> ${name}\n<b>Телефон:</b> <a href="tel:${number}">${number}</a>`)
    res.setHeader()

    try {
        await axios.post(`https://api.telegram.org/bot${process.env.TOKEN_BOT}/sendMessage?chat_id=${process.env.CHAT_ID}&parse_mode=html&text=${message}`)
        res.send({ reslut: true })
    } catch (error) {
        console.log(error)
        res.send({ reslut: false })
    }
})

app.listen(PORT, 'localhost', () => console.log(`http://localhost:${PORT}`))