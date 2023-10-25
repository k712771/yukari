import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { rootPath } from '@root/Dir';
import { join } from 'path';

const JsRule = {
	test : /\.js$/i, 
	exclude : /node_modules/, 
	use : [ 'babel-loader' ], 
};

const CopyPlugin = new CopyWebpackPlugin([{
	from : `${ rootPath }/images/`, 
	to : 'images/', 
	ignore : [ 'spriteImg/**/*' ]
}]);

const ScssRule = {
	module : {
		test : /\.(css|scss)$/i, 
		exclude : /node_modules/, 
		//use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
		use: [ 'style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
	}, 
	plugin : new MiniCssExtractPlugin({ filename : 'css/[name].css' })
};

/* const SpriteBgRule = {
	test : /\.png$/i,
	include : [
		join( rootPath , 'images/sprite' ),n 
		join( rootPath , 'images/bg' ),
	],
	use : [{
		loader : 'file-loader',
		options : {
			esModule : false, 
			name  : '[path][name].[ext]',
			// 물리적인 경로로 이동된 파일에서 사용되는 논리적인 경로( dist 상에서의 상대경로 )
			publicPath : url => {
				return url.replace( 'src/client/' , '../' );
			} ,
			// 파일이 이동되는 물리적인 경로( dist )
			outputPath : url => {
				return url.replace( 'src/client/' , './' );
			}
		}
	}]
}; */

const ImageRule = imgsPath => {
	let arr = [];
	const ImgRule = {
		test : /\.(png|jpg|jpeg|gif|svg)$/i, 
		include : [ join( rootPath, 'images' ), join( rootPath, 'images/bg' ) ],
		exclude : [ join( rootPath, 'images/sprite' ) ], 
		use : [
			{
				loader : 'file-loader', 
				options : {
					esModule : false, 	// es모듈을 사용하는 js 모듈 생성 false일 경우 commonJS 모듈 사용
					emitFile : false,	// true인 경우 file system 사용, false인 경우 공용 URL 리턴하여 사용
					name  : '[path][name].[ext]', 
					outputPath : url => {
						// return url.replace( 'src/client/', './' )
						// console.log({ url, imgsPath });
						// console( url.split('images/')[1] )
						// return url.replace( imgsPath, './' )
						return `${ imgsPath }${ url.split( 'images/' )[1] }`;
					}
				}
			}
		]
	};

	arr[ arr.length ] = ImgRule;

	return arr;
}

// export { JsRule , ScssRule , SpriteBgRule , ImageRule, CopyPlugin }
export { JsRule , ScssRule , ImageRule, CopyPlugin };