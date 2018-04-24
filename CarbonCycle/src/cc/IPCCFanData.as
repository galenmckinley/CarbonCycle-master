package cc
{
	import mx.collections.ArrayCollection;
	
	public class IPCCFanData
	{
		// Fossil Fuels
		public var ffFan:ArrayCollection;
		// Land Use
		public var luFan:ArrayCollection;
		// Ocean Uptake
		public var ouFan:ArrayCollection;
		// Terrestrial Uptake
		public var tuFan:ArrayCollection;
		// Atmospheric CO2
		public var aco2Fan:ArrayCollection;
			
		public function IPCCFanData()
		{
			ffFan = new ArrayCollection([{year:2013, minff:9.8, maxff:9.8}, {year:2100, minff:4.3, maxff:30.3}]);
			luFan = new ArrayCollection([{year:2013, minlu:0.89, maxlu:0.89}, {year:2100, minlu:-2.1, maxlu:0.4}]);
			ouFan = new ArrayCollection([{year:2013, minou:-2.8, maxou:-2.8}, {year:2100, minou:-10.0, maxou:-3.8}]);
			tuFan = new ArrayCollection([{year:2013, mintu:-2.5, maxtu:-2.5}, {year:2100, mintu:-10.0, maxtu:6.0}]);
			aco2Fan = new ArrayCollection([{year:2013, minaco2:397.24, maxaco2:397.24}, {year:2100, minaco2:560, maxaco2:1158}]);
		}

	}
}