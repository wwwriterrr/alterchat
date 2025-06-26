import { useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getRoomsLoading, setRoomsLoad } from '../../services/rooms/slice';

export const RoomsLoader = () => {
    const loaderRef = useRef<HTMLDivElement>(null);

    const dispatch = useAppDispatch();

    const pending = useAppSelector(getRoomsLoading);

    useEffect(() => {
        if(!loaderRef.current) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting){
                    if(pending) return;

                    console.log('Load rooms');
                    dispatch(setRoomsLoad(true));
                    setTimeout(() => {
                        dispatch(setRoomsLoad(false));
                    }, 2000)
                }
            })
        }, {
            rootMargin: '200px',
        })

        observer.observe(loaderRef.current);

        return () => {
            if(!loaderRef.current) return;

            // observer.unobserve(ref.current);
            observer.disconnect();
        }
    }, [])

    return (
        <div ref={loaderRef} style={{height: 30, width: '100%'}}></div>
    )
}
