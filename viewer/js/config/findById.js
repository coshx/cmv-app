define({
  map: true,
  zoomExtentFactor: 2,
  queries: [
    {
      description: 'Search all objects by id',
      url: ['http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/Parcels/MapServer/',
            'http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/BloomfieldHillsMichigan/LandusePlanning/MapServer'],
      layerIds: [0, 1, 2],
      searchFields: ['OBJECTID'],
      minChars: 1,
      gridColumns: [
        { field: 'OBJECTID', label: 'OBJECTID', width: 100, sortable: false, resizable: false },
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
      prompt: 'Enter an objectID',
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
