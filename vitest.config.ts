/// <reference types="vitest" />
import { getViteConfig } from 'astro/config';

export default getViteConfig({
  // @ts-expect-error - Astro types don't include Vitest config yet
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.{ts,tsx,js,jsx}'],
    reporters: ['verbose', 'junit'],
    outputFile: {
      junit: 'reports/junit-vitest.xml'
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: 'reports/coverage'
    }
  },
});
