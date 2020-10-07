import * as fs from 'fs';
import * as os from 'os';

function readSettings(filePath) {
    const text = fs.readFileSync(filePath).toString();
    const lines = text.split('\n').map(l => l.trim()).filter(l => l.length > 0);
    const settings = {};
    for (const line of lines) {
        const parts = line.split('=');
        const key = parts[0];
        const value = parts[1];
        settings[key] = value;
    }
    return settings;
}

function writeSettings(filePath, settings) {
    const text = Object.keys(settings).map(key => key + '=' + settings[key]).join('\r\n');
    fs.writeFileSync(filePath, text);
}

function applyColors(mainSettings, colorSettings) {
    const colorKeys = Object.keys(colorSettings).filter(key => key.toLowerCase().includes('color'));
    for (const key of colorKeys)
        mainSettings[key] = colorSettings[key];
}

const mainSettingsFilePath = os.homedir() + '/.kdiff3rc';
const mainSettings = readSettings(mainSettingsFilePath);
const colorSettings = readSettings('./.kdiff3rc-solarized.txt');

applyColors(mainSettings, colorSettings);
writeSettings(mainSettingsFilePath, mainSettings);