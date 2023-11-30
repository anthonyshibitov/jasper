import { analyze32 } from "../src/peAnalyze"
import fs from 'fs';
import path from 'path';
const __dirname = path.resolve();

describe('peAnalyze module', () => {
    const calc32 = fs.readFileSync(__dirname + '/tests/testfiles/calc32.exe');

    test('first', () => {
        expect(1).toBe(1);
    });

    test('MZ signature is read', () => {
        const result = analyze(calc32);
        expect(result._IMAGE_DOS_HEADER.e_magic).toBe('5A4D');
    })
});