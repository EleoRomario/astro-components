import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

type Props = {
  first: string;
  second: string;
  onEnd?: () => void;
  tick?: number;
  className?: string;
  prevClassName?: string;
  nextClassName?: string;
  activeClassName?: string;
};
export type ChangingTextElementRef = {
  start: () => void;
  reset: () => void;
};

export const ChangingTextElement = memo(
  forwardRef<ChangingTextElementRef, Props>(function ChangingText(
    {
      first,
      second,
      onEnd,
      tick = 75,
      className,
      prevClassName,
      nextClassName,
      activeClassName,
    },
    ref,
  ) {
    const maxLen = Math.max(first.length, second.length);
    const prev = first.padEnd(maxLen, " ");
    const next = second.padEnd(maxLen, " ");
    const [pos, setPos] = useState(-1);
    const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
    useImperativeHandle(ref, () => ({
      start: () => {
        setPos(-1);
        setStatus("running");
      },
      reset: () => {
        setPos(-1);
        setStatus("idle");
      },
    }));

    useEffect(() => {
      if (status === "running") {
        setPos(-1);
      }
    }, [status]);

    useEffect(() => {
      if (status === "running") {
        const timer = setInterval(() => {
          setPos((prev) => {
            if (prev === maxLen - 1) {
              setStatus("done");
              return prev;
            }

            return prev + 1;
          });
        }, tick);
        return () => clearInterval(timer);
      }
    }, [status, maxLen, tick]);

    useEffect(() => {
      if (status === "done") {
        onEnd?.();
      }
    }, [status]);

    return (
      <span className={`will-change-contents ${className}`}>
        <span className={`will-change-contents ${prevClassName}`}>
          {next
            .split("")
            .slice(0, Math.max(pos, 0))
            .map((letter) => {
              return letter;
            })}
        </span>
        <span className={`will-change-contents ${activeClassName}`}>
          {next.split("")[pos] ?? ""}
        </span>
        <span className={`will-change-contents ${nextClassName}`}>
          {prev
            .split("")
            .slice(pos + 1)
            .map((letter) => {
              return letter;
            })}
        </span>
      </span>
    );
  }),
  (prev, next) => {
    return (
      prev.first === next.first &&
      prev.second === next.second &&
      prev.tick === next.tick &&
      prev.className === next.className &&
      prev.prevClassName === next.prevClassName &&
      prev.nextClassName === next.nextClassName &&
      prev.activeClassName === next.activeClassName
    );
  },
);
