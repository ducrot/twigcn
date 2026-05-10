# Security Policy

## Supported versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x     | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Instead, report them privately via GitHub Security Advisories:
<https://github.com/ducrot/twigcn/security/advisories/new>

Include as much of the following as you can:

- A description of the issue and its impact.
- Steps to reproduce, or a proof-of-concept.
- The affected package(s) — `ducrot/twigcn-bundle` (Composer) and/or
  `@ducrot/twigcn-ui` (npm) — and version(s).
- Any suggested fix or mitigation.

You can expect an initial response within five working days. Once a fix
is available, a coordinated release of both packages from the same tag
will follow, and the advisory will be published with credit to the
reporter unless anonymity is requested.

## Scope

In scope:

- The PHP bundle code in `packages/bundle/`.
- The Stimulus controllers and styles shipped via `@ducrot/twigcn-ui`.
- The release pipeline in `.github/workflows/release.yml` and the
  configuration of the npm Trusted Publisher.

Out of scope:

- The demo application in `packages/demo/`, except where a vulnerability
  there reflects an issue in the published packages.
- Vulnerabilities in third-party dependencies — please report those
  upstream. We track dependency advisories via GitHub's dependency
  graph and will release new versions promptly when affected.
