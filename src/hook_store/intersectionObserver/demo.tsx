import { useIntersectionObserver } from "@cannonui/reacthooks";

type useIntersectionObserverType = [
  React.RefObject<HTMLDivElement>,
  IntersectionObserverEntry
];
const TestUseIntersectionObserver = () => {
  const [ref, entry]: useIntersectionObserverType =
    useIntersectionObserver() as useIntersectionObserverType;

  return (
    <>
      <div
        ref={ref}
        style={{ width: "300px", height: "100px", backgroundColor: "cyan" }}
      >
        Element to observe
      </div>
      <div>
        {entry?.isIntersecting
          ? "element is visible"
          : "element is not visible"}
      </div>
    </>
  );
};

export default TestUseIntersectionObserver;
