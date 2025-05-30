import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { Page } from './components/page'
import { AuthHOC } from './HOC/auth'
import { Provider } from 'react-redux'
import { store } from './services/store'
import { AppRoomContent } from './components/content/room'
import { ModalHOC } from './HOC/modal'

export const App = () => {
    return (
        <Provider store={store}>
            <AuthHOC>
                <ModalHOC>
                    <BrowserRouter>
                        <Routes>
                            <Route path="messenger" element={<Page />} >
                                <Route path=':roomId' element={<AppRoomContent />} />
                            </Route>
                            <Route path="*" element={<div>404</div>} />
                        </Routes>
                    </BrowserRouter>
                </ModalHOC>
            </AuthHOC>
        </Provider>
    )
}
