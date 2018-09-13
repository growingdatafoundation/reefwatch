# reefwatch

Reefwatch Marine Species Survey

## Install

### Configuration

#### Frontend

copy file `config/config.template` to `config/index.js` and edit properties

#### Backend

* see [loopback docs dor datasources](https://loopback.io/doc/en/lb2/datasources.json.html)

Copy `API/server/datasources.template` to `/API/server/datasources.json` and edit credentials

* Environment-specific configuration: `datasources.production.js` or `datasources.development.json` or `datasources.local.json`

## Development

Alternatively to below steps run `drun-dev.sh` script.

1. Start up Api (*/api*)

```
npm run start --prefix ./API
```

2. Start up App

```
npm run start
```


