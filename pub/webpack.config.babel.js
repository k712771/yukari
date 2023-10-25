import { resolve, join } from 'path';
import { sync } from 'glob';

import Dir, { jsList, cssList, pageList, appRoot, SRC, DEST } from '@root/Dir';

import MakeEntryList from '@webpack/make-entry-list';
import { JsRule, ScssRule, SpriteBgRule, ImageRule } from '@webpack/rules';
import { HtmlRule, HtmlPackage } from '@webpack/html-package';
import MakeSprite from '@webpack/make-sprite';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DevSetting from '@webpack/dev-setting';

const config = ( env, options ) => {
	console.log( 'webpack config babel in' );
	const config = {
		entry : MakeEntryList([[ jsList, 'js' ], [ cssList, 'scss' ]] ), 

		output : {
			path : join( appRoot, DEST ), 
			filename : 'js/[name].js', 
		}, 

		module : {
			rules : [
				JsRule, 
				ScssRule.module, 
				HtmlRule, 
				// SpriteBgRule, 
				ImageRule
			]
		}, 

		plugins: [
			new CleanWebpackPlugin(), 
			ScssRule.plugins, 
		]
		.concat(( _ => HtmlPackage( pageList ))())
		.concat(( _ => MakeSprite())())
		, 
		resolve : {
			modules : [ "node_modules", "sprite" ]
		}, 
		stats : 'errors-only'
	};

	// console.log({ options });
	if( options.mode == 'development' ) {
		let { devServer, devtool } = DevSetting;
		Object.defineProperties( config, { devServer, devtool });
	}

	return config;
};

export default config;