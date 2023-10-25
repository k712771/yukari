// const MakeEntryList = ( obj, extenstion, objList ) => {
function MakeEntryList( ...args ) {
	let entryList	= {} 
	,	singleBln	= true;

	const makeFunc = ( arr, ext ) => {
		arr.reduce(( acc, item ) => {
			let srchStr	= new RegExp( `\.${ ext }`, 'g' )
			,	name	= item.split( '/' ).pop().replace( srchStr, '' )
			;
	
			if( !acc[ name ] ) acc[ name ] = [];
			acc[ name ][ acc[ name ].length ] = item;
	
			return acc;
		}, entryList );
	};

	const chkEntryList = chkEntry => {
		if(
			chkEntry
			&& !Array.isArray( chkEntry )
			&& typeof chkEntry == 'object'
		) entryList = chkEntry;
	};

	const chkArgsFunc = ( _args ) => {
		let [ arr, ext ] = [ _args[0], _args[1] ];

		if( singleBln ) chkEntryList( args[2] );
		else chkEntryList( args[1] );

		makeFunc( arr, ext );
	};

	if( Array.isArray( args[0][0] ) ) {
		singleBln = false;
		args[0].map( args => chkArgsFunc( args ));
	}
	else if( Array.isArray( args[0] ) ) {
		chkArgsFunc( args );
	}

	if( typeof args[ args.length - 1 ] == 'function' ) {
		args[ args.length - 1 ]( entryList );
	}

	return entryList;
};

export default MakeEntryList;