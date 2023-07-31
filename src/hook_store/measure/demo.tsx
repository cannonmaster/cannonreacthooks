import useMeasure from "./measure";
const TestUseMeasure = () => {
  const [rect, ref] = useMeasure();

  return (
    <div>
      <div
        style={{ width: "100%", height: "100px", backgroundColor: "cyan" }}
        ref={ref}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          resize the window to see the element mesaure
        </div>
      </div>

      <div>width: {rect.width}</div>
      <div>height: {rect.height}</div>
    </div>
  );
};
export default TestUseMeasure;
