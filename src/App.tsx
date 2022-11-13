import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Main } from "@layouts";
import { GameBoard } from "@pages/GameBoard";

export function App() {

	return (
		<Router>
			<div className="App">
				<Main>
					<Routes>
						<Route path="/" element={<GameBoard />} />
						<Route path="/statistics" element={<></>} />
					</Routes>
				</Main>
			</div>
		</Router>
	)
}
