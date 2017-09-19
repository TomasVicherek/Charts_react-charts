/// <reference path="react.d.ts" />

interface ChartProps { data: any; }
declare class Chart extends React.Component<ChartProps, {}> { }

interface AxisProps {
    type?: string;
    position: string;
    primary?: boolean;
    stacked?: boolean;
}
declare class Axis extends React.Component<AxisProps, {}> { }

interface SeriesProps { type?: any; }
declare class Series extends React.Component<SeriesProps, {}> { }

interface TooltipProps { }
declare class Tooltip extends React.Component<TooltipProps, {}> { }

interface AreaProps { }
declare class Area extends React.Component<AreaProps, {}> { }

interface LineProps { }
declare class Line extends React.Component<LineProps, {}> { }

interface CursorProps { primary?: boolean; }
declare class Cursor extends React.Component<CursorProps, {}> { }

//declare module MChart {
    //interface ChartProps { data: any; }
    //export class ChartCompo extends React.Component<ChartProps, {}> {  }

    //interface AxisProps {
    //    type?: string;
    //    position: string;
    //    primary?: boolean;
    //    stacked?: boolean;
    //}
    //export class Axis extends React.Component<AxisProps, {}> { }

    //interface SeriesProps {type?: any;}
    //export class SeriesCompo extends React.Component<SeriesProps, {}> { }

    //export interface TooltipProps { }
    //export class Tooltip extends React.Component<TooltipProps, {}> { }

    //interface AxisProps {
    //    primary?: boolean;
    //    type?: string;
    //    position: string;
    //    stacked?: boolean;
    //}
    //export class AxisCompo extends React.Component<AxisProps, {}> { }

    //export interface TooltipProps { }
    //export class TooltipCompo extends React.Component<TooltipProps, {}> { }

    //export interface AreaProps { }
    //export class AreaCompo extends React.Component<AreaProps, {}> { }

    //export interface LineProps { }
    //export class LineCompo extends React.Component<LineProps, {}> { }

    //export interface CursorProps { primary?: boolean; }
    //export class CursorCompo extends React.Component<CursorProps, {}> { }

    //export class Default {
    //    Chart: new () => ChartCompo;
    //    Series: new () => SeriesCompo;
    //    Axis: new () => AxisCompo;
    //    Tooltip: new () => TooltipCompo;
    //    Area: new () => AreaCompo;
    //    Line: new () => LineCompo;
    //    Cursor: new () => CursorCompo;
    //}

//    export interface Main {
//        //default: Default;
//         //Chart: new () => ChartCompo;
//        Series: new () => SeriesCompo;
//        Axis: new () => AxisCompo;
//        Tooltip: new () => TooltipCompo;
//        Area: new () => AreaCompo;
//        Line: new () => LineCompo;
//        Cursor: new () => CursorCompo;
//    }
//}


//declare const ReactCharts: MChart.Main;