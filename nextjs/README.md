## Getting Started with Next.js
```bash
$ echo -e "{\n}" > package.json
$ npm install react react-dom next
$ cp package.json package.json.temp && cat package.json.temp | jq '. + {scripts: {dev: "next dev"}}' > package.json && rm -f package.json.temp
$ npm run dev
```

## Create Next.js app with template
```
$ npx create-next-app@latest first-app --use-npm --example <URL>
```
