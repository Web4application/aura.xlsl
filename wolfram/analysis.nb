(* ====================================== *)
(* dashboard.wl: Visuals & data insights  *)
(* ====================================== *)

(* Load spreadsheet *)
dataset = Import["wolfram/aura_analysis.xlsx", "Data"][[1]]; 
cleaned = Rest[dataset];

(* Bar chart of scores *)
BarChart[
  cleaned[[All, 2]],
  ChartLabels -> cleaned[[All, 1]],
  ChartStyle -> "Pastel",
  PlotLabel -> "Scores Distribution"
]

(* Optional: Scatter plot Value vs Score *)
ListPlot[
  cleaned[[All, {2, 3}]],
  PlotStyle -> Red,
  PlotLabel -> "Score vs Value",
  AxesLabel -> {"Score", "Value"}
]
