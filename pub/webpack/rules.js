import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { rootPath } from '@root/Dir';
import { join } from 'path';

const imgPath = 'pub/src/client/';
const JsRule = {
	test : /\.js$/i, 
	exclude : /node_modules/, 
	use : [ 'babel-loader' ]
};

const ScssRule = {
	module : {
		test : /\.(css|scss)$/i, 
		exclude : /node_modules/, 
		use : [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
	}, 
	plugins : new MiniCssExtractPlugin({ filename : 'css/[name].css' }) 
};

const getFileInfo = url => {
	let splitPath = url.split( '/' );

	return {
		ext : url.split( '.' ).pop(), 
		lastPath : splitPath[ splitPath.length - 2 ]
	};
}

const ImageRule = {
	test : /\.(png|jpg|jpeg|gif|svg)$/i, 
	use : [
		{
			loader : 'file-loader', 
			options : {
				esModule : false, 
				name : '[path][name].[ext]', 
				// 실제 이미지 경로
				outputPath : url => {
					return url.replace( imgPath, './' );
				}, 
				// 소스상의 사용되는 이미지 경로
				publicPath : url => {
					let { ext, lastPath } = getFileInfo( url )
					,	spritePath = [ 'sprite', 'bg' ]
					;
					// console.log(spritePath.indexOf( lastPath ));
					return url.replace( imgPath, spritePath.indexOf( lastPath ) > -1 && ext == 'png' ? '../' : './' );
				}
			}
		}
	]
};

export { 
	JsRule, 
	ScssRule, 
	// SpriteBgRule, 
	ImageRule 
};