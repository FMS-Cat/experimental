# CONTRIBUTING.md

Actually a memo for myself

### Development

Author code on `dev` branch

```
yarn
yarn dev
```

Test is your friend

### Releasing

```
git switch dev
npm version <new-version>
git push origin dev --tags
git switch release
git merge dev
git push origin release --tags
git switch dev
```

Pushing to `release` automatically deploys.
See `deploy-release` workflow on GitHub Actions

Don't forget to make a [release](https://github.com/0b5vr/experimental-npm/releases)!

### Nightly builds

It automatically builds and deploys the HEAD of the `dev` branch

See `deploy-nightly` workflow on GitHub Actions
