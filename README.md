# DIY Synthesizer 🎵🎹

A simple NodeJS synthesizer for Raspberry PI

## Raspberry PI Prerequisities

- Make sure audio output is set to the audio jack, not HDMI (unless your screen has speakers)
- Install ALSA header files: `sudo apt-get install libasound2-dev`

## Getting Started

```
git clone https://github.com/bberak/diy-synthesizer.git
cd diy-synthesizer
npm install
npm run start
```

## Making Sure The Synthesizer Is Always Running

Create a service file under `/etc/systemd/system` with the following contents:

```
[Service]
WorkingDirectory=~/Dev/diy-synthesizer
ExecStart=/home/pi/.nvm/versions/node/v8.16.2/bin/npm run start
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=diy-synthesizer
User=pi

[Install]
WantedBy=multi-user.target
```

> Make sure you change the paths and user to suit your environment. An example service file has been saved in the `src` folder.

Finally, reboot to see it in action.

### Create a Cronjob 

If you want to automatically start the synthesizer after a reboot (or error), you can add a cron job.

Run `sudo crontab -e`

Then add the following line to check if the process is running every 5 seconds

```
```

## Built with open source tools 💕

- [node-sfx](https://github.com/bberak/node-sfx)
- [audio-generator](https://github.com/audiojs/audio-generator)
- [audio-speaker](https://github.com/audiojs/audio-speaker)

## License

MIT License

Copyright (c) 2020 Boris Berak

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
