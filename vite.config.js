import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base so the built site works under a GitHub Pages project subpath
// (e.g. /3d-cup-selector/) as well as at the domain root.
export default defineConfig({ base: './', plugins: [react()] });
