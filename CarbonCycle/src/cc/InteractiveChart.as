package cc
{
	import flash.events.EventPhase;
	import flash.geom.Point;
	
	import mx.charts.AreaChart;
	import mx.charts.HitData;
	import mx.charts.events.ChartItemEvent;
	import mx.charts.renderers.DiamondItemRenderer;
	import mx.charts.series.items.LineSeriesItem;
	import mx.controls.Label;
	import mx.logging.ILogger;
	import mx.logging.Log;
	import mx.logging.LogEventLevel;
	import mx.logging.targets.TraceTarget;

	public class InteractiveChart extends AreaChart
	{
		private var updateData:Boolean = false;
		private var lsi:LineSeriesItem = null;
		private var ls:EditableLineSeries = null;
		private var itemIndex:int = -1;
		private var chd:HitData = null;
		private var defaultMouseSensitivity:int = 3;
		private var dragMouseSensitivity:int = 20;
		private var currentYear:Number = 2014;
		private var seriesIndex:int = 0;
		private var seriesCount:int = 4;
		private var logger:ILogger;
		private var annotations:Array;
		public var language:String;
		
		public function InteractiveChart()
		{
			super();    		
			this.addEventListener(ChartItemEvent.ITEM_MOUSE_DOWN, handleMouseDown);
			this.addEventListener(ChartItemEvent.CHANGE, handleChange);
			this.addEventListener(ChartItemEvent.ITEM_MOUSE_MOVE, handleMouseMove);
			this.addEventListener(ChartItemEvent.ITEM_MOUSE_UP, handleMouseUp);
			this.selectionMode = "single";

            var logTarget:TraceTarget = new TraceTarget();

            // Log all messages 
            logTarget.filters=["*"];

            // Change this to change logging level.
            logTarget.level = LogEventLevel.ERROR;

            // Add date, time, category, and log level to the output.
            logTarget.includeDate = true;
            logTarget.includeTime = true;
            logTarget.includeCategory = true;
            logTarget.includeLevel = true;

            // Begin logging.
            Log.addTarget(logTarget);	
            logger = Log.getLogger("cc.InteractiveChart");		
            
            // create chart annotations
            // XXX TJJ: NOTE: we can only do this labeling hack right now because we
            // know the chart is a fixed size of 300 x 300, and can tweak abs layout.
            annotations = new Array();
            var sourcesLabel:Label = new Label();
			language = "en";
			trace("language: " + language);
			if (language == "en") {
            	sourcesLabel.text = "Sources";
			} else {
				sourcesLabel.text = "Fuentes";
			}
            sourcesLabel.x = 20;
            sourcesLabel.y = 30;
            annotations.push(sourcesLabel);
            var sinksLabel:Label = new Label();
			if (language == "en") {
            	sinksLabel.text = "Sinks";
			} else {
				sinksLabel.text = "Sumideros";
			}
            sinksLabel.x = 20;
            sinksLabel.y = 225;
            annotations.push(sinksLabel)            
            this.annotationElements = annotations;
		}
     		
		public function setSeriesIndex(i: int): void {
			seriesIndex = i;
		}
		
		public function handleChange(e:ChartItemEvent): void {
			if (updateData) {
				//logger.debug("Change event received, yField: " + this.series[seriesIndex + seriesCount].yField);
				this.series[seriesIndex + seriesCount].yField = this.series[seriesIndex + seriesCount].yField;
			}
		}
		
		public function handleMouseDown(e:ChartItemEvent):void {
			logger.debug("Event type: " + e.type + ", Event primary target: " + e.target);
			var hs:Array = e.hitSet;
			var i:uint;
            for (i = 0; i < hs.length; i++) {
            	logger.debug("hitSet item: " + hs[i]);
            	var hd:HitData = hs[i];
            	// XXX - TJJ A little hokey, but grab-points are given Diamond shaped renderers
            	if ((hd != null) && (hd.chartItem.itemRenderer is DiamondItemRenderer)) {
            		// don't allow them to move the first point in the line
            		if (hd.chartItem.item.year != currentYear) {
						chd = hd;
						// set flag that will tell mouse motion handler to update chart data
						updateData = true;
						showDataTips = false;
						// temporarily decrease mouse sensitivity so they can hang on to data easier
						this.mouseSensitivity = dragMouseSensitivity;
						lsi = LineSeriesItem(hd.chartItem);
						itemIndex = lsi.index;
	        			logger.debug("Chart data was clicked near y value: " + lsi.yValue + ", item index: " + itemIndex);            			
            		}
            	}
            }
            logger.debug("handleMouseDown out... chart was clicked"); 		
     	}
     	
     	public function handleMouseMove(e:ChartItemEvent): void {
     		if (updateData) {
     			var d:Array = localToData(new Point(e.currentTarget.mouseX, e.currentTarget.mouseY));
     			// update the current line series item with data corresponding to Y coord value
     			var n0:Number = Math.round(d[0] * 100) / 100;
     			var n1:Number = Math.round(d[1] * 100) / 100;
     			if (d != null) {
     				var changed:Boolean = false;
     				switch (this.series[seriesIndex + seriesCount].yField) {
     					case "fossilfuel":
     						// only redraw if y value changed by at least a quarter point on plot
     						if (((lsi.item.fossilfuel - n1) > 0.25) || ((n1 - lsi.item.fossilfuel) > 0.25)) {
     							lsi.item.fossilfuel = n1;
     							changed = true;
     						}
     						break;
     					case "landuse":
     						if (((lsi.item.landuse - n1) > 0.25) || ((n1 - lsi.item.landuse) > 0.25)) {
     							lsi.item.landuse = n1;
     							changed = true;
     						}
     						break;
     					case "oceanuptake":
     						if (((lsi.item.oceanuptake - n1) > 0.25) || ((n1 - lsi.item.oceanuptake) > 0.25)) {
     							lsi.item.oceanuptake = n1;
     							changed = true;
     						}
     						break;
     					case "terrestrialuptake":
     						if (((lsi.item.terrestrialuptake - n1) > 0.25) || ((n1 - lsi.item.terrestrialuptake) > 0.25)) {
     							lsi.item.terrestrialuptake = n1;
     							changed = true;
     						}
     						break;     						
     					default:
     						break;     						     						
     				}
     				if (changed) {
     					changed = false;
     					//logger.debug("Data from local coords: " + "(" + n0 + "," + n1 + ")");
     					var hitSet:Array = new Array(1);
     					hitSet[0] = chd;
     					dispatchEvent(new ChartItemEvent(ChartItemEvent.CHANGE, hitSet, null, null));
     				}
     			}
     		}
     	}
     	
     	public function handleMouseUp(e:ChartItemEvent): void {
     		// reset flag that will tell mouse motion handler to update chart data
     		updateData = false;
     		showDataTips = true;
     		this.mouseSensitivity = defaultMouseSensitivity;
     		logger.debug("Chart data change complete.");
     	}
     	
	}
}