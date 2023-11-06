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
	,	menus = circle.querySelectorAll("a, button")
	,	radius = circle.clientWidth / 2
	,	distance = Math.round( radius * 0.75 );
	;

	const init = _ => {
		console.log( radius );
		menus.forEach(( menu, i ) => {
			menu.style.setProperty("transform", `translate(0, -${distance}px)`);
		});
	};

	(init)();
};

new commonFunction;
new rotateMenu;