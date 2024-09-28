import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const initarr = Array(9).fill(null);
function App() {
	const [gridSize, setGridSize] = useState(3);
	const [board, setBoard] = useState(initarr);
	const [isX, setIsX] = useState(true);
	const [winner, setWinner] = useState("");

	const haveWinner = (rs, cs, index, tempBoard) => {
		//Check row for Winner
		const rowVal = tempBoard[index];
		const colVal = tempBoard[index];
		let rc = 0;
		let cc = 0;
		console.log("board", tempBoard);
		console.log("index", index);
		console.log("rs", rs);
		console.log("cs", cs);
		console.log("rowVal", rowVal);
		console.log("colVal", colVal);

		for (let k = rs; k < rs + gridSize; k++) {
			if (tempBoard[k] !== rowVal) {
				break;
			}
			rc = rc + 1;
		}
		if (rc === gridSize) {
			return rowVal;
		}
		//Check column for Winner
		for (let j = cs; j <= gridSize * gridSize - 1 + cs; j += gridSize) {
			if (tempBoard[j] !== colVal) {
				break;
			}
			cc = cc + 1;
		}
		if (cc === gridSize) {
			return colVal;
		}
		//Check diagnal for Winner-> Left
		let dlc = 0;
		for (let l = 0; l < gridSize * gridSize; l = l + gridSize + 1) {
			if (tempBoard[l] !== rowVal) {
				break;
			}
			dlc = dlc + 1;
		}
		if (dlc === gridSize) {
			return rowVal;
		}
		//Check diagnal for Winner-> Right
		let drc = 0;
		for (
			let m = gridSize - 1;
			m < gridSize * (gridSize - 1);
			m = m + gridSize - 1
		) {
			if (tempBoard[m] !== rowVal) {
				break;
			}
			drc = drc + 1;
		}
		if (drc === gridSize) {
			return rowVal;
		}

		return false;
	};
	const handleReset = () => {
		const initarrs = Array(gridSize * gridSize).fill(null);
		setBoard(initarrs);
		setIsX(true);
		setWinner("");
	};
	const handleClick = (e, index) => {
		const rs = Math.floor(index / gridSize) * gridSize;
		const cs = index % gridSize;

		const val = isX ? "X" : "O";
		const temp = [...board];
		temp[index] = val;
		setBoard(temp);
		setIsX(!isX);
		const winner = haveWinner(rs, cs, index, temp);
		if (winner) setWinner(winner);
	};
	const handleGridChange = (e) => {
		const val = e.target.value;
		setGridSize(val);
		setBoard(Array(val * val).fill(null));
	};
	return (
		<div className="App" style={{ "--sx": gridSize }}>
			<label> Enter the Grid Size</label>
			<input
				type="number"
				value={gridSize}
				onChange={handleGridChange}
			></input>
			<div className="parent">
				<div>
					{!!winner
						? `Player ${isX ? "O" : "X"} Won`
						: `Player ${isX ? "X" : "O"} turn`}
				</div>
				<div>
					<button onClick={handleReset}>Reset Game</button>
				</div>
			</div>
			<div className="board" style={{ "--sx": gridSize }}>
				{board.map((cell, index) => {
					return (
						<button
							className="cell"
							key={index}
							disabled={cell !== null}
							onClick={(e) => handleClick(e, index)}
						>
							{cell}
						</button>
					);
				})}
			</div>
		</div>
	);
}

export default App;
