const wwd = new WorldWind.WorldWindow('canvasOne');

wwd.addLayer(new WorldWind.BMNGOneImageLayer());
wwd.addLayer(new WorldWind.BMNGLandsatLayer());

wwd.addLayer(new WorldWind.CompassLayer());
wwd.addLayer(new WorldWind.CoordinatesDisplayLayer(wwd));
wwd.addLayer(new WorldWind.ViewControlsLayer(wwd));

const placemarkLayer = new WorldWind.RenderableLayer("Placemark");
wwd.addLayer(placemarkLayer);

const placemarkAttributes = new WorldWind.PlacemarkAttributes(null);

placemarkAttributes.imageOffset = new WorldWind.Offset(
    WorldWind.OFFSET_FRACTION, 0.3,
    WorldWind.OFFSET_FRACTION, 0.0);

placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);

placemarkAttributes.imageSource = WorldWind.configuration.baseUrl + "images/pushpins/plain-red.png";

const position = new WorldWind.Position(20.0, -102.0, 100.0);
const placemark = new WorldWind.Placemark(position, false, placemarkAttributes);

placemark.label = "Placemark\n" +
    "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n" +
    "Lon " + placemark.position.longitude.toPrecision(5).toString();
placemark.alwaysOnTop = true;
placemarkLayer.addRenderable(placemark);

const polygonLayer = new WorldWind.RenderableLayer();
wwd.addLayer(polygonLayer);

const polygonAttributes = new WorldWind.ShapeAttributes(null);
polygonAttributes.interiorColor = new WorldWind.Color(0, 1, 1, 0.75);
polygonAttributes.outlineColor = WorldWind.Color.BLUE;
polygonAttributes.drawOutline = true;
polygonAttributes.applyLighting = true;

const boundaries = [];
boundaries.push(new WorldWind.Position(20.0, -75.0, 700000.0));
boundaries.push(new WorldWind.Position(25.0, -85.0, 700000.0));
boundaries.push(new WorldWind.Position(20.0, -95.0, 700000.0));

/*const polygon = new WorldWind.Polygon(boundaries, polygonAttributes);
polygon.extrude = true;
polygonLayer.addRenderable(polygon);

// Add a COLLADA model
const modelLayer = new WorldWind.RenderableLayer();
wwd.addLayer(modelLayer);*/

/*const position2 = new WorldWind.Position(10.0, -125.0, 800000.0);
const config = {dirPath: WorldWind.configuration.baseUrl + 'examples/collada_models/duck/'};

const colladaLoader = new WorldWind.ColladaLoader(position2, config);
colladaLoader.load("duck.dae", function (colladaModel) {
    colladaModel.scale = 9000;
    modelLayer.addRenderable(colladaModel);
});
*/
// Add WMS imagery
/*const serviceAddress = "https://neo.sci.gsfc.nasa.gov/wms/wms?SERVICE=WMS&REQUEST=GetCapabilities&VERSION=1.3.0";
const layerName = "MOD_LSTD_CLIM_M";

const createLayer = function (xmlDom) {
    const wms = new WorldWind.WmsCapabilities(xmlDom);
    const wmsLayerCapabilities = wms.getNamedLayer(layerName);
    const wmsConfig = WorldWind.WmsLayer.formLayerConfiguration(wmsLayerCapabilities);
    const wmsLayer = new WorldWind.WmsLayer(wmsConfig);
    wwd.addLayer(wmsLayer);
};*/

var logError = function (jqXhr, text, exception) {
    console.log("There was a failure retrieving the capabilities document: " +
        text +
    " exception: " + exception);
};

$.get(serviceAddress).done(createLayer).fail(logError);
