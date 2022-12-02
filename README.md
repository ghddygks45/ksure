
Read Me

## settings.json

{
	// 코딩 컨벤션 기본 설정
	"editor.defaultFormatter": "HookyQR.beautify",
	"editor.tabSize": 2,
	"editor.insertSpaces": false,
	"editor.detectIndentation": false,
	"editor.formatOnSave": true,
	//"sassVariablesHelper.route": "**/scss/_variables.scss",

	"liveSassCompile.settings.includeItems": [
		"asset/rh-kr/scss/**.scss" // 신규 컨텐츠 SCSS
	],
	"liveSassCompile.settings.formats": [{
		"format": "expanded",
		"extensionName": ".css",
		"savePath": "asset/rh-kr/css/"
	}],
	"liveSassCompile.settings.excludeList": [
		"**/node_modules/**",
		".vscode/**"
	],
	"liveSassCompile.settings.generateMap": false,
	"liveSassCompile.settings.autoprefix": [
		"> 1%",
		"last 2 versions"
	]
}