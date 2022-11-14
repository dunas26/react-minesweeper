
const messages: { [key: string]: string } = {
	game_gameover: "Wish you luck next time.",
	game_preparing: "Please wait while we prepare your board.",
}

function getMessage(key: string): string {
	return key in messages ? messages[key] : "unknown message";
}

export default {
	getMessage
}
