import React from 'react';

const VolumControl = ({
  onVolumeChange,
  volume
}) => {

  return (
  
      <div className="volume-control">
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => onVolumeChange(e.target.value)}
        />
      </div>
  );
};

export default VolumControl;
