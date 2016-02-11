define({
  map: true,
  zoomExtentFactor: 2,
  queries: [
    {
      description: 'Find hurricane traces by wind speed',
      url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer/',
      layerIds: [0],
      searchFields: ['WIND_KTS'],
      minChars: 2,
      gridColumns: [
	{ field: 'Name', label: 'Name' },
        { field: 'Wind Speed', label: 'Wind Speed'}
      ],
      sort: [
	{
	  attribute: 'Name',
	  descending: false
	}
      ],
      prompt: 'speed in knots',
      selectionMode: 'single'
    },
    {
      description: 'Find hurricane traces by category',
      url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer/',
      layerIds: [0],
      searchFields: ['CAT'],
      minChars: 1,
      gridColumns: [
	{ field: 'Name', label: 'Name' },
        { field: 'Category', label: 'Category' }
      ],
      sort: [
	{
	  attribute: 'Name',
	  descending: false
	}
      ],
      prompt: 'hurricane category (H1-H5)',
      selectionMode: 'single'
    },
    {
      description: 'Find hurricane traces by year',
      url: 'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hurricanes/NOAA_Tracks_1851_2007/MapServer/',
      layerIds: [0],
      searchFields: ['TRACK_DATE'],
      minChars: 4,
      gridColumns: [
	{ field: 'NAME', label: 'Layer', width: 100, sortable: false, resizable: false },
	{ field: 'SORT_VALUE', visible: false, get: function (findResult){
	  return findResult.layerName + ' ' + findResult.feature.attributes.Fcode;  //seems better to use attributes[ 'Fcode' ] but fails build.  Attribute names will be aliases and may contain spaces and mixed cases.
	} }
      ],
      sort: [
	{
	  attribute: 'SORT_VALUE',
	  descending: false
	}
      ],
      prompt: 'fdname, pdname, name or resname',
      customGridEventHandlers: [
	{
	  event: '.dgrid-row:click',
	  handler: function ( event ) {
	    alert( 'You clicked a row!' );
	    console.log( event );
	  }
	}
      ]
    }
  ],
  selectionSymbols: {
    polygon: {
      type   : 'esriSFS',
      style  : 'esriSFSSolid',
      color  : [255, 0, 0, 62],
      outline: {
	type : 'esriSLS',
	style: 'esriSLSSolid',
	color: [255, 0, 0, 255],
	width: 3
      }
    },
    point: {
      type   : 'esriSMS',
      style  : 'esriSMSCircle',
      size   : 25,
      color  : [255, 0, 0, 62],
      angle  : 0,
      xoffset: 0,
      yoffset: 0,
      outline: {
	type : 'esriSLS',
	style: 'esriSLSSolid',
	color: [255, 0, 0, 255],
	width: 2
      }
    }
  },
  selectionMode   : 'extended'
});
