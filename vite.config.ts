import path from 'path';
import {defineConfig} from 'vite';

const srcPath = 'src';
const getPath = (route: string) => path.resolve(__dirname, route);

export default defineConfig({
    resolve: {
        tsconfigPaths: true,
        alias: {
            '@': getPath(srcPath)
        }
    },
    server: {
        port: 5177
    }
});
