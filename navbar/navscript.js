function changeTab(tab){
	switch(tab){
		case 'index':
		document.getElementById("homeTab").classList.add('active');
		document.getElementById("artistTab").classList.remove('active');
		document.getElementById("albumTab").classList.remove('active');
		document.getElementById("trackTab").classList.remove('active');
		document.getElementById("nav_title").innerHTML="Home";
		break;
		case 'artist':
		document.getElementById("homeTab").classList.remove('active');
		document.getElementById("artistTab").classList.add('active');
		document.getElementById("albumTab").classList.remove('active');
		document.getElementById("trackTab").classList.remove('active');
		document.getElementById("nav_title").innerHTML="Artist";
		break;
		case 'album':
		document.getElementById("homeTab").classList.remove('active');
		document.getElementById("artistTab").classList.remove('active');
		document.getElementById("albumTab").classList.add('active');
		document.getElementById("trackTab").classList.remove('active');
		document.getElementById("nav_title").innerHTML="Albums";
		break;
		case 'track':
		document.getElementById("homeTab").classList.remove('active');
		document.getElementById("artistTab").classList.remove('active');
		document.getElementById("albumTab").classList.remove('active');
		document.getElementById("trackTab").classList.add('active');
		document.getElementById("nav_title").innerHTML="Tracks";
		break;
	}
}