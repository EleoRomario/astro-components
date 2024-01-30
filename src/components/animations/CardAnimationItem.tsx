import {
  memo,
  type ComponentType,
  type SVGProps,
  useRef,
  useEffect,
} from "react";
import { hexToAlpha } from "../../helpers/hextToAlpha";
import {
  ChangingTextElement,
  type ChangingTextElementRef,
} from "./ChangingTextElement";
import { ItemIconNode } from "../icons/ItemIconNode";

type ItemProps = {
  vertical: "top" | "bottom";
  horizontal: "left" | "right";
  previousName?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  section: string;
  name: string;
  color: string;
  rayClassName?: string;
};

export const CardAnimationItem = memo(
  function ItemBase({
    vertical,
    horizontal,
    previousName,
    icon: Icon,
    section,
    name,
    color,
    rayClassName,
  }: ItemProps) {
    const ref = useRef<ChangingTextElementRef>(null);

    useEffect(() => {
      if (ref.current) {
        ref.current.start();
      }
    }, [name]);

    return (
      <div
        className={`min-w-[207px] rounded-[64px] bg-gray-0 border border-solid border-gray-300 flex items-center justify-between relative ${horizontal === "right" ? "flex-row-reverse" : "flex-row"}`}
      >
        <div
          className="flex-shrink-0 w-[64px] h-[62px] relative animate-opacity-reveal"
          key={name}
        >
          <Icon
            className="drop-shadow-none"
            style={{
              transform: "translateZ(0)",
              filter: `drop-shadow(0px 0px 20px ${hexToAlpha(color, 0.75)}) drop-shadow(0px 0px 30px ${hexToAlpha(color, 0.5)})`,
            }}
          />
        </div>
        <div
          className={`flex-1 py-[14px] ${horizontal === "left" && "pr-6"} ${horizontal === "right" && "pl-6"} `}
        >
          <div
            className={`font-disket font-bold text-gray-500 uppercase text-xs ${horizontal === "left" && "text-left"} ${horizontal === "right" && "text-right"}`}
          >
            {section}
          </div>
          <div
            className={`font-medium text-xs text-gray-600 ${horizontal === "left" && "text-left"} ${horizontal === "right" && "text-right"}`}
          >
            <ChangingTextElement
              ref={ref}
              first={previousName ?? name}
              second={name}
              tick={50}
            />
          </div>
        </div>
        <ItemIconNode
          className={`stroke-gray-300/20 fill-gray-400 absolute ${horizontal === "right" ? "-scale-x-100 right-7" : "scale-x-100 left-7"} ${vertical === "bottom" ? "-scale-y-100 bottom-full -mb-px" : "scale-y-100 top-full -mt-px"}`}
        />
        <div
          className={`w-[172px] h-[100px] absolute overflow-hidden z-[1] ${horizontal === "right" ? "-scale-x-100 right-7" : "scale-x-100 left-7"} ${
            vertical === "bottom"
              ? "-scale-y-100 bottom-full -mb-px"
              : "scale-y-100 top-full -mt-px"
          }`}
          style={{
            maskType: "alpha",
            WebkitMaskImage:
              "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
            maskImage:
              "url(https://refine.ams3.cdn.digitaloceanspaces.com/website/static/landing-hero-animation/hero-beam-mask.svg)",
          }}
        >
          <div
            key={name}
            className={`w-[calc(172px*2)] h-[calc(172px*2)] left-0 top-0 absolute animate-beam-spin will-change-transform bg-svg ${rayClassName}`}
            style={{
              color,
            }}
          />
        </div>
      </div>
    );
  },
  (p, n) => p.name === n.name,
);
