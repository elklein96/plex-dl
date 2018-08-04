const constants = {
    MEDIA_DOWNLOAD_XPATH: 'MediaContainer.Video[0].Media[0].Part[0].$.key',
    MEDIA_CONTAINER_XPATH: 'MediaContainer.Video[0].Media[0].$.container',
    MEDIA_TITLE_XPATH: 'MediaContainer.Video[0].$.title',

    PROMPT_BASE_URL: 'Base URL',
    PROMPT_MEDIA_ID_URL: 'Media ID',
    PROMPT_AUTH_TOKEN: 'Auth Token',
    PROMPT_OUTPUT_DIR: 'Media Output Directory',
    PROMPT_OVERWRITE: 'Overwrite File? (Y/n)',

    RESPONSE_SUCCESS: 'Success! File downloaded without error.',
    RESPONSE_FAILURE: 'Failed to download file with error.',

    ERROR_BAD_RESPONSE: 'Received a bad response from Plex.',

    PROGRESS_BAR: '  Downloading [:bar] :rate/bps :percent :etas'
};

module.exports = constants;
