package cc
{
	import mx.charts.series.LineSeries;
	import mx.charts.HitData;
	import mx.charts.series.items.LineSeriesItem;
	import mx.graphics.Stroke;
	import mx.graphics.IStroke;
	import mx.graphics.LinearGradientStroke;
	import mx.charts.chartClasses.CartesianTransform;

	// this class is needed to override a bug in the Flex library in LineSeries, where
	// interacting with LineChart data would cause the application to crash.  A hopefully
	// temporary workaround to a known bug, documented on the Adobe site.
	public class EditableLineSeries extends LineSeries
	{
		public function EditableLineSeries()
		{
			super();
		}
	
	    /**
     	 *  @private
         */
    	override public function findDataPoints(x:Number,y:Number,sensitivity:Number):Array /* of HitData */
    	{
        // esg, 8/7/06: if your mouse is over a series when it gets added and displayed for the first time, this can get called
        // before updateData, and before and render data is constructed. The right long term fix is to make sure a stubbed out 
        // render data is _always_ present, but that's a little disruptive right now.
        	if (interactive == false || !renderData)
            	return [];

	        var pr:Number = getStyle("radius");
    	    var minDist2:Number  = pr + sensitivity;
        	minDist2 *= minDist2;
        	var minItem:LineSeriesItem = null;     
        	var pr2:Number = pr * pr;
        
       	 	var len:int = 0;
        
        	if(renderData.filteredCache)
	        	len = renderData.filteredCache.length;
	        if (len == 0)
    	        return [];

	        if(sortOnXField == true)
    	    {            
        	    var low:Number = 0;
            	var high:Number = len;
            	var cur:Number = Math.floor((low+high)/2);
    
    	        var bFirstIsNaN:Boolean = isNaN(renderData.filteredCache[0]);
    
    	        while (true)
        	    {
            	    var v:LineSeriesItem = renderData.filteredCache[cur];          
                	if (!isNaN(v.yFilter) && !isNaN(v.xFilter))
                	{
                    	var dist:Number = (v.x  - x)*(v.x  - x) + (v.y - y)*(v.y -y);
                    	if (dist <= minDist2)
                    	{
                        	minDist2 = dist;
                        	minItem = v;                
                    	}
                	}
                	// if there are NaNs in this array, it's for one of a couple of reasons:
                	// 1) there were NaNs in the data, which menas an xField was provided, which means they got sorted to the end
                	// 2) some values got filtered out, in which case we can (sort of) safely assumed that the got filtered from one side, the other, or the entire thing.
                	// we'll assume that an axis hasn't filtered a middle portion of the array.
                	// since we can assume that any NaNs are at the beginning or the end, we'll rely on that in our binary search.  If there was a NaN in the first slot,
                	// then we'll assume it's safe to move up the array if we encounter a NaN.  It's possible the entire array is NaN, but then nothing will match, so that's ok.
                	if (v.x < x || (isNaN(v.x) && bFirstIsNaN))
                	{
                   		low = cur;
                    	cur = Math.floor((low + high)/2);
                    	if (cur == low)
                        	break;
                	}
                	else
                	{
                    	high = cur;
                    	cur = Math.floor((low + high)/2);
                    	if (cur == high)
                        	break;
                	}
            	}
        	}
        	else
        	{
            	var i:uint;
            	for (i=0;i<len;i++)
            	{
               		v = renderData.filteredCache[i];          
               		if (!isNaN(v.yFilter) && !isNaN(v.xFilter))
                	{
                   		dist = (v.x  - x)*(v.x  - x) + (v.y - y)*(v.y -y);
                   		if (dist <= minDist2)
                   		{
                       		minDist2 = dist;
                       		minItem = v;               
                   		}
                	}
           		}
        	}
        
        	if (minItem)
        	{
            	var hd:HitData = new HitData(createDataID(minItem.index),Math.sqrt(minDist2),minItem.x,minItem.y,minItem);

	            var istroke:IStroke = getStyle("lineStroke");
    	        if (istroke is Stroke)
        	        hd.contextColor = Stroke(istroke).color;
            	else if (istroke is LinearGradientStroke)
            	{
                	var gb:LinearGradientStroke = LinearGradientStroke(istroke);
                	if (gb.entries.length > 0)
                    	hd.contextColor = gb.entries[0].color;
            	}
            	hd.dataTipFunction = formatDataTip;
            	return [ hd ];
        	}

        	return [];
    	}
    
    	/**
     	 *  @private
     	 */
    	private function formatDataTip(hd:HitData):String
    	{
        	var dt:String = "";
        
       		var n:String = displayName;
        	if (n && n != "")
            	dt += "<b>" + n + "</b><BR/>";

        	var xName:String = dataTransform.getAxis(CartesianTransform.HORIZONTAL_AXIS).displayName;
        	if (xName != "")
            	dt += "<i>" + xName+ ":</i> ";
        	dt += dataTransform.getAxis(CartesianTransform.HORIZONTAL_AXIS).formatForScreen(
            	LineSeriesItem(hd.chartItem).xValue) + "\n";
        
        	var yName:String = dataTransform.getAxis(CartesianTransform.VERTICAL_AXIS).displayName;
        	if (yName != "")
            	dt += "<i>" + yName + ":</i> ";
        	dt += dataTransform.getAxis(CartesianTransform.VERTICAL_AXIS).formatForScreen(
            	LineSeriesItem(hd.chartItem).yValue) + "\n";
        
        	return dt;
    	} 
	}
}
