const addEvent = (selector, event, func) => {
	const elements = document.querySelectorAll(selector);
	for (let i = 0; i < elements.length; i++) {
		elements[i].addEventListener(event, func);
	}

	return elements;
}

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) ) + min;

const gameResult = (me, comp) => {
	// udacagim variantlar
	// rock -> scissors
	// paper -> rock
	// scissors -> paper
	if(me === comp) {
		return 'Tie!';
	} else if((me === 'rock' && comp === 'scissors') || (me === 'paper' && comp === 'rock') || (me === 'scissors' && comp === 'paper')) {
		return 'You Win!';
	} else {
		return 'You Lose!';
	}
}

const types = ['rock', 'paper', 'scissors'];

const myButtons = addEvent('.js-btn', 'click', e => {
	const me = e.target.id; // ve ya e.target.getAttribute('id')
	const comp = types[random(0, types.length - 1)];
	const textPanel = document.querySelector('.result span');
	const hands = document.querySelectorAll('.hands');
	let countDown = 3;

	for (let i = 0; i < myButtons.length; i++) {
		myButtons[i].setAttribute('disabled', 'disabled');
	}

	textPanel.innerText = countDown; // set

	hands[0].setAttribute('src', 'left_fist.png');
	hands[1].setAttribute('src', 'right_fist.png');

	hands[0].classList.add('animate__animated');
	hands[1].classList.add('animate__animated');

	const timer = setInterval(() => {
		textPanel.innerText = --countDown;

		if(countDown === 0) {
			textPanel.innerText = 'Shoot!';
			hands[0].setAttribute('src', comp +'.png');
			hands[1].setAttribute('src', me +'.png');

			hands[0].classList.remove('animate__animated');
			hands[1].classList.remove('animate__animated');

			clearInterval(timer);
		}
	}, 1000);

	setTimeout(() => {
		textPanel.innerText = gameResult(me, comp);

		for (let i = 0; i < myButtons.length; i++) {
			myButtons[i].removeAttribute('disabled');
		}
	}, 3500);
});