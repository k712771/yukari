import { sync } from 'glob';

const DIR = {
	SRC : 'src/client', 
	DEST : 'dist', 
	appRoot : __dirname, 
	chunkList : [ 'member' ], 
};

let { SRC : _SRC, appRoot : _appRoot } = DIR;
// import export 정리에 대한 공부 alias
const PATH = {
	PORT : 8001, 
	rootPath : `${ _appRoot }/${ _SRC }`, 
	jsList : sync( `${ _appRoot }/${ _SRC }/js/*.js` ),
	pageList : sync( `${ _appRoot }/${ _SRC }/page/*.html` ), 
	subFolders : sync( `${ _appRoot }/${ _SRC }/page/!(*.*|include)` ),
	cssList : sync( `${ _appRoot }/${ _SRC }/scss/*.scss` ), 
	spriteList : {
		root : sync( `${ _appRoot }/${ _SRC }/spriteImg/*.png` ), 
		folders : sync( `${ _appRoot }/${ _SRC }/spriteImg/!(*.png)` ), 
	}, 
};

Object.assign( PATH, DIR );

export default PATH;
export const { PORT, rootPath, jsList, pageList, subFolders, cssList, appRoot, SRC, DEST, spriteList, chunkList } = PATH;