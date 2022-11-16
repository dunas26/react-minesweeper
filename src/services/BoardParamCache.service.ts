import { BoardBuildParams } from "@interfaces/minegame/BoardBuildParams";

const PARAMS_KEY = "buildparams";

function validParams(params: BoardBuildParams) {
	return !!params
		&& params.minePercent >= 0.05 && params.minePercent <= 0.95
		&& params.height >= 3
		&& params.width >= 3;
}

function buildParamCacheValue(params: BoardBuildParams) {
	return `${params.width}:${params.height}:${params.minePercent}`;
}

function parseBuildParamCache(cache: string): BoardBuildParams {
	const parts = cache.split(":");
	const [rawWidth, rawHeight, rawMinePercent] = parts;
	const width = parseInt(rawWidth);
	const height = parseInt(rawHeight);
	const minePercent = parseFloat(rawMinePercent);
	return { width, height, minePercent };
}

function saveParams(params: BoardBuildParams) {
	if (!validParams(params)) return;
	const cache = buildParamCacheValue(params);
	localStorage.setItem(PARAMS_KEY, cache);
}

function getParams(): BoardBuildParams | undefined {
	const cache = localStorage.getItem(PARAMS_KEY);
	if (!cache) return undefined;
	const params = parseBuildParamCache(cache);
	if (!validParams(params)) return undefined;
	return params;
}

function clearParams() {
	localStorage.removeItem(PARAMS_KEY);
}

export default {
	saveParams,
	getParams,
	clearParams
}

