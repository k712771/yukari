import WebpackSpritesmith from 'webpack-spritesmith';
import { join } from 'path';
import { sync as delSync } from 'del';
import { sync as globSync } from 'glob';
import { SRC, rootPath, spriteList } from '@root/Dir';

const MakeSpritePlugin = imgsPath => {
	let arr = []
	,	spritePath = `${ imgsPath }sprite`
	,	{ root : spriteRoot, folders : spriteFolders } = spriteList
	;

	const spriteTemplateFunction = data => {
		let fdName		= ( arr => arr[ arr.length - 2 ] )( data.sprites[0].source_image.split( '\\' ) )
		,	includeCss	= `@mixin ${ fdName }-spBg { background-image: url(${ data.sprites[0].image }); }`
		,	perSprite	= null
		;

		perSprite = data.sprites.map( sprite => {
			let { image, name, width, height, offset_x, offset_y, total_width, total_height } = sprite;
			return `@mixin sp-${ fdName }-${ name } {
				@include ${ fdName }-spBg;
				width: ${ width }px;
				height: ${ height }px;
				background-position: ${ offset_x }px ${ offset_y }px;
				background-size: ${ total_width }px ${ total_height }px;
			}\r\n
			@mixin sp-${ fdName }-${ name }-m {
				@include ${ fdName }-spBg;
				width: ${ width / 2 }px;
				height: ${ height / 2 }px;
				background-position: ${ offset_x / 2 }px ${ offset_y / 2 }px;
				background-size: ${ total_width / 2 }px ${ total_height / 2 }px;
			}`.replace( /\n\s*/g, '' );
		}).join( '\n' );

		return `${ includeCss }\n${ perSprite }`;
	};

	const makeSprite = ( folderName ) => {
		let spriteName = null;
		folderName = ( !folderName || folderName == '' ) ? '' : folderName.split( '/' ).pop();
		spriteName = folderName == '' ? 'sprite' : folderName;
		return new WebpackSpritesmith({
			src : {
				cwd : join( rootPath, 'images', 'spriteImg', folderName ), 
				glob : '*.png', 
			}, 
			target : {
				image : join( rootPath, `images/sprite/${ spriteName }.png` ), 
				css : [[
					join( rootPath, `scss/sprite/${ spriteName }-set.scss` ), 
					{ format : 'function_based_template' }
				]], 
			}, 
			customTemplates : { 'function_based_template' : spriteTemplateFunction }, 
			apiOptions : { cssImageRef : `"${ spritePath }/${ spriteName }.png?v=[hash:8]"` }, 
			spritesmith : { padding : 10 }
		});
	};

	delSync([
		`${ rootPath }/scss/sprite`, 
		`${ rootPath }/images/sprite`, 
	]);

	if( spriteRoot.length != 0 ) arr[ arr.length ] = makeSprite();
	if( spriteFolders.length != 0 ) {
		spriteFolders.forEach( name => {
			arr[ arr.length ] = makeSprite( name );
		});
	}

	return arr;
};

export default MakeSpritePlugin;