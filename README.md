# Lumy prototype for viewing workflow files

## Developing

- Have nodejs (16.19 or newer) and npm installed.
- Create a `.env` file and set `KIARA_SERVICE_ENDPOINT` to the base url (including protocol) of a running kiara service (see `.env.example`)

```sh
npm i  # install dependencies
npm run dev  # run the dev server

npm run format # run the formatter (prettier)
npm run lint  # run the linter (eslint)

npm run build  # build a static site to the dist directory
npm run preview  # preview the static site you just built
```

This site has [TailwindCSS](https://tailwindcss.com/docs/) and the typography plugin installed. General styles go in `src/styles/global.css`, component styles go in components, either as classnames in HTML or `@apply` rules in a postcss style block.


- [ ] TODO add typescript
- [ ] TODO add python deps
