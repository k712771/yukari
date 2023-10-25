import { resolve , join } from 'path';
import { sync } from 'glob';
import { jsList, cssList, appRoot, DEST, pageList, subFolders, imgsPath as _imgsPath } from '@root/Dir';
import MakeEntryList from '@webpack/make-entry-list';
// import { JsRule , ScssRule , SpriteBgRule , ImageRule, CopyPlugin }  from '@webpack/rules';
import { JsRule , ScssRule , ImageRule, CopyPlugin }  from '@webpack/rules';
import { HtmlRule , HtmlPackage }  from '@webpack/html-package';
import  MakeSprite  from '@webpack/make-sprite';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DevSetting from '@webpack/dev-setting';

const config = ( env , options ) => {
	let imgsPath = null;
	// let imgsPath = _imgsPath[options.namespace]

	for( const[ k , v ] of Object.entries( _imgsPath ) ) {
		if( k == options.namespace ) imgsPath = v;
	}

	// console.log({ imgsPath });
	// switch( options.namespace ){
	// 	case 'dev' : imgsPath = _imgsPath.dev ; break;
	// 	case 'pro' : imgsPath = _imgsPath.pro ; break;
	// }

	// let entryList = {}
	// MakeEntryList( jsList , 'js'  , entryList  );
	// MakeEntryList( cssList , 'scss' , entryList  );
	// MakeEntryList( cssList , 'scss' ,  result => {
	//     console.log({ result })
	// });
	// MakeEntryList( [[ jsList , 'js' ] , [ cssList , 'scss' ]]   );
	// MakeEntryList( [[ jsList , 'js' ] , [ cssList , 'scss' ]] ,  entryList );

	const config = {
		entry : MakeEntryList( [ [ jsList , 'js' ], [ cssList, 'scss' ] ] ) ,
		// entry : MakeEntryList( jsList , 'js'   ) ,

		output : {
			path : join( appRoot , DEST ), 
			filename : 'js/[name].js', 
		}, 

		module : {
			rules : [
				JsRule, 
				ScssRule.module, 
				HtmlRule, 
				// SpriteBgRule, 
				// ImageRule, 
			].concat( ( _=> ImageRule( imgsPath ))() ), 
		}, 

		plugins : [
			new CleanWebpackPlugin(), 
			ScssRule.plugin, 
			CopyPlugin, 
		]
		.concat( ( _=> HtmlPackage( pageList , subFolders ))() ) 
		.concat( ( _=> MakeSprite( imgsPath ))() ), 

		resolve : {
			modules : [ "node_modules" , "sprite" ], 
		}, 

		stats : 'errors-only' 
	}

	if( options.mode == 'development' ) {
		let { devServer , devtool } = DevSetting;
		Object.defineProperties( config, { devServer, devtool });
	}

	return config;
};

export default config;