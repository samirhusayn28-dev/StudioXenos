import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeManifest } from './Preloader.js';

test('normalizeManifest deduplicates and normalizes asset paths', () => {
    const manifest = {
        images: ['assets/Artimg1.jpg', '/assets/Artimg1.jpg', '/assets/Project01.avif'],
        fetchables: ['robot.glb', '/robot.glb'],
        fonts: ['https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap'],
    };

    const normalized = normalizeManifest(manifest);

    assert.deepEqual(normalized.images, ['/assets/Artimg1.jpg', '/assets/Project01.avif']);
    assert.deepEqual(normalized.fetchables, ['/robot.glb']);
    assert.deepEqual(normalized.fonts, ['https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap']);
});
