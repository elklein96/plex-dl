const rp = require('request-promise');

const utils = require('./lib/utils');
const constants = require('./lib/constants');

const service = {
    main
};
module.exports = service;

async function main() {
    let exitCode = 1;

    const baseUrl = await utils.promptForInput(constants.PROMPT_BASE_URL);
    const mediaId = await utils.promptForInput(constants.PROMPT_MEDIA_ID_URL);
    const authToken = await utils.promptForInput(constants.PROMPT_AUTH_TOKEN);
    const outputDirectory = await utils.promptForInput(constants.PROMPT_OUTPUT_DIR);

    const metadataUrl = `${baseUrl}/library/metadata/${mediaId}?X-Plex-Token=${authToken}`;
    const xmlMetadata = await rp(metadataUrl);

    try {
        const metadata = await utils.parseXmlMetadata(xmlMetadata);
        const mediaUrl = `${baseUrl}${metadata.mediaPath}?download=1&X-Plex-Token=${authToken}`;

        const output = await utils.downloadMedia(mediaUrl, outputDirectory, metadata.title, metadata.container);
        console.log(constants.RESPONSE_SUCCESS);
        console.log(`Please check ${output}`);

        exitCode = 0;
    } catch (e) {
        console.error(constants.RESPONSE_FAILURE);
        console.error(e);
    }

    process.exit(exitCode);
}
