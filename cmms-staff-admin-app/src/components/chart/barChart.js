const barChartConfig = (data) => ({
  data,
  xField: "type",
  yField: "value",
  colorField: "type",
  state: {
    unselected: { opacity: 0.5 },
    selected: { lineWidth: 3, stroke: "red" },
  },
  interaction: {
    elementSelect: true,
  },
  onReady: ({ chart, ...rest }) => {
    chart.on(
      "afterrender",
      () => {
        const { document } = chart.getContext().canvas;
        const elements = document.getElementsByClassName("element");
        elements[0]?.emit("click");
      },
      true
    );
  },
});

export default barChartConfig;
