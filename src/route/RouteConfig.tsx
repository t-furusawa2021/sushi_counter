import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Index } from "../components/Index"
import { Counter } from "../components/Counter"

export const RouteConfig = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/index" element={<Index />} />
					<Route path="/" element={<Counter />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}
