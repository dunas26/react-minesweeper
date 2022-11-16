
const messages: { [key: string]: string } = {
	game_lost: "Wish you luck next time",
	game_won: "You've won the game!",
	game_preparing: "Please wait while we prepare your board",
	no_value: "No value provided",
	difficulty_very_easy: "Very easy",
	difficulty_easy: "Easy",
	difficulty_medium: "Medium",
	difficulty_hard: "Hard",
	difficulty_extremely_hard: "Extremely hard",
	difficulty_impossible: "Impossible",
	warning_override: "This action will override your current board and your current game. Proceed with caution",
}

function getMessage(key: string): string {
	return key in messages ? messages[key] : "unknown message";
}

export default {
	getMessage
}
