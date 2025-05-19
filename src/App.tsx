import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Page } from './components/page'

export const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="messenger" element={<Page />} >
                    <Route path=':roomId' element={<Page />} />
                </Route>
                <Route path="*" element={<div>404</div>} />
            </Routes>
        </BrowserRouter>
    )
}
