import { defineConfig, devices } from '@playwright/test';
import { defineBddConfig } from 'playwright-bdd';


const testDir = defineBddConfig({
importTestFrom: 'pom/base/fixtures.ts',
paths: ['features/**/*.feature'],
});

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
 require('dotenv').config({path: './uat.env'});

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir,
  timeout: 30_000,
  expect: {
    timeout: 30_000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [ 
    ['html', {open:'never', outputFolder: 'playwright-report/index.html'} ],
    ['junit', {outputFile: 'playwright-report/results.xml'}]
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
  },

  /* Configure projects */
  projects: [
    {
      name: 'UI test',
      grep: /@UI/,
      use: { 
        channel: 'chrome', 
        headless: false, 
        baseURL: process.env.APP_URL, 
      },
    },
    {
      name: 'API test',
      grep: /@API/,
      retries: 1,
    },
    {
      name: 'UX test',
      grep: /@UX/,
      use: { 
        channel: 'chrome', 
        headless: false, 
        baseURL: process.env.APP_URL, 
        viewport: {width:1850, height:900},
      },
    },
  ],
});
