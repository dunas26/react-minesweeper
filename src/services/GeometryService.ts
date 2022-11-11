import { Coordinates } from "@interfaces/minegame/Coordinates";

export default {
	indexToCoordinates: function(idx: number, width: number) {
		return {
			x: idx % width,
			y: Math.floor(idx / width)
		};
	},
	coordinatesToIndex: function({ x, y }: Coordinates, width: number) {
		return y * width + x;
	}
}
