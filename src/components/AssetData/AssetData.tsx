import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import Assets from '../../interfaces/assets';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface AssetDataProps {
  asset: Assets;
}

function AssetData(props: AssetDataProps) {

  const chooseColor = (health: number) => {
    if (health >= 70)
      return '#00FF57';

    if (health <= 59)
      return '#FF5050';

    if (health <= 69)
      return '#FFA800';

    return '#fff';
  }

  const options = {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    title: {
        text: 'Saúde da máquina'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    accessibility: {
        point: {
            valueSuffix: '%'
        }
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: false
            },
            showInLegend: true
        }
    },
    series: [{
        name: props?.asset?.name,
        colorByPoint: true,
        data: [
          {
            name: 'Saúde Complementar',
            y: 100 - props?.asset?.healthscore,
            color: '#1F3577'
          },
          {
            name: 'Saúde Atual',
            y: props?.asset?.healthscore,
            color: chooseColor(props?.asset?.healthscore)
          }
        ]
    }]
  }

  return (
    <Container style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      marginTop: 100
    }}>
      <h1>{props?.asset?.name}</h1>
      <img alt='asset-img' src={props?.asset?.image} style={{ height: 300, width: 300 }} />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Container>
  )
};

export default AssetData;