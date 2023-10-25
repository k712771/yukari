import { sync } from 'glob';

const DIR = {
  SRC : 'src/client', 
  DEST : 'dist', 
  appRoot : __dirname, 
  chunkList : [], 
  PORT : 8001, 
}

let { SRC : _SRC, appRoot : _appRoot, PORT : _PORT } = DIR 
,	_imgsPath = {
		// ser : `http://localhost:${ _PORT }/images/` , 
		// dev : `http://k712771.cafe24.com/webpack/images/` , 
		// pro : `http://localhost:${ _PORT }/asdasdada/images/`, 
		dev : `http://localhost:${ _PORT }/images/`, 
		pro : `/images/`, 
		// dev : `http&:#58;//localhost:#58;${ _PORT }/client/images/`, 
		// pro : `http:#58;//localhost:#58;${ _PORT }/asdsadasdasd/images/`, 
	}, 
	client = `${ _appRoot }/${ _SRC }`
;

const PATH = {
	rootPath : `${ client }`, 
	jsList : sync( `${ client }/js/*.js` ), 
	pageList : sync( `${ client }/page/*.html` ), 
	subFolders : sync( `${ client }/page/!(*.*|include)` ), 
	cssList : sync( `${ client }/scss/*.scss` ), 
	spriteList : {
		root : sync( `${ client }/images/spriteImg/*.png` ), 
		folders : sync( `${ client }/images/spriteImg/!(*.png)` ), 
	}, 
	imgsPath : _imgsPath 
};

Object.assign( PATH , DIR );

export default PATH;
export const { 
	chunkList, 
	spriteList, 
	PORT, 
	rootPath, 
	jsList, 
	pageList, 
	subFolders, 
	cssList, 
	appRoot, 
	DEST, 
	SRC, 
	imgsPath 
} = PATH;