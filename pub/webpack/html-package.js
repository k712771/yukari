import { appRoot, DEST, chunkList } from '@root/Dir';
import { join } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const HtmlRule = {
	test : /\.html$/i, 
	use : [ 'mustache-loader', {
		loader : 'html-loader', 
		options : {
			interpolate : true, // 외부삽입 허용
		}
	}]
};

const HtmlPackagePlugin = ( pageList ) => {
	let arr = [];

	const HtmlPackagePlugin = ( pages, folderName = '' ) => {
		// console.log({ pages });
		pages.forEach( page => {
			/**
			 * 1. Chunk
			 */
			let defaultChunkList	= [ 'common' ]
			,	pageName			= page.split( '/' ).pop()
			,	chunkName			= pageName.replace( /\.html$/, '' )
			;

			defaultChunkList[ defaultChunkList.length ] = chunkName;

			// console.log({ chunkList });
			chunkList.some( chunk => {
				if( chunkName.match( chunk ) != null ) {
					return chunkName = chunk;
				}
			});

			// console.log({ defaultChunkList });
			arr[ arr.length ] = new HtmlWebpackPlugin({
				template : page, 
				publicPath : join( appRoot, DEST ), 
				filename : join( appRoot, DEST, folderName, pageName ), 
				chunks : defaultChunkList, 
				inject : 'head', 
				alwaysWriteToDisk : true, 
			});
		});
	}
	HtmlPackagePlugin( pageList );
	return arr;
};

export {
	HtmlRule, 
	HtmlPackagePlugin as HtmlPackage
};