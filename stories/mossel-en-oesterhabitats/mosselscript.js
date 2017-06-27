/* global YASGUI */

const query = `
PREFIX geo: <http://www.opengis.net/ont/geosparql#>
PREFIX geof: <http://www.opengis.net/def/function/geosparql/>
PREFIX uom: <http://www.opengis.net/def/uom/OGC/1.0/>

select * where {
  graph <http://data.pdok.nl/mossel-en-oesterhabitats> {
    ?s geo:hasGeometry/geo:asWKT ?wkt .
    bind(geof:distance(
      ?wkt, "POINT(5 52)"^^geo:wktLiteral, uom:metre) as ?dist_metres
    )
  }
}
order by ?dist_metres
limit 10`;

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(location => {
    YASGUI.YASQE.defaults.value = query.replace(
      'POINT(5 52)', `POINT(${location.coords.longitude} ${location.coords.latitude})`
    );
    console.log(location);
  });
} else {
  YASGUI.YASQE.defaults.value = query;
}
