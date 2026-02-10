/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app() {
    return {
      home: 'aws',
      name: 'dspln',
      providers: {
        aws: {
          region:
            process.env.ENVIRONMENT === 'staging' ? 'ap-south-1' : 'us-east-1',
        },
        'aws-native': {
          version: '1.50.0',
          region:
            process.env.ENVIRONMENT === 'staging' ? 'ap-south-1' : 'us-east-1',
        },
      },
    };
  },
  async run() {
    await import('./stack/ApiStack');
    await import('./stack/UserStack');
    await import('./stack/AdminStack');
  },
});
