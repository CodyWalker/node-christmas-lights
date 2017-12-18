import 'aframe';
import 'aframe-dev-components';
import {Entity, Scene} from 'aframe-react';
import React from 'react';
import ReactDOM from 'react-dom';
import { vec4, mat4, quat } from 'gl-matrix';

// Bic pen
const pointerOffset = vec4.fromValues(0, -0.071, -0.170, 1);

//Drum stick
//const pointerOffset = vec4.fromValues(0, -0.134, -0.358, 1);

class VRContainer extends React.Component {
  handleTrigger(e) {
    const object = e.target.object3D;

    const positionObject = object.position;
    const position = [positionObject.x, positionObject.y, positionObject.z];

    const rotationObject = object.quaternion;
    const orientation = [rotationObject.x, rotationObject.y, rotationObject.z, rotationObject.w];

    const transform = mat4.create();
    mat4.fromRotationTranslation(transform, orientation, position);

    const pointer = vec4.create();
    vec4.transformMat4(pointer, pointerOffset, transform);

    this.props.gotPoint(pointer);
  }

  render () {
    const pointerOptions = {
      'color': 'tomato',
      'radius-bottom': '0.01',
      'radius-top': '0',
      'height': '0.05',
      'rotation': '-90 0 0',
      'position': `${pointerOffset[0]} ${pointerOffset[1]} ${pointerOffset[2] + 0.025}`,
    }

    return (
      <Scene embedded="true">
        <Entity primitive='a-sky' color='#6EBAA7' />
        <Entity light={{type: 'point'}}/>
        <Entity text={{value: 'Hello, WebVR!'}}/>

        <Entity vive-controls={{ hand: 'right' }} events={{ triggerdown: this.handleTrigger.bind(this) }}>
          <Entity primitive='a-cone' { ...pointerOptions }/>
        </Entity>
        <Entity vive-controls={{ hand: 'left' }} events={{ triggerdown: this.handleTrigger.bind(this) }}>
          <Entity primitive='a-cone' { ...pointerOptions }/>
        </Entity>

        { this.props.points.map((point, i) => <Entity
          key={i}
          primitive='a-sphere'
          radius='0.005'
          color='yellow'
          position={`${point[0]} ${point[1]} ${point[2]}`}
          />
        )}

      </Scene>
    );
  }
}

export default VRContainer;
