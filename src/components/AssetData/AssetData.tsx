import React from "react";
import Assets from "../../interfaces/assets";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

import "./style.css";

interface AssetDataProps {
  asset: Assets;
}

function AssetData(props: AssetDataProps) {
  const chooseColor = (health: number) => {
    if (health >= 70) return "#00FF57";

    if (health <= 59) return "#FF5050";

    if (health <= 69) return "#FFA800";

    return "#fff";
  };

  const healthOptions = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: "pie",
    },
    title: {
      text: "Saúde da máquina",
    },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
    },
    accessibility: {
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: false,
        },
        showInLegend: true,
      },
    },
    series: [
      {
        name: props?.asset?.name,
        colorByPoint: true,
        data: [
          {
            name: "Saúde Complementar",
            y: 100 - props?.asset?.healthscore,
            color: "#1F3577",
          },
          {
            name: "Saúde Atual",
            y: props?.asset?.healthscore,
            color: chooseColor(props?.asset?.healthscore),
          },
        ],
      },
    ],
  };

  return (
    <div
      className="container"
    >
      <div
        className='box'
      >
        <div>
          <h1 className="title">{props?.asset?.name}</h1>
          <img
            alt="asset-img"
            src={props?.asset?.image}
            style={{ height: 300, width: 300 }}
          />
        </div>
        <HighchartsReact highcharts={Highcharts} options={healthOptions} />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <div className="box-data">
            <h1 className="title">
              Total de Coletas: {props?.asset?.metrics?.totalCollectsUptime} hrs
            </h1>
            <h1 className="title">
              Última vez ativo:{" "}
              {moment(props?.asset?.metrics?.lastUptimeAt).format("DD/MM/YYYY")}
            </h1>
            <h1 className="title">
              Total de horas ativo:{" "}
              {Math.round(Number(props?.asset?.metrics?.totalUptime))} hrs
            </h1>
            <h1 className="title">
              Sensor: {props?.asset?.sensors?.map((x) => x)}
            </h1>
            <h1 className="title">
              Temperatura máxima: {props?.asset?.specifications?.maxTemp}
            </h1>
            <h1 className="title">
              Potência: {props?.asset?.specifications?.power}
            </h1>
            <h1 className="title">
              Rotações por minuto (rpm): {props?.asset?.specifications?.rpm}
            </h1>
            <h1 className="title">Status: {props?.asset?.status}</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssetData;
