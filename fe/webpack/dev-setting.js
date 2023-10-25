import { PORT, appRoot } from '@root/Dir';
// Object.defineProperties
const DevSetting = {
	devServer : {
		enumerable : true, // 노출여부
		configurable : true, // config에서 사용 할 것인지 여부
		writable : true, // 수정 가능여부
		value : {
			watchContentBase : true, 
			port : PORT, 
			open : true, 
			contentBase : appRoot, 
			inline : true, 
			hot : true, 
		}, 
	}, 

	devtool : {
		enumerable : true, 
		value : 'inline-source-map', 
	}
};

export default DevSetting;