# DIY Synthesizer 🎵🎹

A simple NodeJS synthesizer for Raspberry PI

<p align="center">
  <a href="https://github.com/bberak/react-native-game-engine-handbook">
    <img src="https://raw.githubusercontent.com/bberak/diy-synthesizer/master/assets/IMG_0965.JPG" height="450" />
    <img src="https://raw.githubusercontent.com/bberak/diy-synthesizer/master/assets/IMG_0982.JPG" height="450" />
    <img src="https://raw.githubusercontent.com/bberak/diy-synthesizer/master/assets/IMG_0995.JPG" height="450" />
   </a>
</p>

## Raspberry PI Prerequisities

- Make sure audio output is set to the audio jack, not HDMI (unless your screen has speakers)
- Install ALSA header files: `sudo apt-get install libasound2-dev`
- Speech to text engine: `sudo apt-get install gnustep-gui-runtime`

## Getting Started

```
git clone https://github.com/bberak/diy-synthesizer.git
cd diy-synthesizer
npm install
npm run start
```

## Making Sure The Synthesizer Is Always Running

Copy the example service file to the `systemd` folder:

```
sudo cp src/diy-synthesizer.service /etc/systemd/system/diy-synthesizer.service
```

> Make sure you change the contents of this file to reference paths in your environment.

Enable and start the servie:

```
systemctl enable diy-synthesizer # follow the prompts
systemctl start diy-synthesizer  # follow the prompts
systemctl status diy-synthesizer.service # make sure service is active (running)
```

Finally, reboot to see it in action and test that it works.

> [This article will help you debug in case of problems](https://community.chakralinux.org/t/how-to-investigate-systemd-errors/7024)

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
