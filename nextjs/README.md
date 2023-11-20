## Getting Started with Next.js
```bash
$ echo -e "{\n}" > package.json
$ npm install react react-dom next
$ cat package.json | jq '. + {scripts: {dev: "next dev"}}'
$ npm run dev
```
