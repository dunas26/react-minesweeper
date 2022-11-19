import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "@layouts";
import { Daily, GameBoard, Ranking, Statistics } from "@pages";

export function App() {

	return (
		<Router>
			<div className="App">
				<Main>
					<Routes>
						<Route path="/" element={<GameBoard />} />
						<Route path="/statistics" element={<Statistics />} />
						<Route path="/ranking" element={<Ranking />} />
						<Route path="/daily" element={<Daily />} />
					</Routes>
				</Main>
			</div>
		</Router>
	)
}
