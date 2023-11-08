const commonFunction = _ => {
	const page_loading = _ => {
		window.addEventListener("load", _ => {
			setTimeout(_ => {
				const loading = document.querySelector(".loading-screen");
				loading.classList.add("close");
				loading.addEventListener("transitionend", _ => {
					loading.remove();
				});
			}, 300);
		});
	};

	const init = _ => {
		page_loading();
	};
	(init)();
};

const rotateMenu = _ => {
	const 
		circle = document.querySelector(".foot-menu-circle")
	,	menus = circle.querySelectorAll("li")
	,	radius = circle.clientWidth / 2
	,	one_rad = 360 / menus.length
	,	distance = Math.round( radius * 0.75 );
	;

	const setEvents = function( events, callback ) {
		const 
			isNodeList = NodeList.prototype.isPrototypeOf( this )
		,	elements = isNodeList ? Array.prototype.slice.call( this ) : [this];
		;

		elements.forEach( elem => {
			events.forEach( evt => {
				elem.addEventListener( evt, callback )
			});
		});
	};

	NodeList.prototype.addEventsListener = setEvents;
	HTMLElement.prototype.addEventsListener = setEvents;

	const set_rotate = _ => {
		return new Promise( resolve => {
			menus.forEach(( menu, i ) => {
				let rotate = (one_rad * i);
				menu.style.setProperty("transform", `rotate(${ rotate }deg) translateY(-${ radius * 0.75 }px)`);
			});
			resolve();
		});
	};

	const event_listener = _ => {
		return new Promise( resolve => {
			menus.addEventsListener(["mousedown", "touchstart"], _ => {
				console.log("ok3");
			});
			circle.addEventsListener(["mousedown", "touchstart"], _ => {
				console.log("ok3");
			});
			resolve();
		});
	};

	const init = async _ => {
		await set_rotate();
		await event_listener();
	};

	(init)();
};

new commonFunction;
new rotateMenu;