const http = require('http'),
fs = require('fs'),
dotenv = require('dotenv'),
path = require('path'),
url = require('url');

dotenv.config();

const port = process.env.port || 8080;

const requestListener = (req, res) => {
    const responsePathName = url.parse(req.url).pathname;
    const responseExt = path.extname(responsePathName);

    switch (responseExt) {
        case '.png':
            setContentType('image/png', res);
            getFileAndRespond('public/logo.png', res);
            break;
        case '.vcf':
            setContentType('text/vcard', res);
            res.setHeader('Content-Disposition', 'attachment; filename=contactinfo.vcf');
            getFileAndRespond('public/contactinfo.vcf', res);
            break;
        default:
            setContentType('text/html', res);
            getFileAndRespond('public/index.html', res);
            break;
    }
}

const server = http.createServer(requestListener);
console.log('Server started on port', port);

server.listen(port);

const getFile = fileFullPath => fs.createReadStream(fileFullPath);

const getFileFullPath = relativePath => path.join(__dirname, relativePath);

const getFileAndRespond = (relativePath, res) => {
    const fileFullPath = getFileFullPath(relativePath);
    const file = getFile(fileFullPath);
    file.pipe(res);
}

const setContentType = (contentType, res) => res.setHeader('Content-Type', contentType);