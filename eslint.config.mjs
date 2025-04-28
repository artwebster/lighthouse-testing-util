import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import globals from "globals";

export default tseslint.config(
	{
		files: ["**/*.{js,mjs,cjs}"],
	},
	{
		files: ["**/*.js"],
		languageOptions: {
			sourceType: "commonjs",
		},
	},
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
				$: "readonly",
			},
		},
	},
	{
		ignores: [
			"./node_modules",
			"./client/node_modules",
			"./server/node_modules",
			"./server/dist",
		],
	},
	pluginJs.configs.recommended,
	tseslint.configs.recommended
);
