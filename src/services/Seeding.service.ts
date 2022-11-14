import { SeedState } from "@interfaces/minegame/SeedState";

const state: SeedState = {
	seed: generateRandom()
}

function generateRandom(length: number = 12, characters: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789") {
	const charLen = characters.length;
	const output: string[] = []
	for (let i = 0; i < length; i++) {
		const charIdx = Math.floor(Math.random() * charLen);
		output.push(characters.charAt(charIdx))
	}
	return output.join("")
}

function changeCurrentSeed(newSeed = "") {
	if (!newSeed) newSeed = generateRandom();
	state.seed = newSeed;
}

function getCurrentState() {
	return state;
}

export default {
	generateRandom,
	getCurrentState,
	changeCurrentSeed
}
