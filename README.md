## Reasoning
I built this with svelte because svelte is best for small apps, and when combined with tailwind css, it allows for fast prototyping and development.

using svelte also means that the code is relatively similar to vanilla html as .svelte is a superset of html. since svelte is a compiled framework, it does not need to ship a runtime with a virtual dom. this makes the app much smaller and faster than if i made it with react or other frameworks more suited to large projects.

## viewing
the app is running on https://cat-app-svelte.vercel.app/
## Running

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```
