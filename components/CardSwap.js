import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import gsap from 'gsap';

export const Card = memo(
  forwardRef(({ style, onClick, children, ...rest }, ref) => (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        borderRadius: '12px',
        border: '1px solid rgba(255,255,255,0.15)',
        background: '#000',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  ))
);
Card.displayName = 'Card';

const makeSlot = (i, distX, distY, total) => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i,
});

const placeNow = (el, slot, skew) =>
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true,
  });

// Returns scale + card-distance multiplier based on current width
const getBreakpointConfig = (w) => {
  if (w <= 480) {
    return {
      scale: 0.55,
      transform: 'translateX(-25%) translateY(25%) scale(0.55)',
      transformOrigin: 'bottom left',
    };
  }
  if (w <= 768) {
    return {
      scale: 0.75,
      transform: 'translateX(-25%) translateY(25%) scale(0.75)',
      transformOrigin: 'bottom left',
    };
  }
  return {
    scale: 1,
    transform: 'translateX(-5%) translateY(20%)',
    transformOrigin: 'bottom left',
  };
};

// Bucket width into a breakpoint key so state only updates on real category change
const getBreakpointKey = (w) => (w <= 480 ? 'sm' : w <= 768 ? 'md' : 'lg');

const CardSwap = ({
  width = 500,
  height = 400,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 5000,
  pauseOnHover = false,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children,
}) => {
  const config = useMemo(
    () =>
      easing === 'elastic'
        ? {
            ease: 'elastic.out(0.6,0.9)',
            durDrop: 2,
            durMove: 2,
            durReturn: 2,
            promoteOverlap: 0.9,
            returnDelay: 0.05,
          }
        : {
            ease: 'power1.inOut',
            durDrop: 0.8,
            durMove: 0.8,
            durReturn: 0.8,
            promoteOverlap: 0.45,
            returnDelay: 0.2,
          },
    [easing]
  );

  const childArr = useMemo(() => Children.toArray(children), [children]);
  const refs = useMemo(
    () => childArr.map(() => React.createRef()),
    [childArr]
  );

  const order = useRef(Array.from({ length: childArr.length }, (_, i) => i));
  const tlRef = useRef(null);
  const intervalRef = useRef();
  const container = useRef(null);
  const rafId = useRef(null);
  const bpKeyRef = useRef(
    getBreakpointKey(typeof window !== 'undefined' ? window.innerWidth : 1200)
  );

  // Track only the breakpoint bucket, not raw width - avoids re-render on every px
  const [breakpointKey, setBreakpointKey] = useState(bpKeyRef.current);

  const handleResize = useCallback(() => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const key = getBreakpointKey(window.innerWidth);
      if (key !== bpKeyRef.current) {
        bpKeyRef.current = key;
        setBreakpointKey(key);
      }
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [handleResize]);

  const breakpoint = useMemo(
    () => getBreakpointConfig(typeof window !== 'undefined' ? window.innerWidth : 1200),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [breakpointKey]
  );

  const swap = useCallback(() => {
    if (order.current.length < 2) return;

    const [front, ...rest] = order.current;
    const elFront = refs[front].current;
    const tl = gsap.timeline();
    tlRef.current = tl;

    tl.to(elFront, {
      y: '+=500',
      duration: config.durDrop,
      ease: config.ease,
    });

    tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);
    rest.forEach((idx, i) => {
      const el = refs[idx].current;
      const slot = makeSlot(i, cardDistance, verticalDistance, refs.length);
      tl.set(el, { zIndex: slot.zIndex }, 'promote');
      tl.to(
        el,
        {
          x: slot.x,
          y: slot.y,
          z: slot.z,
          duration: config.durMove,
          ease: config.ease,
        },
        `promote+=${i * 0.15}`
      );
    });

    const backSlot = makeSlot(refs.length - 1, cardDistance, verticalDistance, refs.length);
    tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
    tl.call(
      () => { gsap.set(elFront, { zIndex: backSlot.zIndex }); },
      undefined,
      'return'
    );
    tl.to(
      elFront,
      {
        x: backSlot.x,
        y: backSlot.y,
        z: backSlot.z,
        duration: config.durReturn,
        ease: config.ease,
      },
      'return'
    );

    tl.call(() => {
      order.current = [...rest, front];
    });
  }, [refs, cardDistance, verticalDistance, config]);

  useEffect(() => {
    const total = refs.length;
    refs.forEach((r, i) =>
      placeNow(r.current, makeSlot(i, cardDistance, verticalDistance, total), skewAmount)
    );

    swap();
    intervalRef.current = window.setInterval(swap, delay);

    if (pauseOnHover) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        clearInterval(intervalRef.current);
      };
      const resume = () => {
        tlRef.current?.play();
        intervalRef.current = window.setInterval(swap, delay);
      };
      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);
      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        clearInterval(intervalRef.current);
      };
    }

    return () => clearInterval(intervalRef.current);
  }, [refs, cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, swap]);

  const rendered = useMemo(
    () =>
      childArr.map((child, i) =>
        isValidElement(child)
          ? cloneElement(child, {
              key: i,
              ref: refs[i],
              style: { width, height, ...(child.props.style ?? {}) },
              onClick: (e) => {
                child.props.onClick?.(e);
                onCardClick?.(i);
              },
            })
          : child
      ),
    [childArr, refs, width, height, onCardClick]
  );

  const containerStyle = useMemo(
    () => ({
      position: 'absolute',
      bottom: 0,
      left: 0,
      width,
      height,
      perspective: '900px',
      overflow: 'visible',
      transform: breakpoint.transform,
      transformOrigin: breakpoint.transformOrigin,
    }),
    [width, height, breakpoint]
  );

  return (
    <div ref={container} style={containerStyle}>
      {rendered}
    </div>
  );
};

export default memo(CardSwap);