import {useRef, useEffect, useState} from 'react'
import {gsap} from 'gsap'

function useScrollComponent(initial: number) : [any, () => void, () => void, boolean, boolean] {
    const scrollDiv = useRef<any>();
    const timeline = useRef<any>();

    const [leftScroll, setLeftScroll] = useState<number>(initial);
    const [prevLeftScroll, setPrevLeftScroll] = useState<number>(initial);

    const [leftButtonActive, setLeftButtonActive] = useState<boolean>(false);
    const [rightButtonActive, setRightButtonActive] = useState<boolean>(true);

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0}).fromTo(
            scrollDiv.current,
            {left: prevLeftScroll + "%"},
            {
                left: leftScroll + "%",
                duration: 2,
                repeat: 0,
                ease: "none"
            }
        );

        setLeftButtonActive(leftScroll + 100 <= initial);
    }, [leftScroll])

    const onClickLeft = () => {
        if (leftButtonActive) {
            setPrevLeftScroll(leftScroll);
            setLeftScroll((prev: number) => prev + 100);
        }

    }

    const onClickRight = () => {
        if (rightButtonActive) {
            setPrevLeftScroll(leftScroll);
            setLeftScroll((prev: number) => prev - 100);
        }

    }

    return [scrollDiv, onClickLeft, onClickRight, leftButtonActive, rightButtonActive];
}

export default useScrollComponent