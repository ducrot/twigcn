import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
    build: {
        lib: {
            entry: {
                index: resolve(__dirname, 'src/index.ts'),
                'controllers/index': resolve(__dirname, 'src/controllers/index.ts'),
                'controllers/accordion_controller': resolve(__dirname, 'src/controllers/accordion_controller.ts'),
                'controllers/carousel_controller': resolve(__dirname, 'src/controllers/carousel_controller.ts'),
                'controllers/combobox_controller': resolve(__dirname, 'src/controllers/combobox_controller.ts'),
                'controllers/command_controller': resolve(__dirname, 'src/controllers/command_controller.ts'),
                'controllers/custom_select_controller': resolve(__dirname, 'src/controllers/custom_select_controller.ts'),
                'controllers/dialog_controller': resolve(__dirname, 'src/controllers/dialog_controller.ts'),
                'controllers/drawer_controller': resolve(__dirname, 'src/controllers/drawer_controller.ts'),
                'controllers/popover_controller': resolve(__dirname, 'src/controllers/popover_controller.ts'),
                'controllers/slider_controller': resolve(__dirname, 'src/controllers/slider_controller.ts'),
                'controllers/tabs_controller': resolve(__dirname, 'src/controllers/tabs_controller.ts'),
                'controllers/theme_controller': resolve(__dirname, 'src/controllers/theme_controller.ts'),
                'controllers/toaster_controller': resolve(__dirname, 'src/controllers/toaster_controller.ts'),
                'controllers/tooltip_controller': resolve(__dirname, 'src/controllers/tooltip_controller.ts'),
            },
            formats: ['es'],
            fileName: (format, entryName) => `${entryName}.js`,
        },
        rollupOptions: {
            external: ['@hotwired/stimulus'],
            output: {
                preserveModules: false,
                globals: {
                    '@hotwired/stimulus': 'Stimulus',
                },
            },
        },
        cssCodeSplit: false,
        outDir: 'dist',
        emptyDirBeforeWrite: true,
    },
    plugins: [
        dts({
            include: ['src/**/*.ts'],
            outDir: 'dist',
        }),
    ],
});
