import path from 'path';
import {defineConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const srcPath = 'src';
const getPath = (route: string) => path.resolve(__dirname, route);

export default defineConfig({
    plugins: [tsconfigPaths()],
    resolve: {
        alias: {
            '@': getPath(srcPath)
        }
    },
    server: {
        port: 5177
    }
});
