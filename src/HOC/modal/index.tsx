import { type FC } from 'react';
import { ModalComponent } from '../../components/modal';

export const ModalHOC: FC<{children: JSX.Element}> = ({children}) => {
    return (
        <>
            <ModalComponent />
            {children}
        </>
    )
}
