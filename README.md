# semantic-release-changelog

> **Note**: This is a fork of [@flexperto/semantic-release-changelog](https://github.com/flexperto/semantic-release-changelog). The original project is no longer supported, so I am continuing its maintenance here.

A semantic release plugin for generating changelogs

## Description

This plugin effectively wraps [@semantic-release/changelog](https://github.com/semantic-release/changelog), and adds the option to only generate changelog on specifc branches.

## Installation

`npm i @ciltocruz/semantic-release-changelog`

## Usage

See [upstream](https://github.com/semantic-release/changelog). The configuration options are extend by the `branches` property, which needs to be a RegExp if defined. If defined, the changelog will only be generated, when semantic-release is executed on a branch that matches the RegExp. Eg. this configuration will only generate a changelog on master and develop branches

```
{
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    [
      "@semantic-release/changelog",
      {
        "changelogFile": "docs/CHANGELOG.md",
        "branches": "^(master|develop)$"
      }
    ],
    [
      "@semantic-release/git",
      {
        "assets": ["docs/CHANGELOG.md"]
      }
    ]
  ]
}

```
