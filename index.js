const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');
const classProperties = require('@babel/plugin-proposal-class-properties');
const exportDefaultFrom = require('@babel/plugin-proposal-export-default-from');
const exportNamespaceFrom = require('@babel/plugin-proposal-export-namespace-from');
const runtime = require('@babel/plugin-transform-runtime');
const addExports = require('babel-plugin-add-module-exports');

const browserlist = [
  '>= 0.5%',
  'last 2 major versions',
  'not dead',
  'Chrome >= 60',
  'Firefox >= 60',
  'not Edge < 79',
  'Firefox ESR',
  'iOS >= 10',
  'Safari >= 10',
  'Android >= 6',
  'not Explorer <= 11',
];

module.exports = (
  _,
  {
    dev = false,
    modules = _.env() === 'esm' ? false : 'commonjs',
  } = {},
) => ({
  presets: [
    [
      presetEnv,
      {
        modules,
        loose: true,
        ignoreBrowserslistConfig: true,
        shippedProposals: true,
        include: ['proposal-object-rest-spread'],
        targets: {
          browsers: browserlist,
        },
      },
    ],
    [presetReact, { development: dev, runtime: 'automatic' }],
  ],
  plugins: [
    [classProperties, { loose: true }],
    exportDefaultFrom,
    exportNamespaceFrom,
    [runtime, { useESModules: !modules }],
    modules && addExports,
  ].filter(Boolean),
});