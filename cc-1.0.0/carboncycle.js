"use strict";
// historical source / sink and atmospheric CO2 concentration values
var data = [
  // yr, FF,   LU,   AI,   OU,   LU,   atmCO2
  [1959, 2.45, 1.77, 2.04, 0.77, 0.98, 315.97],
  [1960, 2.57, 1.64, 1.51, 0.78, 1.81, 316.91],
  [1961, 2.58, 1.57, 1.65, 0.65, 1.02, 317.64],
  [1962, 2.69, 1.53, 1.19, 0.75, 1.62, 318.45],
  [1963, 2.83, 1.47, 1.21, 0.88, 1.03, 318.99],
  [1964, 3.00, 1.42, 1.04, 1.06, 1.84, 319.62],
  [1965, 3.13, 1.37, 2.33, 1.18, 0.49, 320.04],
  [1966, 3.29, 1.33, 2.33, 1.19, 1.40, 321.38],
  [1967, 3.39, 1.31, 1.29, 1.00, 1.88, 322.16],
  [1968, 3.57, 1.30, 2.10, 1.04, 2.59, 323.04],
  [1969, 3.78, 1.31, 2.80, 1.07, 0.67, 324.62],
  [1970, 4.05, 1.28, 2.40, 1.01, 0.69, 325.68],
  [1971, 4.21, 1.24, 1.55, 1.09, 2.65, 326.32],
  [1972, 4.38, 1.20, 3.12, 1.31, 1.25, 327.45],
  [1973, 4.61, 1.18, 3.10, 1.30, 2.03, 329.68],
  [1974, 4.62, 1.14, 1.44, 1.25, 4.48, 330.18],
  [1975, 4.60, 1.11, 2.61, 1.26, 2.75, 331.11],
  [1976, 4.86, 1.09, 2.06, 1.34, 3.18, 332.04],
  [1977, 5.02, 1.06, 4.07, 1.37, 1.80, 333.83],
  [1978, 5.07, 1.03, 2.73, 1.43, 3.14, 335.40],
  [1979, 5.36, 1.00, 4.54, 1.29, 1.56, 336.84],
  [1980, 5.30, 1.04, 3.63, 1.57, 0.77, 338.75],
  [1981, 5.14, 1.05, 2.44, 1.60, 2.70, 340.11],
  [1982, 5.09, 1.06, 2.12, 1.66, 1.60, 341.45],
  [1983, 5.08, 1.10, 3.90, 1.81, 0.33, 343.05],
  [1984, 5.26, 1.14, 2.63, 1.72, 2.90, 344.65],
  [1985, 5.42, 1.16, 3.46, 1.71, 2.73, 346.12],
  [1986, 5.58, 1.20, 2.20, 1.75, 2.27, 347.42],
  [1987, 5.73, 1.23, 5.70, 1.75, 0.47, 349.19],
  [1988, 5.94, 1.25, 4.75, 1.71, 2.19, 351.57],
  [1989, 6.07, 1.28, 2.93, 1.73, 3.67, 353.12],
  [1990, 6.06, 1.28, 2.50, 1.79, 2.35, 354.39],
  [1991, 6.13, 1.29, 1.53, 1.87, 2.10, 355.61],
  [1992, 6.07, 1.31, 1.48, 2.07, 2.26, 356.45],
  [1993, 6.06, 1.31, 2.59, 2.02, 3.08, 357.10],
  [1994, 6.17, 1.31, 3.56, 1.90, 1.57, 358.83],
  [1995, 6.30, 1.29, 4.13, 1.85, 1.87, 360.82],
  [1996, 6.44, 1.27, 2.27, 1.82, 3.41, 362.61],
  [1997, 6.55, 1.74, 4.20, 1.87, 3.02, 363.73],
  [1998, 6.57, 1.19, 5.94, 2.06, 1.65, 366.70],
  [1999, 6.55, 1.17, 2.84, 1.96, 3.58, 368.38],
  [2000, 6.72, 1.28, 2.63, 1.87, 3.99, 369.55],
  [2001, 6.89, 1.15, 3.90, 1.73, 2.35, 371.14],
  [2002, 6.99, 1.31, 5.05, 2.04, 0.88, 373.28],
  [2003, 7.37, 1.36, 4.79, 2.12, 2.49, 375.80],
  [2004, 7.73, 1.30, 3.29, 2.04, 3.75, 377.52],
  [2005, 8.03, 1.18, 5.17, 2.08, 2.04, 379.80],
  [2006, 8.32, 1.22, 3.75, 2.19, 3.36, 381.90],
  [2007, 8.49, 1.05, 4.43, 2.26, 3.18, 383.79],
  [2008, 8.77, 1.10, 3.75, 2.18, 3.99, 385.60],
  [2009, 8.69, 1.52, 3.43, 2.21, 3.10, 387.43],
  [2010, 9.12, 1.37, 5.17, 2.17, 3.04, 389.90],
  [2011, 9.50, 1.32, 3.54, 2.33, 3.98, 391.65],
  [2012, 9.67, 1.38, 5.07, 2.38, 2.08, 393.85],
  [2013, 9.77, 1.41, 5.17, 2.42, 3.20, 396.52],
  [2014, 9.85, 1.38, 4.22, 2.51, 3.66, 398.65],
  [2015, 9.83, 1.52, 6.23, 2.57, 1.50, 400.83],
  [2016, 9.88, 1.27, 6.13, 2.61, 2.73, 404.24]
];

// default projected source and sink values
var proj = [
  // yr, FF,   LU,   AI,   OU,   LU,   atmCO2
  [2020, 10.24, 1.19, 0, 3.00, 3.25, 0],
  [2040, 12.37, 0.68, 0, 3.90, 3.59, 0],
  [2060, 14.64, 0.51, 0, 4.81, 3.97, 0],
  [2080, 17.03, 0.36, 0, 5.71, 4.57, 0],
  [2100, 19.04, 0.21, 0, 6.61, 4.91, 0],
];

// a couple of useful strings for labels
var co2 = 'CO' + String.fromCharCode (8322);
var dF = String.fromCharCode (176) + 'F';
var dC = String.fromCharCode (176) + 'C';

// global 
var plot = [];			// plot related values
var pt = [];			// input projected value points

var mouse = {
  x: 0,				// coordinates
  y: 0,
  down: false,			// set when button is pressed
  follow: false,		// set when a projected point is being adjusted
};

var touch = {
  x: 0,
  y: 0,
  down: false,
  follow: false,
}

/*	init ()
 *
 *   Initialize global variables and set up event listeners.
 */
function init () {
  plot = [
    { div:	document.getElementById ('in-div'),
      canvas:	document.getElementById ('in-graph'),
      btndiv:	document.getElementById ('in-btn-div'),
      btn:	[],			// storage for source / sink buttons
      bg:	[ 'coalmine.jpg',	// fossil fuels
		  'landUse.jpg',	// land use
		  'perpetual.jpg',	// ocean uptake
		  'oldGrowth.jpg' ],	// land uptake
      img:	[],			// storage for image objects
      loaded:	[],			// storage for toggles
      tip:	false,			// storage for tooltip div
      tipoff:	[0, 0],			// offset from cursor
      area:	{ width: 0, height: 0 },	// plot area
      coord:	{ canv: { x0: 0, y0: 0,		// in "page" coords
			  xs: 1, ys: 1 },
		  plot: { x0: 0, y0: 0,		// in "canv" coords
			  xs: 1, ys: -1 },
		  world: { x0: 0, y0: 0,	// in "plot" coords
			   xs: 1, ys: 1 }
		}
    },
    { div:	document.getElementById ('out-div'),
      canvas:	document.getElementById ('out-graph'),
      btndiv:	document.getElementById ('out-btn-div'),
      bg:	[ 'atmos.jpg' ],
      img:	[],
      loaded:	[],
      tip:	false,			// storage for tooltip div
      tipoff:	[0, 0],			// offset from cursor
      area:	{ width: 0, height: 0 },	// plot area
      coord:	{ canv: { x0: 0, y0: 0,		// in "page" coords
			  xs: 1, ys: 1 },
		  plot: { x0: 0, y0: 0,		// in "canv" coords
			  xs: 1, ys: -1 },
		  world: { x0: 0, y0: 0,	// in "plot" coords
			   xs: 1, ys: 1 },
		  temp: { x0: 0, y0: 0,		// in "world" coords
			  xs: 1, ys: 1 }
		}
    }
  ]

  plot[0].axis = {
    x1: { range: [1960, 2100],
	  label: 'Year',
	  data: [],
	  proj: []
	},
    y1: { range: [-10, 35],
	  label: [ 'Fossil Fuels',
		   'Land Usage',
		   'Ocean Uptake',
		   'Land Uptake',
		 ],
	  units: 'PgC / year',
	  data: [ [], [], [], [] ],
	  spread: [ [   4.3, 30.3 ],	// estimated spread at year 2100
		    [  -2.1,  0.4 ],
		    [ -10.0, -3.8 ],
		    [ -10.0,  6.0 ]
		  ],
	  proj: [ [], [], [], [] ],
	  active: 0,		// index of highlighted plot
	  selected: 0		// index of selected point
	}
  }

  plot[1].axis = {
    x1: { range: [1960, 2100],
	  label: 'Year',
	  data: [],
	  proj: []
	},
    y1: { range: [300, 1200],
	  label: [ 'Atmospheric ' + co2,
		   'Simulation 2',
		   'Simulation 3',
		   'Simulation 4'],
	  units: 'ppm',
	  data: [ [] ],
	  spread: [ [ 550, 1150 ] ],	// estimated spread at year 2100
	  proj: [ [], [], [], [] ],	// keep previous
	  active: 0		// only one
	},
    y2: { range: [-1, 10],		// Fahrenheit - need to calculate this
	  label: [ 'Global Temperature Response' ],
	  units: dF
	}
  }

  // pull individual plot variables from the `data' array
  for (var i = 0; i < data.length; i++) {
    plot[0].axis.x1.data[i] =			// X axes the same (year)
      plot[1].axis.x1.data[i]  =  data[i][0];
    plot[0].axis.y1.data[0][i] =  data[i][1];	// sources
    plot[0].axis.y1.data[1][i] =  data[i][2];
    plot[0].axis.y1.data[2][i] = -data[i][4];	// sinks
    plot[0].axis.y1.data[3][i] = -data[i][5];
    plot[1].axis.y1.data[0][i] =  data[i][6];	// atmospheric CO2 ppm
  }
  // store the default projected values (to be modified)
  for (var i = 0; i < proj.length; i++) {
    plot[0].axis.x1.proj[i]    =  proj[i][0];
    plot[0].axis.y1.proj[0][i] =  proj[i][1];	// sources
    plot[0].axis.y1.proj[1][i] =  proj[i][2];
    plot[0].axis.y1.proj[2][i] = -proj[i][4];	// sinks
    plot[0].axis.y1.proj[3][i] = -proj[i][5];
  }

  // indices for the tooltip handlers
  plot[0].canvas.idx = 0;
  plot[1].canvas.idx = 1;

  if (plot[0].canvas.getContext) {
    window.addEventListener ('resize', resizeCanvas, false);
    window.addEventListener ('orientationchange', resizeCanvas, false);

    plot[0].btn[0] = document.getElementById ('btn-src-ff');
    plot[0].btn[1] = document.getElementById ('btn-src-lu');
    plot[0].btn[2] = document.getElementById ('btn-snk-ou');
    plot[0].btn[3] = document.getElementById ('btn-snk-lu');

    for (var i = 0; i < plot[0].btn.length; i++) {
      plot[0].btn[i].idx = i;
      // firefox persists disabled buttons across reloads, ensure only
      //   active button is disabled
      plot[0].btn[i].disabled = (i == 0);
      plot[0].btn[i].addEventListener ('click', set_active, false);
    }
    document.getElementById ('btn-run').onclick = handle_btn_run;
//    document.getElementById ('btn-reset').onclick = handle_btn_reset;
    document.getElementById ('btn-units').onclick = handle_btn_units;

    for (var i = 0; i < plot.length; i++) {
      plot[i].ctx = plot[i].canvas.getContext ("2d");
      for (var j = 0; j < plot[0].bg.length; j++) {
	plot[i].img[j] = new Image ();
	plot[i].loaded[j] = false;
      }
    }
    // closures need separate values;
    //   JS vars are function-local, so unroll the loops
    plot[0].img[0].onload = function () { plot[0].loaded[0] = true; };
    plot[0].img[1].onload = function () { plot[0].loaded[1] = true; };
    plot[0].img[2].onload = function () { plot[0].loaded[2] = true; };
    plot[0].img[3].onload = function () { plot[0].loaded[3] = true; };

    plot[1].img[0].onload = function () { plot[1].loaded[0] = true; };

    // need to set up handlers *before* adding the sources
    for (var i = 0; i < plot.length; i++) {
      for (var j = 0; j < plot[i].bg.length; j++) {
	plot[i].img[j].src = plot[i].bg[j];
      }
    }

    plot[0].tip = document.getElementById ('in-tooltip');
    plot[1].tip = document.getElementById ('out-tooltip');

    resizeCanvas();

    // event handlers for projected source / sink inputs
    plot[0].canvas.addEventListener ('mousemove', handle_mouse_move, false);
    plot[0].canvas.addEventListener ('mousedown', handle_mouse_down, false);
    plot[0].canvas.addEventListener ('mouseover', handle_mouse_over, false);
    plot[0].canvas.addEventListener ('mouseup', handle_mouse_up, false);

    plot[0].canvas.addEventListener ('touchstart', handle_touch_start, false);
    plot[0].canvas.addEventListener ('touchmove', handle_touch_move, false);
    plot[0].canvas.addEventListener ('touchend', handle_touch_end, false);

    // event handlers for tooltips
    for (var i = 0; i < plot.length; i++) {
      plot[i].canvas.addEventListener ('mousemove', cnvs_getCoords, false);
      plot[i].canvas.addEventListener ('mouseover', cnvs_over, false);
      plot[i].canvas.addEventListener ('mouseout', cnvs_noCoords, false);
    }

    // global event handlers to keep canvas locations updated
    window.addEventListener ('scroll', update_canvas_origins, false);
    window.addEventListener ('resize', update_canvas_origins, false);
    window.addEventListener ('orientationchange', update_canvas_origins, false);
  }
}	// function init


/*	set_active (event)
 *
 *   Input projected value selection handler.  Callback function for
 * buttons to change the current source / sink input graph.
 */
function set_active (e) {
  var ac = plot[0].axis.y1.active;

  // return previously selected button to normal
  plot[0].btn[ac].disabled = false;
  plot[0].btn[ac].className = plot[0].btn[ac].className.replace (' active', '');

  // save new active index
  plot[0].axis.y1.active = e.currentTarget.idx;

  // restyle button to show current active plot
  e.currentTarget.disabled = true;
  e.currentTarget.className += ' active';

  draw_plots ();
}	// set_active


//	switch_style ()
//
//   Switches between named style sheets stored in global array `style_list',
// sets global variable `curr_style' to the index of the new style.
//
function switch_style () {
  // based on part of `switch_style' from:
  // https://www.thesitewizard.com/javascripts/change-style-sheets.shtml
  var links, btn;
  var curr_style, new_style;
  var style_list = [];

  links = document.getElementsByTagName ("link");
  for (var i = 0; i < links.length; i++) {
    if ((links[i].rel.indexOf ("stylesheet") != -1) && links[i].title) {
      style_list.push (links[i]);		// just save named sheets
      if (! links[i].disabled) {
	curr_style = style_list.length - 1;	// save index of active sheet
      }
    }
  }

  new_style = curr_style + 1;
  if (new_style >= style_list.length) {
    new_style = 0;		// wrap around at the end
  }
  style_list[curr_style].disabled = true;
  style_list[new_style].disabled = false;
  curr_style = new_style;

  // get title for next one in line for button text
  new_style = curr_style + 1;
  if (new_style >= style_list.length) {
    new_style = 0;		// wrap around at the end
  }
  btn = document.getElementById ("btn-style");
  btn.value = style_list[new_style].title + " Mode";

  draw_plots ();		// redraw with new style
}	// function switch_style


/*	resizeCanvas ()
 *
 *   Called after window resize / orientation change to attempt to size the
 * canvas to a good aspect ratio, then redraws the plots on the resized
 * canvases.
 */
function resizeCanvas () {
  for (var i = 0; i < plot.length; i++) {
    var wa = plot[i].div.clientWidth;
    var ha = plot[i].div.clientHeight;
    var cst = window.getComputedStyle (plot[i].div);
    var hmin = parseInt (cst.getPropertyValue ('min-height'));
    var hmax = parseInt (cst.getPropertyValue ('max-height'));
    cst = window.getComputedStyle (plot[i].canvas);
    var amin = parseFloat (cst.getPropertyValue ('--graph-min-aspect'));
    var amax = parseFloat (cst.getPropertyValue ('--graph-max-aspect'));
    var ar = wa / ha;
    if (ha < hmin) {
      ha = hmin;
    }
    if (ha > hmax) {
      ha = hmax;
    }
    plot[i].canvas.width = wa;
    plot[i].canvas.height = ha;
  }
  update_canvas_origins ();
  draw_plots ()
}	// function resizeCanvas


/*	draw_plots ()
 *
 *   Draw on canvases defined in `plot': draws the background rectangle,
 * graph lines, annotates x & y axes, plots the historical data, then the
 * currently selected projected data after plotting the suggested spread
 * and the other projected graphs.
 */
function draw_plots () {
  var xa, ya;			// overall dim (px)
  var xb, yb;			// boundary dim (px)
  var xp, yp;			// plot dim (px)
  var stl;			// style object

  for (var i = 0; i < plot.length; i++) {
    xa = plot[i].canvas.width;
    ya = plot[i].canvas.height;

    stl = window.getComputedStyle (plot[i].canvas);

    // >>>>
    plot[i].ctx.save ();

    var xr, yr, yr2, xw, yw;
    xr = plot[i].axis.x1.range;
    yr = plot[i].axis.y1.range;
    try {
      yr2 = plot[i].axis.y2.range;
    }
    catch (err) {
      yr2 = false;
    }
    xw = xr[1] - xr[0];		// widths in world coords
    yw = yr[1] - yr[0];

    // figure out borders (label + annotations)
    plot[i].ctx.font = stl.getPropertyValue ('font-style') + " " +
      stl.getPropertyValue ('font-size') + " " +
      stl.getPropertyValue ('font-family');

    var txth = parseFloat (stl.getPropertyValue ('font-size'));
    // save for event handlers
    plot[i].canvas.txth = txth;
    plot[i].canvas.dsq = txth * txth;	// for distance comparisions

    xb = [];
    yb = [];
    xb[0] = (3 * txth) + plot[i].ctx.measureText (yr[1]).width;
    xb[1] = yr2 ? (3 * txth) + plot[i].ctx.measureText ('00').width : 0;

    yb[0] = 3 * txth;		// room for label & axis labels
    yb[1] = 0;

    // line up buttons with upper left plot edge
    plot[i].btndiv.style.left = xb[0];
    plot[i].btndiv.style.top = yb[1];

    xp = xa - (xb[0] + xb[1]);		// plot region sizes
    yp = ya - (yb[0] + yb[1]);

    plot[i].area.width = xp;
    plot[i].area.height = yp;

    // clear everything first
    plot[i].ctx.clearRect (0, 0, xa, ya);

    // draw background image
    var ac = plot[i].axis.y1.active;
    if (plot[i].loaded[ac]) {
      var ari = plot[i].img[ac].naturalWidth / plot[i].img[ac].naturalHeight;
      var arc = xp / yp;

      var xi0, yi0, xiw, yiw;

      if (ari < arc) {
	// image narrower than canvas, clip top & bottom
	xiw = plot[i].img[ac].naturalWidth;
	yiw = xiw / arc;
	xi0 = 0;
	yi0 = (plot[i].img[ac].naturalHeight - yiw) / 2;
      } else if (ari > arc) {
	// image fatter than canvas, clip sides
	yiw = plot[i].img[ac].naturalHeight;
	xiw = yiw * arc;
	xi0 = (plot[i].img[ac].naturalWidth - xiw) / 2;
	yi0 = 0;
      } else {
	// equal, full to full
	xi0 = 0;
	yi0 = 0;
	xiw = plot[i].img[ac].naturalWidth;
	yiw = plot[i].img[ac].naturalHeight;
      }
      plot[i].ctx.drawImage (plot[i].img[ac], xi0, yi0, xiw, yiw,
			     xb[0], yb[1], xp, yp);
    } else {
      var a = i;
      var b = ac;
      plot[i].img[ac].addEventListener (
	'load', function () { plot[a].loaded[b] = true; draw_plots () }, false);
    }

    // convert to cartesian coordinates (origin LL, X-axis right, Y-axis up)
    plot[i].ctx.setTransform (1, 0, 0, -1, 0, ya);

    // draw plotting area background
    plot[i].ctx.fillStyle = stl.getPropertyValue ('--graph-bg-color').trim ();
    plot[i].ctx.fillRect (xb[0], yb[0], xp, yp);

    plot[i].ctx.translate (xb[0], yb[0]);	// move origin to plot origin

    // conversion from canvas to plot coordinates
    plot[i].coord.plot.x0 = xb[0];
    plot[i].coord.plot.y0 = ya - yb[0];

    // conversion from plot to world coordinates
    plot[i].coord.world.x0 = -xr[0] * xp / xw;
    plot[i].coord.world.y0 = -yr[0] * yp / yw;

    plot[i].coord.world.xs = xw / xp;
    plot[i].coord.world.ys = yw / yp;

    // conversion from world to temperature coordinates
    if (yr2) {
      // temp origin at last data point
      plot[i].coord.temp.y0 =
	plot[i].axis.y1.data[0][plot[i].axis.y1.data[0].length - 1];
      if (plot[i].axis.y2.units == dC) {
	// conversion factor: 140 ppm = 1 deg C
	plot[i].coord.temp.ys = 1 / 140;
      } else {
	// conversion factor: 140 ppm = 9 / 5 deg F
	plot[i].coord.temp.ys = 9 / (5 * 140);
      }
    }

    // plot grid lines
    plot[i].ctx.beginPath ();
    for (var j = xr[0] + (xw / 7); j < xr[1]; j += xw / 7) {
      plot[i].ctx.moveTo ((j - xr[0]) * xp / xw, 0);
      plot[i].ctx.lineTo ((j - xr[0]) * xp / xw, yp);
    }
    for (var j = yr[0] + (yw / 9); j < yr[1]; j += yw / 9) {
      plot[i].ctx.moveTo (0,  (j - yr[0]) * yp / yw);
      plot[i].ctx.lineTo (xp, (j - yr[0]) * yp / yw);
    }
    plot[i].ctx.strokeStyle = stl.getPropertyValue ('background-color').trim ();
    plot[i].ctx.lineWidth = 1;
    plot[i].ctx.stroke ();

    // axis labels
    plot[i].ctx.fillStyle = stl.getPropertyValue ('color');
    plot[i].ctx.textAlign = 'center';
    plot[i].ctx.textBaseline = 'bottom';

    var str;
    plot_text (plot[i].ctx, plot[i].axis.x1.label,
	       xp / 2, (txth / 2) - yb[0], 0);

    plot[i].ctx.textBaseline = 'top';
    str = plot[i].axis.y1.label[ac] + ' (' + plot[i].axis.y1.units + ')';
    plot_text (plot[i].ctx, str,
	       (txth / 2) - xb[0], yp / 2, -Math.PI / 2);

    if (yr2) {
      plot[i].ctx.textBaseline = 'bottom';
      str = plot[i].axis.y2.label[ac] + ' (' + plot[i].axis.y2.units + ')';
      plot_text (plot[i].ctx, str,
		 xp + xb[1] - (txth / 2), yp / 2, -Math.PI / 2);
    }

    // axis annotations
    plot[i].ctx.textBaseline = 'top';
    plot[i].ctx.textAlign = 'center';
    plot[i].ctx.fillStyle = stl.getPropertyValue ('color');
    // use last two digits when space is tight
    var trunc = ((xw / 7) * xp / xw < plot[i].ctx.measureText (xr[1]).width);
    for (var x = xr[0]; x <= xr[1]; x += xw / 7) {
      if ((x == xr[1]) && (xb[1] == 0)) {
	plot[i].ctx.textAlign = 'right';
	if ((xw / 7) * xp / xw < 2 * plot[i].ctx.measureText (xr[1]).width) {
	  trunc = 1;
	}
      }
      if (trunc) {
	str = "'" + x.toString ().substr (-2);	// truncate date
      } else {
	str = x.toString ();
      }
      plot_text (plot[i].ctx, str, (x - xr[0]) * xp / xw, -(txth / 2), 0);
    }

    plot[i].ctx.textBaseline = 'middle';
    plot[i].ctx.textAlign = 'right';
    for (var y = yr[0]; y <= yr[1]; y += yw / 9) {
      if (y == yr[1]) {
	plot[i].ctx.textBaseline = 'top';
      }
      plot_text (plot[i].ctx, y, -(txth / 2), (y - yr[0]) * yp / yw, 0);
    }

    if (yr2) {
      yr2[0] = (yr[0] - plot[i].coord.temp.y0) * plot[i].coord.temp.ys;
      yr2[1] = (yr[1] - plot[i].coord.temp.y0) * plot[i].coord.temp.ys;
      yr2[0] = Math.ceil (yr2[0]);	// negative: round towards 0
      yr2[1] = Math.floor (yr2[1]);	// positive: same
      for (var y = yr2[0]; y <= yr2[1]; y++) {
	plot_text (plot[i].ctx, y, xp + (3 * txth / 2),
		   ((y / plot[i].coord.temp.ys)
		    +plot[i].coord.temp.y0 - yr[0]) * yp / yw, 0);
      }
    }

    // plot data
    for (var k = 0; k < plot[i].axis.y1.data.length; k++) {
      plot[i].ctx.beginPath ();

      for (var j = 0; j < plot[i].axis.x1.data.length; j++) {
	var xv = plot[i].axis.x1.data[j];
	var yv = plot[i].axis.y1.data[k][j];
	if (xv < xr[0]) {
	  continue;		// skip earlier values
	}
	plot[i].ctx.lineTo ((xv - xr[0]) * xp / xw, (yv - yr[0]) * yp / yw);
      }

      if (k != ac) {
	plot[i].ctx.lineWidth = 2;
	plot[i].ctx.strokeStyle =
//	  stl.getPropertyValue ('--graph-fg-color').trim ();
	  stl.getPropertyValue ('--graph-hist-color-' + k).trim ();
      } else {
	plot[i].ctx.lineWidth = 2;
	plot[i].ctx.strokeStyle =
	  stl.getPropertyValue ('--graph-active-color').trim ();
      }

      plot[i].ctx.stroke ();
    }

    // plot forecast spread
    if (plot[i].axis.y1.spread) {
      var xv = [];
      var yv = [];

      plot[i].ctx.beginPath ();

      xv[0] = plot[i].axis.x1.data[ plot[i].axis.x1.data.length - 1 ];
      xv[1] = xv[2] = plot[i].axis.x1.range[1];

      yv[0] = plot[i].axis.y1.data[ac][ plot[i].axis.y1.data[ac].length - 1 ];
      yv[1] = plot[i].axis.y1.spread[ac][0];
      yv[2] = plot[i].axis.y1.spread[ac][1];

      for (var j = 0; j < xv.length; j++) {
	plot[i].ctx.lineTo ((xv[j] - xr[0]) * xp / xw,
			    (yv[j] - yr[0]) * yp / yw);
      }
      plot[i].ctx.closePath ();
    
      plot[i].ctx.fillStyle =
	stl.getPropertyValue ('--graph-spread-color').trim ();
      plot[i].ctx.fill ();
    }

    // plot background projected values
    for (var k = 0; k < plot[i].axis.y1.proj.length; k++) {
      if ((k == ac) || (plot[i].axis.y1.proj[k].length == 0)) {
	continue;		// skip active plot
      }
      plot[i].ctx.beginPath ();
      var xv, yv;
      xv = plot[i].axis.x1.data[ plot[i].axis.x1.data.length - 1 ];
      if (i == 0) {
	yv = plot[i].axis.y1.data[k][ plot[i].axis.x1.data.length - 1 ];
      } else {
	yv = plot[i].axis.y1.data[0][ plot[i].axis.x1.data.length - 1 ];
      }
      plot[i].ctx.moveTo ((xv - xr[0]) * xp / xw, (yv - yr[0]) * yp / yw);
      for (var j = 0; j < plot[i].axis.x1.proj.length; j++) {
	xv = plot[i].axis.x1.proj[j];
	yv = plot[i].axis.y1.proj[k][j];
	plot[i].ctx.lineTo ((xv - xr[0]) * xp / xw, (yv - yr[0]) * yp / yw);
/*		** to debug the plotted values **
	var x0 = (xv - xr[0]) * xp / xw;
	var y0 = (yv - yr[0]) * yp / yw;
	plot[i].ctx.lineTo (x0, y0);
*/
      }
      plot[i].ctx.lineWidth = 2;
      plot[i].ctx.strokeStyle =
//	stl.getPropertyValue ('--graph-proj-color').trim ();
	stl.getPropertyValue ('--graph-proj-color-' + k).trim ();
      plot[i].ctx.stroke ();
    }

    plot[i].ctx.restore ();
    // <<<<
    draw_projected (i);
  }
}	// function draw_plots


/* plot_text (context, string, xcoord, ycoord, radangle)
 *
 *    Writes `string' at position (`xcoord', `ycoord') with clockwise
 * rotation `radangle' in the cartesian canvas context `context'.
 * Essentially translates origin to the position given and flips the y axis
 * back to normal so the string prints right side up before rotation.
 */
function plot_text (context, str, x, y, rad) {
  var cr = Math.cos (rad);
  var sr = Math.sin (rad);

  context.save ();
  // context.transform (1, 0, 0, -1, x, y);
  // context.rotate (rad);
  context.transform (cr, -sr, -sr, -cr, x, y);
  context.fillText (str, 0, 0);
  context.restore ();
}	// function plot_text


/*	draw_projected ()
 *
 *  Draws the projected source & sink values and the output graph
 */
function draw_projected (i) {
  if (i == 0) {
    draw_proj_input ();
  } else {
    draw_proj_output ();
  }
}	// function draw_projected


/*	draw_proj_input ()
 *
 *   Repopulates `pt' with the currently active projected source or
 * sink values and plots the line segments on the input graph.
 */
function draw_proj_input () {
  var ac = plot[0].axis.y1.active;
  var xr = plot[0].axis.x1.range;
  var yr = plot[0].axis.y1.range;
  var xw = xr[1] - xr[0];
  var yw = yr[1] - yr[0];
  var stl = window.getComputedStyle (plot[0].canvas);
  var txth = parseFloat (stl.getPropertyValue ('font-size'));
  var xp = plot[0].area.width;
  var yp = plot[0].area.height;

  var wx, wy, px, py, cx, cy;

  while (pt.length > 0) {
    pt.pop ();			// clear array
  }

  // start at end of historical data
  wx = plot[0].axis.x1.data[ plot[0].axis.x1.data.length - 1 ];
  wy = plot[0].axis.y1.data[ac][ plot[0].axis.x1.data.length - 1 ];
  // ensure integers for pixel values from here on
  px = Math.round ((wx - xr[0]) * xp / xw);
  py = Math.round ((wy - yr[0]) * yp / yw);
  cx = (px / plot[0].coord.plot.xs) + plot[0].coord.plot.x0;
  cy = (py / plot[0].coord.plot.ys) + plot[0].coord.plot.y0;
  pt.push ( { world: [ wx, wy ], plot: [ px, py ], canv: [ cx, cy ],
	      img: {} } );

  // add the current projected values, store background images
  //   for later restoration
  for (var i = 0; i < plot[0].axis.x1.proj.length; i++) {
    wx = plot[0].axis.x1.proj[i];
    wy = plot[0].axis.y1.proj[ac][i];
    px = Math.round ((wx - xr[0]) * xp / xw);
    py = Math.round ((wy - yr[0]) * yp / yw);
    cx = (px / plot[0].coord.plot.xs) + plot[0].coord.plot.x0;
    cy = (py / plot[0].coord.plot.ys) + plot[0].coord.plot.y0;

    // save background images before plotting points & lines
    // need the *UPPER* *LEFT* coordinate
    var xi = pt[i].canv[0];
    var yi = 0;
    var xiw = cx - xi;
    var yiw = plot[0].canvas.height;

    var img = plot[0].ctx.getImageData (xi, yi, xiw, yiw);

    pt.push ( { world: [ wx, wy ], plot: [ px, py ], canv: [ cx, cy ],
		img: { x: xi, y: yi, w: xiw, h: yiw, data: img } } );
  }

  // draw the newly-created line segments
  for (var i = 1; i < pt.length; i++) {
    draw_segment (i);
  }
}	// function draw_proj_input


/*	draw_segment (index)
 *
 *    Restores the background before drawing the projected input
 * segment between `pt[index - 1]' and `pt[index]', including the
 * circle if necessary.
 */
function draw_segment (curr) {
  var prev = curr - 1;
  var cst = window.getComputedStyle (plot[0].canvas);
  var active_color = cst.getPropertyValue ('--graph-proj-active-color').trim ();
  var select_color = cst.getPropertyValue ('--graph-proj-select-color').trim ();
  var pt_size = parseFloat (cst.getPropertyValue ('font-size')) / 3;

  // restore background
  plot[0].ctx.putImageData (pt[curr].img.data, pt[curr].img.x, pt[curr].img.y);

  // draw segment from previous to current
  plot[0].ctx.beginPath ();
  plot[0].ctx.moveTo (pt[prev].canv[0], pt[prev].canv[1]);
  plot[0].ctx.lineTo (pt[curr].canv[0], pt[curr].canv[1]);
  plot[0].ctx.strokeStyle = active_color; //"#AA3A3A";
  plot[0].ctx.lineWidth = 2;
  plot[0].ctx.stroke ();

  // draw previous point (if needed)
  if (prev > 0) {
    plot[0].ctx.beginPath ();
    plot[0].ctx.arc (pt[prev].canv[0], pt[prev].canv[1], pt_size,
		 0, 2 * Math.PI, true);
    plot[0].ctx.fillStyle = (mouse.follow && (prev == plot[0].axis.y1.selected)) ?
      select_color : active_color;
    plot[0].ctx.fill ();
  }
  // draw current point
  plot[0].ctx.beginPath ();
  plot[0].ctx.arc (pt[curr].canv[0], pt[curr].canv[1], pt_size,
	       0, 2 * Math.PI, true);
  plot[0].ctx.fillStyle = (mouse.follow && (curr == plot[0].axis.y1.selected)) ?
    select_color : active_color;
  plot[0].ctx.fill ();
}	// draw_segment


/*	calc_proj_output ()
 *
 *   Takes the current input source / sink values, determines the
 * equations for each line segment, then iteravely sums all of the
 * sources & sinks to calculate the projected atmospheric CO2
 * concentration for the projected time range.
 *   Keeps the three most recent plots for comparision.
 */
function calc_proj_output () {
  var opt = [];
  var x0, x1, y0, y1;		// endpoints of line segment
  var xmin, xmax;		// range of point to compute / plot
  var m, b;			// slope & intercept of line segment
  var ac;			// active plot index

  // calculate slope & intercept of each line segment
  for (var i = 0; i < plot[0].axis.y1.proj.length; i++) {
    // start at end of historical data
    x0 = plot[0].axis.x1.data[ plot[0].axis.x1.data.length - 1 ];
    y0 = plot[0].axis.y1.data[i][ plot[0].axis.x1.data.length - 1 ];
    opt.push ( [] );	// begin another row
    // calculate slope & intercept for each line segment
    for (var j = 0; j < plot[0].axis.y1.proj[i].length; j++) {
      x1 = plot[0].axis.x1.proj[j];
      y1 = plot[0].axis.y1.proj[i][j];
      m = (y1 - y0) / (x1 - x0);
      b = y0 - (m * x0);
      opt[i][j] = { slope: m, intcp: b };
      x0 = x1;
      y0 = y1;
    }
  }
  // compute output & store
  // clear out storage for new values
  ac = plot[1].axis.y1.active;		// should always be 0
  plot[1].axis.x1.proj = [];
  plot[1].axis.y1.proj.pop ();		// remove oldest
  plot[1].axis.y1.proj.unshift ( [] );	// new blank row
  // starting values
  xmin = plot[0].axis.x1.data[ plot[0].axis.x1.data.length - 1 ] + 1;
  xmax = plot[0].axis.x1.proj[ plot[0].axis.x1.proj.length - 1 ] + 1;
  var y = plot[1].axis.y1.data[0] [ plot[1].axis.y1.data[0].length - 1 ];
  for (var x = xmin; x < xmax; x++) {
    // find segment
    var j = 0;
    while ((j < plot[0].axis.x1.proj.length) &&
	   (plot[0].axis.x1.proj[j] < x)) {
      j++;
    }
    var dy = 0;
    for (var i = 0; i < opt.length; i++) {
      dy += (opt[i][j].slope * x) + opt[i][j].intcp;
    }
    y += dy;
    plot[1].axis.x1.proj.push (x);
    plot[1].axis.y1.proj[ac].push (y);
  }
}	// function calc_proj_output


/*	draw_proj_output ()
 *
 *   Repopulates `pt' with the currently active projected source or
 * sink values and plots the line segments on the input graph.
 */
function draw_proj_output () {
  var ac = plot[1].axis.y1.active;
  var xr = plot[1].axis.x1.range;
  var yr = plot[1].axis.y1.range;
  var xw = xr[1] - xr[0];
  var yw = yr[1] - yr[0];
  var cst = window.getComputedStyle (plot[1].canvas);
  var txth = parseFloat (cst.getPropertyValue ('font-size'));
  var xp = plot[1].area.width;
  var yp = plot[1].area.height;

  var wx, wy, px, py, cx, cy;

  // start at end of historical data
  wx = plot[1].axis.x1.data[ plot[1].axis.x1.data.length - 1 ];
  wy = plot[1].axis.y1.data[ac][ plot[1].axis.x1.data.length - 1 ];
  px = (wx / plot[1].coord.world.xs) + plot[1].coord.world.x0;
  py = (wy / plot[1].coord.world.ys) + plot[1].coord.world.y0;
  // ensure integers for pixel values from here on
  cx = Math.round ((px / plot[1].coord.plot.xs) + plot[1].coord.plot.x0);
  cy = Math.round ((py / plot[1].coord.plot.ys) + plot[1].coord.plot.y0);

  plot[1].ctx.beginPath ();
  plot[1].ctx.moveTo (cx, cy);

  // add the current projected values, store background images
  //   for later restoration
  for (var i = 0; i < plot[1].axis.x1.proj.length; i++) {
    wx = plot[1].axis.x1.proj[i];
    wy = plot[1].axis.y1.proj[ac][i];
    px = (wx / plot[1].coord.world.xs) + plot[1].coord.world.x0;
    py = (wy / plot[1].coord.world.ys) + plot[1].coord.world.y0;
    // want integers for pixel values here
    cx = Math.round ((px / plot[1].coord.plot.xs) + plot[1].coord.plot.x0);
    cy = Math.round ((py / plot[1].coord.plot.ys) + plot[1].coord.plot.y0);

    plot[1].ctx.lineTo (cx, cy);
  }
  plot[1].ctx.strokeStyle =
    cst.getPropertyValue ('--graph-proj-active-color').trim ();
  plot[1].ctx.lineWidth = 2;
  plot[1].ctx.stroke ();
}	// function draw_proj_output


/*	update_input ()
 *
 *   Draws the projected plot line segments before and after the currently
 * selected point.
 */
function update_input() {
  var sel = plot[0].axis.y1.selected;
  if (mouse.down) {
    pt[sel].canv[1] = mouse.y;		// veritcal moves only
  } else if (touch.down) {
    pt[sel].canv[1] = touch.y;
  }

  // previous segment
  draw_segment (sel);
  // following segment (unless this is the last point)
  if (sel < pt.length - 1) {
    draw_segment (sel + 1);
  }
}	// function update_input


////////////////////////////////////////
// canvas mouse input handlers

/*	update_canvas_origins
 *
 *   Finds the current position of `plot[N].canvas' and updates the
 * origins for the transform from window to canvas.
 */
function update_canvas_origins () {
  var x, y, elem;
  for (var i = 0; i < plot.length; i++) {
    x = 0;
    y = 0;

    elem = plot[i].canvas;
    while (elem) {
      x += (elem.offsetLeft - elem.scrollLeft + elem.clientLeft);
      y += (elem.offsetTop - elem.scrollTop + elem.clientTop);
      elem = elem.offsetParent;
    }
    plot[i].coord.canv.x0 = x;
    plot[i].coord.canv.y0 = y;
  }
}	// function update_canvas_origins


/*	function update_tooltip (index, xwindow, ywindow)
 *
 *   Check if tooltip should be visible and update with current coordinates.
 */
function update_tooltip (idx, x, y) {
  var xc = (x - plot[idx].coord.canv.x0) * plot[idx].coord.canv.xs;
  var yc = (y - plot[idx].coord.canv.y0) * plot[idx].coord.canv.ys;

  var xp = (xc - plot[idx].coord.plot.x0) * plot[idx].coord.plot.xs;
  var yp = (yc - plot[idx].coord.plot.y0) * plot[idx].coord.plot.ys;

  var xw = (xp - plot[idx].coord.world.x0) * plot[idx].coord.world.xs;
  var yw = (yp - plot[idx].coord.world.y0) * plot[idx].coord.world.ys;

  var yr2;
  try {
    yr2 = plot[idx].axis.y2.range;
  }
  catch (err) {
    yr2 = false;
  }

  if (yr2) {
    var xt = (xw - plot[idx].coord.temp.x0) * plot[idx].coord.temp.xs;
    var yt = (yw - plot[idx].coord.temp.y0) * plot[idx].coord.temp.ys;
  }

  if (xp < (plot[idx].area.width / 3)) {
    // near left edge, position tooltip to right
    plot[idx].tipoff[0] = plot[idx].canvas.txth / 2;
  } else if (xp > (plot[idx].area.width * 2 / 3)) {
    // near right edge, position tooltip to left
    plot[idx].tipoff[0] = - (plot[idx].tip.clientWidth +
			     (plot[idx].canvas.txth / 2));
  }
  // plot y-axis direction is opposite of canvas
  if (yp < (plot[idx].area.height / 3)) {
    // near bottom edge, position tooltip to top
    plot[idx].tipoff[1] = - (plot[idx].tip.clientHeight +
			     (plot[idx].canvas.txth / 2));
  } else if (yp > (plot[idx].area.height * 2 / 3)) {
    // near top edge, position tooltip to bottom
    plot[idx].tipoff[1] = plot[idx].canvas.txth / 2;
  }

  var ac = plot[idx].axis.y1.active;

  xw = Math.round (xw);
  var found = false;
  if (mouse.follow || touch.follow) {
    var sel = plot[0].axis.y1.selected;
    plot[idx].tip.style.opacity = 1;
    plot[idx].tip.innerHTML = plot[idx].axis.y1.label[ac] +
      '<br>' + plot[idx].axis.x1.proj[sel-1].toFixed (0) + ': ' +
      yw.toFixed (1) + ' ' + plot[idx].axis.y1.units;

    plot[idx].tip.style.top = yc + plot[idx].tipoff[1];
  } else if (xw <= plot[idx].axis.x1.data[plot[idx].axis.x1.data.length - 1]) {
    // find it in the historical data
    for (var i = 0; i < plot[idx].axis.x1.data.length; i++) {
      if (plot[idx].axis.x1.data[i] >= xw) {
	break;
      }
    }
    for (var j = 0; j < plot[idx].axis.y1.data.length; j++) {
      // convert to plot coords for comparision
      var y1 = (plot[idx].axis.y1.data[j][i] / plot[idx].coord.world.ys) +
	  plot[idx].coord.world.y0;
      if (Math.abs (y1 - yp) < (plot[idx].canvas.txth / 3)) {
	found = true;
	break;
      }
    }
    if (found) {
      plot[idx].tip.style.opacity = 1;
      plot[idx].tip.innerHTML = plot[idx].axis.y1.label[j] +
	'<br>' + xw.toFixed (0) + ': '
	+ plot[idx].axis.y1.data[j][i].toFixed (1) +
	' ' + plot[idx].axis.y1.units;
      if (yr2) {
	// add temperature response
	plot[idx].tip.innerHTML += '<br>' + ((yt > 0) ? '+' : '') +
	  yt.toFixed (1) + ' ' + plot[idx].axis.y2.units;
      }
      plot[idx].tip.style.left = xc + plot[idx].tipoff[0];
      plot[idx].tip.style.top = yc + plot[idx].tipoff[1];
    } else {
      plot[idx].tip.style.opacity = 0;
    }
  } else {
    // find it in the projected data
    for (var i = 0; i < plot[idx].axis.x1.proj.length; i++) {
      if (plot[idx].axis.x1.proj[i] >= xw) {
	break;
      }
    }
    var x1 = (plot[idx].axis.x1.proj[i] / plot[idx].coord.world.xs) +
	plot[idx].coord.world.x0;
    if (Math.abs (x1 - xp) < (plot[idx].canvas.txth / 3)) {
      for (var j = 0; j < plot[idx].axis.y1.proj.length; j++) {
	// convert to plot coords for comparision
	var y1 = (plot[idx].axis.y1.proj[j][i] / plot[idx].coord.world.ys) +
	    plot[idx].coord.world.y0;
	if (Math.abs (y1 - yp) < (plot[idx].canvas.txth / 3)) {
	  found = true;
	  break;
	}
      }
    }
    if (found) {
      plot[idx].tip.style.opacity = 1;
      plot[idx].tip.innerHTML = plot[idx].axis.y1.label[j] +
	'<br>' + xw.toFixed (0) + ': '
	+ plot[idx].axis.y1.proj[j][i].toFixed (1) +
	' ' + plot[idx].axis.y1.units;
      if (yr2) {
	// add temperature response
	plot[idx].tip.innerHTML += '<br>' + ((yt > 0) ? '+' : '') +
	  yt.toFixed (1) + ' ' + plot[idx].axis.y2.units;
      }
      plot[idx].tip.style.left = xc + plot[idx].tipoff[0];
      plot[idx].tip.style.top = yc + plot[idx].tipoff[1];
    } else {
      plot[idx].tip.style.opacity = 0;
    }
  }
}	// function update_tooltip


/*	cnvs_getCoords (event)
 *
 *   Event handler for mousemove event: updates coordinate
 */
function cnvs_getCoords (e) {
  var idx = e.currentTarget.idx;

  var x = e.clientX;
  var y = e.clientY;

  update_tooltip (idx, x, y);

  if (mouse.follow) {
    requestAnimationFrame (update_input);
  }
}


function cnvs_over (e) {
  plot[e.currentTarget.idx].tip.style.opacity = 1;
}	// function cnvs_over


function cnvs_noCoords (e) {
  plot[e.currentTarget.idx].tip.style.opacity = 0;
}	// function cnvs_noCoords


/*	handle_mouse_move (event)
 *
 *   Event handler - takes the current coordinates of the mouse and
 * updates the canvas coordinates stored in `mouse'.  If there is a
 * projected value being updated, redraw that point.
 */
function handle_mouse_move (e) {
  mouse.x = e.clientX - plot[0].coord.canv.x0;
  mouse.y = e.clientY - plot[0].coord.canv.y0;

  if (mouse.follow) {
    requestAnimationFrame (update_input);
  }
}	// function handle_mouse_move


/*	handle_mouse_down ()
 *
 *   Event handler - goes through the projected input values and
 * determines whether the mouse is currently near enough to one that
 * it can be interpreted as choosing the point.  If it is, the
 * `selected' index is updated, the `mouse.follow' toggle is set to
 * `true' and the point is redrawn with the point highlighted.
 *
 *   NOTE: `requestAnimationFrame' is not used because that will wait
 * for the mouse to move and we want the point to be redrawn with the
 * `selected' color for visual feedback that the point is actually
 * selected.
 */
function handle_mouse_down (e) {
  var dSq;

  // pt[0] is the end of the historical data
  for (var i = 1; i < pt.length; i++) {
    dSq = Math.pow (mouse.x - pt[i].canv[0], 2) +
      Math.pow (mouse.y - pt[i].canv[1], 2);

    if (dSq < e.currentTarget.dsq) {
      mouse.follow = true;
      plot[0].axis.y1.selected = i;
      update_input ();		// don't wait for animation: immediate feedback
      break;			// found it, done
    }
  }
  mouse.down = true;
}	// function handle_mouse_down


/*	handle_mouse_over ()
 *
 *   Event handler - `mouse.follow' and `mouse.down' are handled by other
 * handlers.
 */
function handle_mouse_over () {
  mouse.follow = mouse.down;
}	// function handle_mouse_over


/*	handle_mouse_up ()
 *
 *   Event handler - if this up event ends editing a point's position,
 * save the new position to `plot' and redraw the point in its new
 * location in the non-"selected" color.
 */
function handle_mouse_up () {
  var oldfollow = mouse.follow;
  mouse.follow = false;
  mouse.down = false;

  if (oldfollow) {
    var sel = plot[0].axis.y1.selected;
    var ac = plot[0].axis.y1.active;

    // calculate world coords from canvas coords
    var yc = pt[sel].canv[1];
    var yp = (yc - plot[0].coord.plot.y0) * plot[0].coord.plot.ys;
    var yw = (yp - plot[0].coord.world.y0) * plot[0].coord.world.ys;

    // save changed y-value to plot object
    plot[0].axis.y1.proj[ac][sel - 1] = yw;

    update_input ();		// immediate feedback
  }
}	// function handle_mouse_up


function get_touch_coord (e) {
  // only handle one finger touches
  if (e.touches && (e.touches.length == 1)) {
    touch.x = e.touches[0].pageX - e.touches[0].target.offsetLeft -
      plot[0].coord.canv.x0;
    touch.y = e.touches[0].pageY - e.touches[0].target.offsetLeft -
      plot[0].coord.canv.y0;
  }
}	// function get_touch_coord


function handle_touch_move (e) {
  get_touch_coord (e);

  if (e.touches && (e.touches.length == 1)) {
    update_tooltip (e.currentTarget.idx,
		    e.touches[0].pageX, e.touches[0].pageY);
  }

  if (touch.follow) {
    requestAnimationFrame (update_input);
  }
}	// function handle_touch_move


function handle_touch_start (e) {
  var dSq;

  get_touch_coord (e);
  // pt[0] is the end of the historical data
  for (var i = 1; i < pt.length; i++) {
    dSq = Math.pow (touch.x - pt[i].canv[0], 2) +
      Math.pow (touch.y - pt[i].canv[1], 2);

    if (dSq < e.currentTarget.dsq) {
      touch.follow = true;
      plot[0].axis.y1.selected = i;
      update_input ();		// don't wait for animation: immediate feedback
      break;			// found it, done
    }
  }
  touch.down = true;
  // prevent additional mousedown event being triggered
  e.preventDefault ();
}	// function handle_touch_start


function handle_touch_end () {
  var oldfollow = touch.follow;
  touch.follow = false;
  touch.down = false;

  if (oldfollow) {
    var sel = plot[0].axis.y1.selected;
    var ac = plot[0].axis.y1.active;

    // calculate world coords from canvas coords
    var yc = pt[sel].canv[1];
    var yp = (yc - plot[0].coord.plot.y0) * plot[0].coord.plot.ys;
    var yw = (yp - plot[0].coord.world.y0) * plot[0].coord.world.ys;

    // save changed y-value to plot object
    plot[0].axis.y1.proj[ac][sel - 1] = yw;

    update_input ();		// immediate feedback
  }
}	// function handle_touch_start


/*	handle_btn_run ()
 *
 *   Run a new projection - calculate the projected output values,
 * store in `plot[1]' and then update the display with the new graph.
 */
function handle_btn_run () {
  calc_proj_output ();		// update the `plot' values
  draw_plots ();
}	// function handle_btn_run


/*	handle_btn_reset ()
 *
 *    Simply copies the original projected input values from `proj' and
 * updates the display.  Removes the output projected values.
 */
function handle_btn_reset () {
  for (var i = 0; i < proj.length; i++) {
    plot[0].axis.y1.proj[0][i] =  proj[i][1];	// sources
    plot[0].axis.y1.proj[1][i] =  proj[i][2];
    plot[0].axis.y1.proj[2][i] = -proj[i][4];	// sinks
    plot[0].axis.y1.proj[3][i] = -proj[i][5];
  }
  plot[1].axis.y1.proj = [ [], [], [], [] ];
  draw_plots ();
}	// function handle_btn_reset


function handle_btn_units () {
  if (plot[1].axis.y2.units == dC) {
    plot[1].axis.y2.units = dF;
    plot[1].coord.temp.ys = 9 / (5 * 140);
  } else {
    plot[1].axis.y2.units = dC;
    plot[1].coord.temp.ys = 1 / 140;
  }
  draw_plots ();
}	// function handle_btn_units
