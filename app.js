const express = require('express');
const myRoutes = require('./routes/myRoutes');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const session = require('express-session');

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

const logStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' });

morgan.token('remote_addr', (req) => req.ip || req.socket.remoteAddress);
morgan.token('remote_user', () => '-');

app.use(morgan(':remote_addr - :remote_user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: logStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
  }));

app.get('/protected', (req, res) => {
if (!req.session.user) {
    return res.status(401).json({ message: 'Необходимо войти в систему' });
}

res.json({ message: 'Добро пожаловать на защищенную страницу', user: req.session.user });
});


app.use(myRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

