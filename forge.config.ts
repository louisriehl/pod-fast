import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    name: 'PodFast',
    icon: './icons/icon'
  },
  rebuildConfig: {},
  makers: [new MakerZIP({}, ['darwin', 'win32']), new MakerSquirrel()],
  plugins: [
    new AutoUnpackNativesPlugin({}),
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/renderer/main/index.html',
            js: './src/renderer/main/renderer.ts',
            name: 'main_window',
            preload: {
              js: './src/main/preload.ts',
            },
          },
          {
            html: './src/renderer/pods/index.html',
            js: './src/renderer/pods/renderer.ts',
            name: 'pods_window',
            preload: {
              js: './src/main/preload.ts',
            },
          },
        ],
      },
      port: 3636,
      loggerPort: 9005,
    }),
  ],
};

export default config;
