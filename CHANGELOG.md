# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

-   Tests

## [0.3.0] - 2019-06-26

### Added

-   Promise based API with all space methods (add, delete, update)
-   Second parameter to `useSpace`. Expects a function that receives the firebase `ref` and returns a `Reference` or a `Query`
-   Better TS types.
-   A Changelog

### Removed

-   Callback API on all space methods (add, delete, update). No more `onComplete`
