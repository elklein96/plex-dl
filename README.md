# plex-dl

`plex-dl` is a command-line interface utility for downloading media files from a Plex server.

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [FAQ](#faq)

## Features

1. Interactive CLI that prompts for data about the Plex media to be downloaded.

## Quick Start

### Install the Tool

```bash
npm install -g plex-dl
```

### Use the Tool

```bash
$ plex-dl

> Base URL: https://255-255-255-255.dygevsK8qUWrIXGjXFzhFQDjgbpQWpnW.plex.direct:32400
> Media ID: 123456
> Auth Token: wa3iJvt3nKzi12Pr1Zxq
> Media Output Directory: ~/Downloads
  Downloading [====================] 1469081/bps 100% 0.0s
Success! File downloaded without error.
Please check /Users/evanklein/Downloads/Inception.mp4
```

#### Non-interactive mode

To use plex-dl in a non-interactive mode, supply the following CLI flags:

```bash
$ plex-dl \
  --baseUrl https://255-255-255-255.dygevsK8qUWrIXGjXFzhFQDjgbpQWpnW.plex.direct:32400
  --mediaId 123456 \
  --authToken wa3iJvt3nKzi12Pr1Zxq \
  --outputDirectory ~/Downloads
```

## FAQ

### What are some example inputs for the CLI prompts

#### Base URL

- Description
  - The base URL of the Plex server.

- Example Value
  - `https://255-255-255-255.dygevsK8qUWrIXGjXFzhFQDjgbpQWpnW.plex.direct:32400`

#### Media ID

- Description
  - The ID of the media item in Plex server.
  - Obtain this value by navigating to the desired media item on Plex server. Inspect the query parameter `key`. Its value will have the schema `/library/metadata/<mediaId>`

- Example Value
  - `123456`

#### Auth Token

- Description
  - The authentication token used to make requests via the Plex server API.
  - Inspect the network logs in the browser when playing the media item in Plex server. Search for `X-Plex-Token`, which is the name of the query parameter Plex uses to pass its authentication token in requests.

- Example Value
  - `wa3iJvt3nKzi12Pr1Zxq`

#### Media Output Directory

- Description
  - The directory which will contain the downloaded media file.
  - This value can be an absolute or relative path.

- Example Value
  - `~/Downloads`

#### Overwrite File

- Description
  - This field dictates whether of not to overwrite a file if one exists with the same name as the media item to be downloaded at the same location specified at `Media Output Directory`.

- Example Value
  - `Y`
