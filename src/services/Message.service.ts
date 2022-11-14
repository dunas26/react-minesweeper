
const messages: { [key: string]: string } = {
	game_gameover: "Don't worry. You can try again.",
	game_preparing: "Please wait while we prepare your board.",
}

function getMessage(key: string): string {
	return key in messages ? messages[key] : "unknown message";
}

export default {
	getMessage
}
