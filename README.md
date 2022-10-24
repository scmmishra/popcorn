<div align="center">
<br>
<br>
<h1>Popcorn</h1>
  <p>A TMDB client built for fun.</p>
</div>


## Demo Setup

1. Clone the repo, install the packages using `pnpm install`
2. Create a `.env` file at the root using the example below
3. Run the project using `pnpm run dev --port 3000`
4. The project should be available on port [localhost:3000](https://localhost:3000)

### Sample `.env`

```sh
VITE_API_KEY=<API KEY FROM TMDB>
VITE_READ_ACCESS_TOKEN=<READ ACCESS TOKEN>
VITE_API_URL=https://api.themoviedb.org/3
```

## Running tests

This project uses Vitest for testing, you can run the tests using the following command

```sh
pnpm run test:unit
```

## Dev Setup

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

