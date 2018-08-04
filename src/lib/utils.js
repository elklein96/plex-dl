const _ = require('lodash');
const readline = require('readline');
const xml2js = require('xml2js');
const request = require('request');
const ProgressBar = require('progress');

const fs = require('fs');
const path = require('path');

const constants = require('./constants');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const parser = new xml2js.Parser();

const service = {
    promptForInput,
    parseXmlMetadata,
    downloadMedia,
    touchFile
};
module.exports = service;

async function promptForInput(input) {
    const prompt = `> ${input}: `;
    return new Promise(resolve => rl.question(prompt, input => resolve(input)));
}

async function parseXmlMetadata(xmlMetadata) {
    return new Promise((resolve, reject) => {
        parser.parseString(xmlMetadata, (err, result) => {
            if (err) {
                return reject(err);
            }
            const data = {
                mediaPath: _.get(result, constants.MEDIA_DOWNLOAD_XPATH),
                title: _.get(result, constants.MEDIA_TITLE_XPATH),
                container: _.get(result, constants.MEDIA_CONTAINER_XPATH)
            };
            resolve(data);
        });
    });
}

async function downloadMedia(mediaUrl, outputDirectory, title, container) {
    outputDirectory = outputDirectory.replace('~', process.env.HOME);

    const filePath = path.resolve(__dirname, outputDirectory, `${title}.${container}`);
    const fileExists = fs.existsSync(filePath);
    let bar;

    if (fileExists) {
        const shouldOverwrite = await promptForInput(constants.PROMPT_OVERWRITE);
        if (shouldOverwrite.toLowerCase === 'n') {
            return Promise.reject();
        }
    }

    await touchFile(filePath);

    return new Promise((resolve, reject) => {
        request(mediaUrl)
            .on('error', reject)
            .on('response', res => {
                if (res.statusCode !== 200) {
                    return reject(constants.ERROR_BAD_RESPONSE);
                }
                bar = new ProgressBar(constants.PROGRESS_BAR, {
                    complete: '=',
                    incomplete: ' ',
                    width: 20,
                    total: parseInt(res.headers['content-length'], 10)
                });
            })
            .on('data', chunk => bar.tick(chunk.length))
            .pipe(fs.createWriteStream(filePath))
            .on('finish', () => resolve(filePath));
    });
}

async function touchFile(filename) {
    return new Promise((resolve, reject) => {
        fs.open(filename, 'w', (err, fd) => {
            err ? reject(err) : fs.close(fd, err => {
                err ? reject(err) : resolve(fd);
            });
        });
    });
}
