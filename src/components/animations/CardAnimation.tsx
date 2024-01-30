import {
  useRef,
  type ComponentType,
  type SVGProps,
  useState,
  useEffect,
  memo,
} from "react";
import { Vite } from "../icons/Vite";
import { NextJS } from "../icons/NextJS";
import { Remix } from "../icons/Remix";
import { CardAnimationItem } from "./CardAnimationItem";
import { useInView } from "framer-motion";

type ItemType = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  name: string;
  color: string;
  rayClassName?: string;
};
const platformItems: ItemType[] = [
  {
    name: "Vite",
    icon: Vite,
    color: "#ffa800",
  },
  {
    name: "Next.js",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <NextJS {...props} className={`text-gray-1000 ${props.className}`} />
    ),
    color: "#ffffff",
    rayClassName: "!text-gray-1000",
  },
  {
    name: "Remix",
    icon: (props: SVGProps<SVGSVGElement>) => (
      <Remix {...props} className={`text-gray-1000 ${props.className}`} />
    ),
    color: "#ffffff",
    rayClassName: "!text-gray-1000",
  },
];

export const CardAnimation = memo(function HeroAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const [activePlatform, setActivePlatform] = useState(0);

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActivePlatform((prev) => (prev + 1) % platformItems.length);
      }, 8000);
      return () => clearInterval(interval);
    }
  }, [inView]);

  return (
    <div ref={ref} className="">
      <div className="relative w-min flex gap-40">
        <CardAnimationItem
          vertical="top"
          horizontal="left"
          section="react platform"
          {...platformItems[activePlatform]}
          previousName={
            platformItems[
              (activePlatform - 1 + platformItems.length) % platformItems.length
            ].name ?? platformItems[activePlatform].name
          }
        />
        {/* <CardAnimationItem
          vertical="top"
          horizontal="right"
          section="ui framework"
          {...uiItems[activeUI]}
          previousName={
            uiItems[(activeUI - 1 + uiItems.length) % uiItems.length].name ??
            uiItems[activeUI].name
          }
        /> */}
      </div>
    </div>
  );
});
