package cc
{
	import flash.display.GradientType;
	import flash.display.SpreadMethod;
	import flash.geom.Point;
	import mx.core.UIComponent;

	public class GraphicArrow extends UIComponent
	{
		
		private var _angle : Number;
		private var inited : Boolean;
		public var center : Point;
		public var radius : Number;		
		
		public function GraphicArrow()
		{
			//TODO: implement function
			super();
		}
		
		// this angle must range from 210 deg to -30 deg:
		public function set angle(value : Number) : void {
			if (value > 210 || value < -30) throw new Error("Unsupported Angle Value "+value);
			_angle = value;
			inited = true;
			invalidateDisplayList();
		}

		public function get angle() : Number {
			return _angle;
		}
		
		override protected function updateDisplayList(unscaledWidth:Number, unscaledHeight:Number):void {
			// we need to first convert the angle to a convenient value,
			// since flex follows a different angle convention:
			var ang : Number = -angle*Math.PI/180;
			graphics.clear();
			graphics.beginGradientFill(GradientType.RADIAL, [0,0xcccccc], [1,1], [20,200], null, SpreadMethod.REFLECT);
			graphics.drawCircle(center.x, center.y, radius);
			graphics.endFill();
			if (inited) {
				graphics.lineStyle(10,0,1,false,"normal");
				graphics.lineGradientStyle(GradientType.LINEAR,[0,0xcccccc],[.5,.5],
				[20,200],null,SpreadMethod.REFLECT,"rgb",.5);
				graphics.moveTo(center.x,center.y);
				//var p : Point = getCoordinates(ang);
				//graphics.lineTo(center.x + p.x,center.y + p.y);
				//graphics.lineStyle(1,0,0);
				//graphics.moveTo(center.x,center.y);
			}
		}
	}
}