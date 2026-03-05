CloudDeploy[
  FormFunction[{"UploadExcel" -> "File"},
    Module[{data = Import[#UploadExcel, "Data"]},
      BarChart[data[[2 ;;, 2]], ChartLabels -> data[[2 ;;, 1]]]
    ] &],
  "auraCloudPlot"
]
