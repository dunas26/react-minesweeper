
const messages: { [key: string]: string } = {
	game_lost: "Wish you luck next time",
	game_won: "You've won the game!",
	game_preparing: "Please wait while we prepare your board",
	no_value: "No value provided",
	difficulty_veryeasy: "Very easy",
	difficulty_easy: "Easy",
	difficulty_medium: "Medium",
	difficulty_hard: "Hard",
	difficulty_extremelyhard: "Extremely hard",
	difficulty_impossible: "Impossible",
	warning_override: "This action will override your current board and your current game. Proceed with caution",
	title_statistics: "Your statistics",
	title_timeinfo: "Gametime information",
	title_difficultyinfo: "Game difficulty analysis",
	kpi_hours: "Total board hours",
	kpi_lastboard: "Last completed board date",
	kpi_won: "Wins",
	kpi_lost: "Losses",
	kpi_played: "Played",
	kpi_avghours: "Average solve time",
	button_startdaily: "Start the daily challenge",
	text_startdaily: "Welcome to our daily challenge. You only have 3 opportunities to solve a predefined hard challenge. Wish you luck",
	text_nodaily: "You've reached your limit of daily tries. You can try again your next challenge for tomorrow"

}

function getMessage(key: string): string {
	return key in messages ? messages[key] : "unknown message";
}

export default {
	getMessage
}
