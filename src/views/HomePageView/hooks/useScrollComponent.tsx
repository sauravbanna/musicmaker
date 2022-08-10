import {useRef, useEffect, useState} from 'react'
import {gsap} from 'gsap'

function useScrollComponent(initial: number) : [any, any, () => void, () => void, boolean, boolean] {
    const scrollDiv = useRef<any>();
    const containerDiv = useRef<any>();
    const timeline = useRef<any>();

    const [scrollDivWidth, setScrollDivWidth] = useState<number>(0);
    const [containerWidth, setContainerWidth] = useState<number>(0);

    const [leftScroll, setLeftScroll] = useState<number>(initial);
    const [prevLeftScroll, setPrevLeftScroll] = useState<number>(initial);

    const [leftButtonActive, setLeftButtonActive] = useState<boolean>(false);
    const [rightButtonActive, setRightButtonActive] = useState<boolean>(true);

    useEffect(() => {
        setScrollDivWidth(scrollDiv.current.clientWidth);
        setContainerWidth(containerDiv.current.clientWidth);
    }, []);

    useEffect(() => {
        if (containerWidth != 0) {
            checkButtons();
        }
    }, [containerWidth])

    const VELOCITY = 600;

    useEffect(() => {
        timeline.current = gsap.timeline({repeat: 0}).fromTo(
            scrollDiv.current,
            {left: prevLeftScroll + "px"},
            {
                left: leftScroll + "px",
                duration: Math.abs(leftScroll - prevLeftScroll) / VELOCITY,
                repeat: 0,
                ease: "none"
            }
        );
        checkButtons();
    }, [leftScroll])

    const checkButtons = () => {
        setLeftButtonActive(leftScroll < initial);
        setRightButtonActive(leftScroll - containerWidth > -1 * scrollDivWidth);
    }

    const onClickLeft = () => {
        if (leftButtonActive) {
            setPrevLeftScroll(leftScroll);
            if (leftScroll + containerWidth > initial) {
                setLeftScroll(initial);
            } else {
                setLeftScroll((prev: number) => prev + containerWidth);
            }
        }

    }

    const onClickRight = () => {
        if (rightButtonActive) {
            setPrevLeftScroll(leftScroll);
            if (leftScroll - 2 * containerWidth < -1 * scrollDivWidth) {
                setLeftScroll(-1 * (scrollDivWidth - containerWidth));
            } else {
                setLeftScroll((prev: number) => prev - containerWidth);
            }
        }

    }

    return [scrollDiv, containerDiv, onClickLeft, onClickRight, leftButtonActive, rightButtonActive];
}

export default useScrollComponent