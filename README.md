# Lumy prototype for viewing workflow files

## Developing

- Have nodejs (16.19 or newer), npm and [pixi](https://github.com/prefix-dev/pixi#installation) installed.
- Create a `.env` file and set `KIARA_SERVICE_ENDPOINT` to the base url (including protocol) of a running kiara service (see `.env.example`)

```sh
npm i  # install dependencies
npm run backend  # start the kiara backens service
npm run dev  # run the dev server

npm run format # run the formatter (prettier)
npm run lint  # run the linter (eslint)

npm run build  # build a static site to the dist directory
npm run preview  # preview the static site you just built

npm run sync-models  # update the type definitions for the kiara API
```

This site has [TailwindCSS](https://tailwindcss.com/docs/) and the typography plugin installed. General styles go in `src/styles/global.css`, component styles go in components, either as classnames in HTML or `@apply` rules in a postcss style block.


- [ ] TODO think about pulling svelte components and typescript client thing into a package
- [ ] TODO markdown parser handle [][] format links to other bits of python, like https://github.com/zslabs/remark-relative-links/blob/master/index.js

import some example datafiles like this, assuming you have `kiara_plugin.tabular` cloned somewhere on your system
```sh
.pixi/env/bin/kiara run /home/markus/projects/kiara/kiara_plugin.tabular/examples/jobs/import_journal_tables.yaml --save journals
.pixi/env/bin/kiara run /home/markus/projects/kiara/kiara_plugin.tabular/examples/jobs/import_journal_nodes_table.yaml --save import
.pixi/env/bin/kiara data list
```