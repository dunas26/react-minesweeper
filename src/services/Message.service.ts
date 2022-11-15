
const messages: { [key: string]: string } = {
	game_lost: "Wish you luck next time.",
	game_won: "You've won the game!",
	game_preparing: "Please wait while we prepare your board.",
	no_value: "No value provided."
}

function getMessage(key: string): string {
	return key in messages ? messages[key] : "unknown message";
}

export default {
	getMessage
}
