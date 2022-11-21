import { useContext, useEffect, useRef, useState } from "react";
import colors from "tailwindcss/colors";
import flag from "@assets/flag.svg";

import { Coordinates } from "@interfaces/minegame/Coordinates";
import GeometryService from "@services/Geometry.service";
import { NodeState } from "@interfaces/minegame/NodeState";
import { BoardStateContext } from "@contexts/BoardProvider";

export interface CanvasBoardRendererProps {
	nodes: NodeState[];
	nodeClick: (uuid: string) => void;
	rightClick: (uuid: string) => void;
	width: number;
	height: number;
}

export function CanvasBoardRenderer({ nodes, nodeClick, rightClick, width, height }: CanvasBoardRendererProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const effectCanvasRef = useRef<HTMLCanvasElement>(null);

	let [ctx, setCtx] = useState<CanvasRenderingContext2D | undefined>(undefined);
	let [effectCtx, setEffectCtx] = useState<CanvasRenderingContext2D | undefined>(undefined);
	const [selectedCoordinates, setSelectedCoordinates] = useState<Coordinates[]>(
		[]
	);
	const [click, setClick] = useState(false);
	const [nodeLength, setNodeLength] = useState(-1);
	const [nodeSize, setNodeSize] = useState(50);
	const state = useContext(BoardStateContext);
	const img = new Image();

	const renderNodeSize = 50;
	const canvasZoom = 1.5;

	useEffect(() => {

		performRender();

		const effectCnv = effectCanvasRef.current;
		if (nodes.length == 0) return;
		if (!effectCnv) return;

		const nodeCount = nodes.length;
		if (nodeCount !== nodeLength) {
			updateCanvasesSize();
			setNodeLength(nodeCount);
		};
	}, [nodes])

	useEffect(() => {
		performRender();
	}, [selectedCoordinates, ctx, effectCtx, click])

	useEffect(() => {
		const cnv = canvasRef.current;
		const effectCnv = effectCanvasRef.current;
		if (!cnv) return;
		if (!effectCnv) return;

		updateCanvasesSize();

		// Setting contexts
		setCtx(cnv.getContext("2d") ?? undefined);
		setEffectCtx(effectCnv.getContext("2d") ?? undefined);

	}, [canvasRef, effectCanvasRef]);

	function onLeave(_: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		setSelectedCoordinates([]);
	}

	function onMove(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		const innerPosition = calculateInnerPosition(e.nativeEvent)
		// Calculate node coordinates
		if (insideGameArea(innerPosition)) {
			const coords = calculateCoordinates(innerPosition, nodeSize);
			if (state.clickMode == "spread") {
				setSelectedCoordinates(getSurroundingCoordinates(coords))
			} else {
				setSelectedCoordinates([coords]);
			}
		} else {
			setSelectedCoordinates([]);
		}
	}
	function onMouseDown(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		setClick(true);
	}

	function onMouseUp(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		setClick(false)
	}

	function onClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		if (nodes.length == 0) return;
		const innerPosition = calculateInnerPosition(e.nativeEvent);
		const coords = calculateCoordinates(innerPosition, nodeSize);
		const index = GeometryService.coordinatesToIndex(coords, width);
		const node = nodes[index];
		nodeClick(node.uuid);
	}

	function onRightClick(e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) {
		if (nodes.length == 0) return;
		const innerPosition = calculateInnerPosition(e.nativeEvent);
		const coords = calculateCoordinates(innerPosition, nodeSize);
		const index = GeometryService.coordinatesToIndex(coords, width);
		const node = nodes[index];
		rightClick(node.uuid);
	}

	function updateCanvasesSize() {
		const cnv = canvasRef.current;
		const effectCnv = effectCanvasRef.current;
		if (!cnv) return;
		if (!effectCnv) return;
		const ratio = window.devicePixelRatio;
		// Canvas size set
		const calculatedNodeSize = renderNodeSize * ratio * canvasZoom;
		setNodeSize(calculatedNodeSize);
		cnv.width = (width + 2) * calculatedNodeSize;
		cnv.height = (height + 2) * calculatedNodeSize;
		effectCnv.width = (width + 2) * calculatedNodeSize;
		effectCnv.height = (height + 2) * calculatedNodeSize;
	}

	function getSurroundingCoordinates({ x: cx, y: cy }: Coordinates) {
		const output: Coordinates[] = [];
		for (let y = -1; y <= 1; y++) {
			for (let x = -1; x <= 1; x++) {
				const finalCoord = {
					x: cx + x,
					y: cy + y,
				}
				if (finalCoord.x < 0 || finalCoord.x >= width
					|| finalCoord.y < 0 || finalCoord.y >= height) continue;
				output.push(finalCoord)
			}
		}
		return output;
	}

	function insideGameArea({ x, y }: Coordinates) {
		return x > nodeSize && x < ((width + 1) * nodeSize) && y > nodeSize && y < ((height + 1) * nodeSize);
	}

	function calculateInnerPosition(e: MouseEvent) {
		const canvas = e.target as HTMLCanvasElement;
		// Pick canvas inner position based on mouse position
		const { x: canvasX, y: canvasY }: Coordinates =
			canvas.getBoundingClientRect();
		return { x: e.x - canvasX, y: e.y - canvasY };
	}

	function performRender() {
		if (!ctx) return;
		if (!effectCtx) return;
		drawNodes();
		renderSelection();
	}

	function calculateCoordinates(
		{ x, y }: Coordinates,
		nodeSize: number
	): Coordinates {
		// Calculates the indexes based on the parameters from the inner positioning
		// Floors the value using modulus cause of quickest results
		// (https://www.measurethat.net/Benchmarks/Show/953/0/floor-vs-trunc-vs-bitwise-hacks-0-etc)
		const xRaw = x / nodeSize;
		const yRaw = y / nodeSize;
		return {
			x: xRaw - (xRaw % 1) - 1,
			y: yRaw - (yRaw % 1) - 1,
		} as Coordinates;
	}

	function drawRounded(
		ctx: CanvasRenderingContext2D,
		x: number,
		y: number,
		width: number,
		height: number,
		radius: number
	) {
		// Extracted from https://codepen.io/simon-wu/pen/ExgLEXQ
		// By SimonWu
		if (ctx == null) return;
		if (width < 2 * radius) radius = width / 2;

		if (height < 2 * radius) radius = height / 2;
		ctx.beginPath();
		ctx.moveTo(x + radius, y);
		ctx.arcTo(x + width, y, x + width, y + height, radius);
		ctx.arcTo(x + width, y + height, x, y + height, radius);
		ctx.arcTo(x, y + height, x, y, radius);
		ctx.arcTo(x, y, x + width, y, radius);
		ctx.closePath();
	}

	function renderBlock(ctx: CanvasRenderingContext2D, { x, y }: Coordinates, size: number) {
		drawRounded(ctx, x, y, size, size, 7.5);
		ctx.fill();
		ctx.stroke();
	}

	function renderNode(node: NodeState, { x, y }: Coordinates) {
		if (!ctx) return;
		const position = {
			x: x * nodeSize + nodeSize,
			y: y * nodeSize + nodeSize,
		} as Coordinates;

		if (!node.open) {
			// Closed node style
			ctx.fillStyle = colors.stone[100];
			ctx.strokeStyle = colors.gray[300];
			ctx.lineWidth = 1;

			renderBlock(ctx, position, nodeSize);
		} else {
			if (node.mined) {
				ctx.fillStyle = colors.red[500];
				ctx.strokeStyle = colors.red[600];
			} else {
				ctx.fillStyle = colors.gray[300];
				ctx.strokeStyle = colors.gray[200];
			}
			renderBlock(ctx, position, nodeSize);

			// Draw X on mined
			if (node.mined) {
				ctx.fillStyle = "#FFF";
				ctx.fillText("x", position.x + (nodeSize / 3), position.y + (nodeSize / 1.5));
			}

			// Draw node text
			ctx.fillStyle = "#000";
			if (node.mineCount != 0)
				ctx.fillText(node.mineCount.toString(), position.x + (nodeSize / 3), position.y + (nodeSize / 1.5));
		}

		if (!node.open && node.flagged) {
			if (!img.src) {
				img.src = flag;
			}
			const size = img.width * window.devicePixelRatio * canvasZoom;
			ctx.drawImage(img, position.x - (size * 0.025), position.y, size, size);
		}
	}

	function drawNodes() {
		if (!ctx) return;
		const nodeCount = nodes.length;
		const fontSize = 1.5 * canvasZoom * window.devicePixelRatio;
		ctx.font = `bold ${fontSize}rem 'Rubik', sans-serif`;
		for (let i = 0; i < nodeCount; i++) {
			const node = nodes[i];
			const { x, y } = GeometryService.indexToCoordinates(i, width);
			renderNode(node, { x, y });
		}
	}

	function renderSelection() {
		if (!effectCtx) return;
		effectCtx.lineWidth = 3;
		effectCtx.strokeStyle = click ? colors.purple[600] : colors.red[500];
		effectCtx.fillStyle = `${click ? colors.purple[500] : colors.red[500]}80`;
		effectCtx.clearRect(0, 0, effectCtx.canvas.width, effectCtx.canvas.height);

		const percent = 0.925;
		const size = nodeSize * percent;
		const offset = (nodeSize / 2) - (size / 2);
		selectedCoordinates.forEach(({ x, y }: Coordinates) => {
			const position = {
				x: x * nodeSize + nodeSize + offset,
				y: y * nodeSize + nodeSize + offset,
			} as Coordinates;
			renderBlock(effectCtx!, position, size);
		})
	}

	return (
		<section className="relative flex w-full h-full">
			<canvas className="absolute inset-0 m-auto mt-16" ref={canvasRef}></canvas>
			<canvas onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick} onMouseDown={onMouseDown} onMouseUp={onMouseUp} onAuxClick={onRightClick} className="absolute inset-0 m-auto mt-16" ref={effectCanvasRef}></canvas>
		</section>
	);
}
