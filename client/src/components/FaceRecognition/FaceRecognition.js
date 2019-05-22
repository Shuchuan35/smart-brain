import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box, boxes }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt3 mb3'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
                {boxes.map((x, i) => (
                    <div
                        key={i}
                        className='bounding-boxes'
                        style={
                            { top: x.topRow, right: x.rightCol, bottom: x.bottomRow, left: x.leftCol }
                        }>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default FaceRecognition;