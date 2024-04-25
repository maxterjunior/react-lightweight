import { createChart, ColorType, CrosshairMode } from 'lightweight-charts';
import { Component } from 'react';

interface State {
    chart: any;
    candleSeries: any;
    data: any[];
    interval: any;
}

class RealtimeChart extends Component<any, State> {
    constructor(props) {
        super(props);

        this.state = {
            chart: null,
            candleSeries: null,
            data: [],
            interval: null,
        };
    }

    componentDidMount() {
        // Crear el gráfico y la serie de velas
        const chart = createChart(document.getElementById('chart-container'), {
            crosshair: {
                mode: CrosshairMode.Normal,
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: true,
            },
            layout: { textColor: 'white', background: { type: ColorType.Solid, color: 'black' } }
        });
        const candleSeries = chart.addAreaSeries({ lineColor: '#2962FF', topColor: '#2962FF', bottomColor: 'rgba(41, 98, 255, 0.0)' });

        // Iniciar los datos con algunos valores iniciales
        const initialData = [
            // Inserta tus datos iniciales aquí...
        ];
        candleSeries.setData(initialData);

        this.setState({
            chart,
            candleSeries,
            data: initialData,
            // Simular actualizaciones en tiempo real
            interval: this.simulateRealtimeUpdates()
        });


    }

    componentWillUnmount(): void {
        // Limpiar el intervalo de actualización en tiempo real
        clearInterval(this.state.interval);
    }

    simulateRealtimeUpdates() {
        return setInterval(() => {
            // Simular la obtención de nuevos datos en tiempo real
            const newCandle = this.generateRandomCandle();

            // Actualizar el estado local con los nuevos datos
            this.setState((prevState) => ({
                data: [...prevState.data, newCandle],
            }), () => {
                // Actualizar la serie de velas con los nuevos datos
                this.state.candleSeries.setData(this.state.data);
            });
        }, 500); // Simula una actualización cada 0.5 segundos
    }

    generateRandomCandle() {
        // Simula la generación de una nueva vela con datos aleatorios
        const dif = Math.random() * 10;
        const value = (this.state.data[this.state.data.length - 1]?.value || 100) + dif * Math.pow(-1, Math.floor(Math.random() * 10) + 1);
        // const time
        return {
            time: new Date().getTime() / 1000,
            value: value,
        };
    }

    render() {
        return (
            <div>
                <div id="chart-container" style={{ width: '1200px', height: '600px' }}></div>
                {/* <div id="chart-container" style={{ width: '100%', height: '100%' }}></div> */}
            </div>
        );
    }
}

export default RealtimeChart;
