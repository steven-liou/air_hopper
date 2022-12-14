import React from 'react';

const Map = ({routes, dispatch, setAirport}) => {
  const handleClick = (value) => {
    dispatch({
      type: 'FILTER',
      payload: {
        property: 'airports',
        keys: 'dest',
        value,
      },
    });
    setAirport(value);
  };

  return (
    <svg className='map' viewBox='-180 -90 360 180'>
      <g transform='scale(1 -1)'>
        <image
          xlinkHref='equirectangular_world.jpg'
          href='equirectangular_world.jpg'
          x='-180'
          y='-90'
          height='100%'
          width='100%'
          transform='scale(1 -1)'
        />

        {routes.map((route, index) => {
          const {src, dest, srcLong: x1, srcLat: y1, destLong: x2, destLat: y2} = route;
          return (
            <g
              key={index}
              data-airport={dest}
              onClick={(e) => handleClick(e.target.parentElement.getAttribute('data-airport'))}
            >
              <circle className='source' cx={x1} cy={y1}>
                <title>{src}</title>
              </circle>
              <circle className='destination' cx={x2} cy={y2}>
                <title>{dest}</title>
              </circle>
              <path d={`M${x1} ${y1} L ${x2} ${y2}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default Map;
