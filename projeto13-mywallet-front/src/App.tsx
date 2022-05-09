import {useState} from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import UserContext from "./contexts/UserContext";
import Entries from "./pages/Entries";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { EntryTypes } from "./pages/Entries/types";
import { AuthTypes } from "./pages/Auth/types";
import GlobalStyles from "./styles/GlobalStyles";

export default () => {
	
	const [name, setName] = useState<string>("");
	const [token, setToken] = useState<string>("");

	return (
		<>
			<GlobalStyles/>
			<UserContext.Provider value={{name, token}}>
				<BrowserRouter>
					<Routes>
						<Route
							path="/"
							element={
								<Auth
									setName={setName}
									setToken={setToken}
									type={AuthTypes.LOGIN}
								/>
							}
						/>
						<Route
							path="/register"
							element={<Auth type={AuthTypes.REGISTER} />}
						/>
						<Route path="/home" element={<Home name={name}/>} />
						<Route path="/newcredit" element={<Entries type={EntryTypes.NEWCREDIT}/>} />
						<Route path="/newdebit" element={<Entries type={EntryTypes.NEWDEBIT}/>} />
						<Route path="/editentry" element={<Entries type={EntryTypes.EDITENTRY}/>} />
						<Route path="/deletentry" element={<Entries type={EntryTypes.DELETEENTRY}/>} />
					</Routes>
				</BrowserRouter>
			</UserContext.Provider>
		</>
	);
};
