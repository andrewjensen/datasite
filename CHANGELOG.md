# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added

- Serialize filter and ordering state in the URL

### Changed

- Clearer design for buttons in the dashboard table

### Fixed

- Updated dependencies in example app

## 0.5.0 - 2020-06-11

### Added

- Set document title to the datasite and dashboard title

### Changed

- Add instructions to the README
- Adopted [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) format for this Changelog

## 0.4.1 - 2020-05-07

### Fixed

- Switching from one dashboard to another through the sidebar did not reset filter state

## 0.4.0 - 2020-05-07

### Changed

- Row IDs are now generated internally by the CLI

### Fixed

- Switching from one dashboard to another through the sidebar used to corrupt the state

## 0.3.0 - 2020-01-08

### Added

- Quick filtering
- New `equalsList` filter type

## 0.2.0 - 2019-12-09

### Added

- New filter types
  - `equals`
  - `regex`

### Fixed

- Prevent incorrect caching of datasets

## 0.1.x

MVP
