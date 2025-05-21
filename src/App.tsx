import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Page } from './components/page'
import { AuthHOC } from './HOC/auth'
import { Provider } from 'react-redux'
import { store } from './services/store'

export const App = () => {
    return (
        <Provider store={store}>
            <AuthHOC>
                <BrowserRouter>
                    <Routes>
                        <Route path="messenger" element={<Page />} >
                            <Route path=':roomId' element={<Page />} />
                        </Route>
                        <Route path="*" element={<div>404</div>} />
                    </Routes>
                </BrowserRouter>
            </AuthHOC>
        </Provider>
    )
}
