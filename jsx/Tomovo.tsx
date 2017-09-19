/// <reference path="../scripts/react-charts.d.ts" />

//const Chart = ReactCharts.default.Chart
//const Axis = ReactCharts.default.Axis
//const Series = ReactCharts.default.Series
//const Area = ReactCharts.default.Area
//const Tooltip = ReactCharts.default.Tooltip
//const Cursor = ReactCharts.default.Cursor
//const Line = ReactCharts.default.Line

//const Chart = ReactCharts.Chart
//const Axis = ReactCharts.Axis
//const Series = ReactCharts.Series
//const Area = ReactCharts.Area
//const Tooltip = ReactCharts.Tooltip
//const Cursor = ReactCharts.Cursor
//const Line = ReactCharts.Line


class Graf extends React.Component<{}, {}> {
    render() {
        var data = [
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 1000],
            ['2014', 0, 2000],
            ['2015', 1000, 1000]
        ]; 
          
        return <h1>Ahoj</h1>
        //<Chart data={data}>
        //    <Axis
        //        primary
        //        type="time"
        //        position="bottom"
        //    />
        //    <Axis
        //        type="linear"
        //        position="left"
        //    />
        //    <Series type={Line} />
        //    <Tooltip />
        //    <Cursor primary />
        //    <Cursor />
        //</Chart>
    }
}

function RenderGraph() {
    ReactDOM.render(
        <Graf />,
        document.getElementById('here')
    );
}