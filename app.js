const morgan = require('morgan');
const path = require('path');
const bodyParser = require("body-parser");
const express = require('express');
const app = express()
const port = process.env.PORT || 3000


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// set path for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Logger
app.use(morgan('dev'));


app.get('*', (req, res) => {
    return res.render('index', {
        process,
        descriptions: {
            "Original URL": req.originalUrl,
            "Base URL": req.baseUrl || "no data",
            "Req Path": req.path,
            "IP (remote address)": req.connection.remoteAddress
        },
        queryParams: req.query,
        headers: req.headers
    }
    );
}
)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
