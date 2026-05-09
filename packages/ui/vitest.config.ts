import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        setupFiles: ['./tests/setup.ts'],
        include: ['tests/**/*.test.ts'],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            include: ['src/controllers/**/*.ts'],
            exclude: ['src/controllers/index.ts'],
        },
    },
});
