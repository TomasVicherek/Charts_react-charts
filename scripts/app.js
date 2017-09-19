/// <reference path="../scripts/react-charts.d.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Graf = (function (_super) {
    __extends(Graf, _super);
    function Graf() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Graf.prototype.render = function () {
        var data = [
            ['Year', 'Sales', 'Expenses'],
            ['2013', 1000, 1000],
            ['2014', 0, 2000],
            ['2015', 1000, 1000]
        ];
        return React.createElement("h1", null, "Ahoj");
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
    };
    return Graf;
}(React.Component));
function RenderGraph() {
    ReactDOM.render(React.createElement(Graf, null), document.getElementById('here'));
}
//# sourceMappingURL=app.js.map