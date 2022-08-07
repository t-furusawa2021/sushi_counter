import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Index } from "../components/Index"
import { Counter } from "../components/Counter"
import { Chart } from "../components/Chart"

export const RouteConfig = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/index" element={<Index />} >
						<Route path="chart/:date" element={<Chart />} />
					</Route>
					<Route path="/" element={<Counter />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
